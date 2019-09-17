import mkdirp from './mkdirp';

// dat://2d7f18e482b8fef4428b9bf7ab490a49c682e817c53e13fd5955d9d1bb04f575
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

