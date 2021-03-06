import mkdirp from './mkdirp';

const followNewProfile = async (newProfile = '', archiveUrl) => {
  try {
    const archive = await window.DatArchive.load(archiveUrl);
    const sanitizedProfileKey = newProfile.startsWith('dat://') ? newProfile.split('dat://')[1] : newProfile;

    const followedDatUrl = `dat://${sanitizedProfileKey}`;
    const followedArchive = new window.DatArchive(followedDatUrl);
    const followedProfileFile = await followedArchive.readFile('/profile.json');
    const followedProfile = JSON.parse(followedProfileFile);
    await mkdirp('followedProfiles', archive);
    const follow = {
      username: followedProfile.username
    };
    await archive.writeFile(
      `/followedProfiles/${sanitizedProfileKey}.json`,
      JSON.stringify(follow, null, 2)
    );
  } catch (e) {
    console.error(e)
  }
};

export default followNewProfile;

