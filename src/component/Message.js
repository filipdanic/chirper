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
        <Flex>
          <UsernameWithDATAddress
            username={username}
            dat_archive={dat_archive}
            style={{ display: 'flex', flex: 1, alignSelf: 'flex-start' }}
          />
          <Flex alignSelf='flex-end'>
            <Text as='p' m={0} fontSize='0.8rem' color='gray.500'>
              {new Date(date_created).toLocaleString()}
            </Text>
          </Flex>
        </Flex>
        <Text as='p' m={0} fontSize='1.2rem'>
          {text}
        </Text>
      </Flex>
    </Flex>
  );
}

