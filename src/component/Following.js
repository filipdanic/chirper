import React from 'react';
import { Flex } from 'chakra-ui';
import {Code, useClipboard} from '@chakra-ui/core';

const Following = ({ profile }) => {
  const { onCopy } = useClipboard(profile.publicArchiveUrl);
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
    </Flex>
  );
};

const FollowingHoC = ({ profile, shouldDisplay }) =>
  shouldDisplay ?
    <Following profile={profile} /> :
    <React.Fragment />;

export default FollowingHoC;
