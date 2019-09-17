import mkdirp from './mkdirp';

const loadPublicMessages = async (publicMessagesArchive, profile, setMessages) => {
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

  setMessages(messages.sort(
    (a, b) => new Date(a.date_created).getTime() > new Date(b.date_created).getTime() ? -1 : 1
  ));
};

export default loadPublicMessages;
