import { useEffect } from 'react';
import loadPublicMessagesArchive from './loadPublicMessagesArchive';

const usePublicProfile = (setPublicMessages, setIsLoggedIn, setProfile) =>
  useEffect(() => {
    async function onMount() {
      await loadPublicMessagesArchive(setPublicMessages, setIsLoggedIn, setProfile);
    }
    onMount();
  }, []);

export default usePublicProfile;
