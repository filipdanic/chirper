import loadPublicMessagesArchive from './loadPublicMessagesArchive';

const handleSelectProfile = async (setPublicMessages, setIsLoggedIn, setProfile) => {
  const publicMessages = await window.DatArchive.selectArchive({
    prompt: 'Select your HeapChat profile.',
    filters: { isOwner: true, type: ['heapchat-public'] }
  });
  localStorage.publicMessagesUrl = publicMessages.url;
  await loadPublicMessagesArchive(setPublicMessages, setIsLoggedIn, setProfile);
};

export default handleSelectProfile;
