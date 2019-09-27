import React, { useState } from 'react';
import { Router } from '@reach/router';
import { Box, ThemeProvider, UIModeProvider } from 'chakra-ui';
import usePublicProfile from './utils/usePublicProfile';
import Chat from './component/Chat';
import NavigationBar from './component/NavigationBar';
import Following from './component/Following';

function App() {
  const [ publicMessages, setPublicMessages ] = useState();
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ profile, setProfile ] = useState();
  usePublicProfile(setPublicMessages, setIsLoggedIn, setProfile);

  return (
    <ThemeProvider>
      <UIModeProvider>
        <Box w="100%" p={4}>
          <NavigationBar
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setPublicMessages={setPublicMessages}
            setProfile={setProfile}
          />
          <Router>
            <Chat
              path='/'
              shouldDisplay={isLoggedIn && profile}
              publicMessages={publicMessages}
              profile={profile}
            />
            <Following
              path='/following'
              shouldDisplay={isLoggedIn && profile}
              profile={profile}
            />
          </Router>
        </Box>
      </UIModeProvider>
    </ThemeProvider>
  );
}

export default App;
