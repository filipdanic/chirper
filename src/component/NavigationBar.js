import React from 'react';
import { Link } from '@reach/router';
import { Flex } from 'chakra-ui';
import PrimaryButton from './PrimaryButton';
import handleLogout from '../utils/handleLogout';
import handleCreateProfile from '../utils/handleCreateProfile';
import loadPublicMessagesArchive from '../utils/loadPublicMessagesArchive';
import handleSelectProfile from '../utils/handleSelectProfile';
import logo from '../assets/logo.svg';

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
      mb={4}
      pr={8}
      pl={8}
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
            <img src={logo} style={{ height: 24, marginRight: 12, alignSelf: 'center' }} /> Home
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
