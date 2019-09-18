const loadPublicMessagesArchive = async (setPublicMessages, setIsLoggedIn, setProfile) => {
  if (localStorage.publicMessagesUrl === undefined) {
    setPublicMessages(undefined);
    setIsLoggedIn(false);
  } else {
    const publicMessages = await window.DatArchive.load(
      localStorage.publicMessagesUrl
    );
    setPublicMessages(publicMessages);
    setIsLoggedIn(true);
    const profile = JSON.parse(await publicMessages.readFile('/profile.json'));
    setProfile({ ...profile, publicArchiveUrl: localStorage.publicMessagesUrl });
  }
};

export default loadPublicMessagesArchive;
