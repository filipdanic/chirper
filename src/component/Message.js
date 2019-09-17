import {Flex, Text } from 'chakra-ui';
import React from 'react';
import UsernameWithDATAddress from './UsernameWithDATAddress';

export default ({
  dat_archive,
  date_created,
  username,
  text,
  }) => {
  return (
    <Flex key={`${date_created}::${dat_archive}`} p={4} flexDirection='column'>
      <UsernameWithDATAddress
        username={username}
        dat_archive={dat_archive}
      />
      <Text as='p' m={2}>
        {text}
      </Text>
    </Flex>
  );
}

