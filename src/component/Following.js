import React, { useState, useEffect } from 'react';
import { Flex, Input } from 'chakra-ui';
import { Code, useClipboard } from '@chakra-ui/core';
import loadFollowedProfiles from '../utils/loadFollowedProfiles';
import PrimaryButton from './PrimaryButton';
import followNewProfile from '../utils/followNewProfile';
import usePeerDiscovery from '../utils/usePeerDiscovery';
import FollowList from './FollowList';

const addFoundPeer = (setFoundPeers) => (peer) =>
  setFoundPeers(peers => peers.concat([peer]));

const Following = ({ profile }) => {
  const { onCopy } = useClipboard(profile.publicArchiveUrl);
  const [ newProfile, setNewProfile ] = useState('');
  const [ followedProfiles, setFollowedProfiles ] = useState([]);
  const [ foundPeers, setFoundPeers ] = useState([]);

  usePeerDiscovery(
    profile.publicArchiveUrl,
    profile.username,
    addFoundPeer(setFoundPeers)
  );
  useEffect(() => {
    const onMount = async () => {
      await loadFollowedProfiles(profile.publicArchiveUrl, setFollowedProfiles);
    };
    onMount();
  }, []);

  return (
    <Flex flexDirection='column' maxWidth={800} style={{ margin: '0 auto' }}>
      <h2>Your Public DAT URL</h2>
      <Code
        variantColor='yellow'
        style={{ padding: 12, cursor: 'pointer' }}
        onClick={onCopy}
      >
        {profile.publicArchiveUrl}
      </Code>

      <h3>Follow a Public Profile</h3>
      <Flex>
        <Input
          placeholder='Enter a DAT URL…'
          borderColor='blue.200'
          size='sm'
          onChange={e => setNewProfile(e.target.value)}
          value={newProfile}
        />
        <PrimaryButton
          mt={'-6px'}
          onClick={async () => {
            await followNewProfile(newProfile, profile.publicArchiveUrl);
            await loadFollowedProfiles(profile.publicArchiveUrl, setFollowedProfiles);
            setNewProfile('');
          }}>
          Follow
        </PrimaryButton>
      </Flex>

      <FollowList
        title='Following:'
        emptyStateMessage='Follow someone to see their chrips™!️'
        items={followedProfiles}
        showIfEmpty={true}
      />

      <FollowList
        title='Currently chirping:'
        emptyStateMessage=''
        items={foundPeers}
        showIfEmpty={false}
      />
    </Flex>
  );
};

const FollowingHoC = ({ profile, shouldDisplay }) =>
  shouldDisplay ?
    <Following profile={profile} /> :
    <React.Fragment />;

export default FollowingHoC;
