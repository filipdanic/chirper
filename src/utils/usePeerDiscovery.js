import { useEffect } from 'react';
import Swarm from 'webrtc-swarm';
import signalhub from 'signalhub';

const usePeerDiscovery = async (archiveUrl, username, addFoundPeer, enabledDiscovery) =>
  useEffect(() => {
    if (enabledDiscovery) {
      const hub = signalhub('chirper-public', ['https://signalhub-jccqtwhdwc.now.sh']);
      const localSwarm = Swarm(hub, {
        uuid: `${username}:via:${archiveUrl}`,
        maxPeers: 1000,
      });

      localSwarm.on('peer', function (peer, id) {
        const [ username, archiveUrl ] = id.split(':via:');
        addFoundPeer({ username, dat_archive: archiveUrl });
      });

      return () => localSwarm.close();
    }
  }, [enabledDiscovery]);

export default usePeerDiscovery;
