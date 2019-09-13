import loadPublicMessages from './loadPublicMessages';

const handleSelectProfile = async (setPublicMessages, setIsLoggedIn) => {
  const publicMessages = await window.DatArchive.selectArchive({
    prompt: 'Select your HeapChat profile.',
    filters: { isOwner: true, type: ['heapchat-public'] }
  });
  localStorage.publicMessagesUrl = publicMessages.url;
  await loadPublicMessages(setPublicMessages, setIsLoggedIn);
};

export default handleSelectProfile;
