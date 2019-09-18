import React from 'react';
import { Flex, Text } from 'chakra-ui';
import { Avatar } from '@chakra-ui/core';
import UsernameWithDATAddress from './UsernameWithDATAddress';

export default ({
  dat_archive,
  date_created,
  username,
  text,
  }) => {
  return (
    <Flex p={4} alignItems='center'>
      <Flex mr={4}>
        <Avatar name={username} size='sm' />
      </Flex>
      <Flex flexDirection='column'>
        <UsernameWithDATAddress
          username={username}
          dat_archive={dat_archive}
        />
        <Text as='p' m={0} fontSize='1.2rem'>
          {text}
        </Text>
      </Flex>
    </Flex>
  );
}

