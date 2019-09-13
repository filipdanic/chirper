import React, { useState } from 'react';
import {Flex, Box, ThemeProvider, UIModeProvider, Input} from 'chakra-ui';
import usePublicProfile from './utils/usePublicProfile';
import handleCreateProfile from './utils/handleCreateProfile';
import loadPublicMessagesArchive from './utils/loadPublicMessagesArchive';
import PrimaryButton from './component/PrimaryButton';
import handleLogout from './utils/handleLogout';
import handleSelectProfile from './utils/handleSelectProfile';
import Chat from './component/Chat';

function App() {
  const [ publicMessages, setPublicMessages ] = useState();
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ profile, setProfile ] = useState();
  usePublicProfile(setPublicMessages, setIsLoggedIn, setProfile);

  return (
    <ThemeProvider>
      <UIModeProvider>
        <Box w="100%" p={4}>
          {isLoggedIn ?
            <PrimaryButton onClick={() => handleLogout(setIsLoggedIn, setPublicMessages, setProfile)}>
              Log Out
            </PrimaryButton> :
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
            </Flex>
          }
          {isLoggedIn && profile &&
            <Chat
              publicMessages={publicMessages}
              profile={profile}
            />}
        </Box>
      </UIModeProvider>
    </ThemeProvider>
  );
}

export default App;
