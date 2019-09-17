import React from 'react';
import { Link } from '@reach/router';
import { Flex } from 'chakra-ui';
import PrimaryButton from './PrimaryButton';
import handleLogout from '../utils/handleLogout';
import handleCreateProfile from '../utils/handleCreateProfile';
import loadPublicMessagesArchive from '../utils/loadPublicMessagesArchive';
import handleSelectProfile from '../utils/handleSelectProfile';

export default ({
  isLoggedIn,
  setIsLoggedIn,
  setPublicMessages,
  setProfile,
}) =>
  isLoggedIn ?
    <Flex
      flexDirection='row'
      justifyContent='space-between'
    >
      <Flex
        flexDirection='row'
        flexWrap='nowrap'
        justifyContent='flex-start'
        alignItems='stretch'
        alignContent='stretch'
      >
        <Link to='/' style={{ textDecoration: 'none' }}>
          <PrimaryButton onClick={() => {}}>
            Home
          </PrimaryButton>
        </Link>
        <Link to='/following' style={{ textDecoration: 'none' }}>
          <PrimaryButton onClick={() => {}}>
            Following
          </PrimaryButton>
        </Link>
      </Flex>
      <Flex
        flexDirection='row'
        flexWrap='nowrap'
        justifyContent='flex-ends'
        alignItems='stretch'
        alignContent='stretch'
      >
        <PrimaryButton
          opacity='0.75'
          onClick={() => handleLogout(setIsLoggedIn, setPublicMessages, setProfile)}
        >
          Log Out
        </PrimaryButton>
      </Flex>
    </Flex> :
    <Flex
      flexDirection='row'
      flexWrap='nowrap'
      justifyContent='flex-end'
      alignItems='stretch'
      alignContent='stretch'
    >
      <PrimaryButton onClick={async () => {
        await handleCreateProfile(setIsLoggedIn);
        await loadPublicMessagesArchive(setPublicMessages, setIsLoggedIn, setProfile);
      }}>
        Create Profile
      </PrimaryButton>
      <PrimaryButton onClick={async () => {
        await handleSelectProfile(setPublicMessages, setIsLoggedIn, setProfile);
      }}>
        Load Profile
      </PrimaryButton>
    </Flex>;
