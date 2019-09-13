const loadPublicMessages = async (setPublicMessages, setIsLoggedIn) => {
  if (localStorage.publicMessagesUrl === undefined) {
    setPublicMessages(undefined);
    setIsLoggedIn(false);
  } else {
    const publicMessages = await window.DatArchive.load(
      localStorage.publicMessagesUrl
    );
    setPublicMessages(publicMessages);
    setIsLoggedIn(true);
  }
};

export default loadPublicMessages;
