import mkdirp from './mkdirp';

/**
 * Basically right now this is a hook-based
 * implementation of @aaronshaf’s datchat prototype.
 */

const stripExtension = (str) =>
  str.substr(0, str.lastIndexOf('.'));

 const basename = path =>
  stripExtension(path.split('/').reverse()[0]);

const updateMessage = async (path, followedArchive, profile, addMessages) => {
  const messageFile = await followedArchive.readFile(path, 'utf8');
  if (!messageFile) {
    return;
  }
  const message = JSON.parse(messageFile);
  message.username = profile.username;
  message.id = basename(path);
  message.dat_archive = followedArchive.url;

  addMessages([message]);
};

const loadPublicMessages = async (publicMessagesArchive, profile, addMessages) => {
  await mkdirp('/messages', publicMessagesArchive);
  const messageFiles = await publicMessagesArchive.readdir('/messages');
  const messages = [];
  for (let file of messageFiles) {
    const fileContents = await publicMessagesArchive.readFile(`/messages/${file}`);
    const message = JSON.parse(fileContents);
    messages.push({
      ...message,
      dat_archive: publicMessagesArchive.url,
      username: profile && profile.username
    });
  }

  const events = publicMessagesArchive.watch('/messages/*.json');
  events.addEventListener('invalidated', ({ path }) => {
    updateMessage(path, publicMessagesArchive, profile, addMessages);
  });

  addMessages(messages);

  await mkdirp('/followedProfiles', publicMessagesArchive);
  const followFiles = await publicMessagesArchive.readdir('/followedProfiles');
  followFiles.forEach(async file => {
    const key = file.split('.json')[0];
    const followedDatUrl = `dat://${key}`;
    const followedArchive = new window.DatArchive(followedDatUrl);
    const followedProfileFile = await followedArchive.readFile(
      '/profile.json'
    );
    const followedProfile = JSON.parse(followedProfileFile);
    const history = await followedArchive.history({
      start: 0,
      end: 150,
      reverse: true
    });
    const messagePaths = history
      .filter(message => message.path.startsWith('/messages/'))
      .filter(message => message.type === 'put')
      .reduce((messages, message) => {
        return [].concat(
          messages,
          messages.includes(message.path) ? [] : message
        );
      }, [])
      .map(message => message.path);

    messagePaths.forEach(async path => {
      updateMessage(path, followedArchive, followedProfile, addMessages);
    });

    const events = followedArchive.watch('/messages/*.json');
    events.addEventListener('invalidated', ({ path }) => {
      updateMessage(path, followedArchive, followedProfile, addMessages);
    });
  });
};

export default loadPublicMessages;
