import React, { useState } from 'react';
import {Flex, Box, ThemeProvider, UIModeProvider, Input} from 'chakra-ui';
import usePublicProfile from './utils/usePublicProfile';
import handleCreateProfile from './utils/handleCreateProfile';
import loadPublicMessages from './utils/loadPublicMessages';
import PrimaryButton from './component/PrimaryButton';
import handleLogout from './utils/handleLogout';
import handleSelectProfile from './utils/handleSelectProfile';
import Chat from './component/Chat';

function App() {
  const [ publicMessages, setPublicMessages ] = useState();
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  usePublicProfile(setPublicMessages, setIsLoggedIn);

  console.log(publicMessages)
  return (
    <ThemeProvider>
      <UIModeProvider>
        <Box w="100%" p={4}>
          {isLoggedIn ?
            <PrimaryButton onClick={() => handleLogout(setIsLoggedIn, setPublicMessages)}>
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
                await loadPublicMessages(setPublicMessages, setIsLoggedIn);
              }}>
                Create Profile
              </PrimaryButton>
              <PrimaryButton onClick={async () => {
                await handleSelectProfile(setPublicMessages, setIsLoggedIn);
              }}>
                Load Profile
              </PrimaryButton>
            </Flex>
          }
          {isLoggedIn && <Chat publicMessages={publicMessages} />}
        </Box>
      </UIModeProvider>
    </ThemeProvider>
  );
}

export default App;
