import {Flex, Text } from 'chakra-ui';
import React from 'react';
import { Tooltip, Icon } from '@chakra-ui/core';
import { useClipboard } from '@chakra-ui/core';

const truncateDatArchiveURL = (str) =>
  str.substr(0, 12) + `…` + str.substr(str.length - 4, str.length - 1);

export default ({
  dat_archive,
  date_created,
  username,
  text,
  }) => {
  const { onCopy, hasCopied } = useClipboard(dat_archive);
  return (
    <Flex key={`${date_created}::${dat_archive}`} p={4} flexDirection='column'>
      <Text as='p' m={0} color='gray.500'>
        <strong>@{username}</strong>
        <Tooltip hasArrow label={truncateDatArchiveURL(dat_archive)}>
          <Icon
            name='view'
            size='12px'
            p={1}
            onClick={onCopy}
            style={{ cursor: 'pointer', marginBottom: 2 }}
            color='gray.500'
          />
        </Tooltip>
      </Text>
      <Text as='p' m={2}>
        {text}
      </Text>
    </Flex>
  );
}

