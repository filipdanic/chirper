import React from 'react';
import { Text } from 'chakra-ui';
import {Icon, Tooltip, useClipboard} from '@chakra-ui/core';

const truncateDatArchiveURL = (str) =>
  str.substr(0, 12) + `…` + str.substr(str.length - 4, str.length - 1);

export default ({ username, dat_archive }) => {
  const { onCopy } = useClipboard(dat_archive);
  return (
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
  );
}
