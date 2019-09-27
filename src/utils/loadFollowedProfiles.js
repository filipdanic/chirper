const loadFollowedProfiles = async (archiveUrl, setFollowedProfiles) => {
  const archive = await window.DatArchive.load(archiveUrl);
  let followedProfilesFiles = [];
  try {
    followedProfilesFiles = await archive.readdir('/followedProfiles');
  } catch (err) {}
  let follows = [];
  for (const filename of followedProfilesFiles) {
    const fileContents = await archive.readFile(`/followedProfiles/${filename}`);
    const follow = {
      ...JSON.parse(fileContents),
      dat_archive: `dat://${filename.split(".json")[0]}`
    };
    follows.push(follow);
  }
  setFollowedProfiles(follows);
};

export default loadFollowedProfiles;
