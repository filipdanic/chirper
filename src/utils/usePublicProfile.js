import { useEffect } from 'react';
import loadPublicMessages from './loadPublicMessages';

const usePublicProfile = (setPublicMessages, setIsLoggedIn) =>
  useEffect(() => {
    async function onMount() {
      await loadPublicMessages(setPublicMessages, setIsLoggedIn);
    }
    onMount();
  }, []);

export default usePublicProfile;
