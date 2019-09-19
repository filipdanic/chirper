import React, { Fragment } from 'react';
import {Flex} from 'chakra-ui';
import {Avatar, Icon} from '@chakra-ui/core';
import UsernameWithDATAddress from './UsernameWithDATAddress';

const FollowList = ({
  title,
  emptyStateMessage,
  showIfEmpty,
  items
}) => {
  const isEmpty = items.length === 0;
  return (
    <Fragment>
      {(!isEmpty || (isEmpty && showIfEmpty)) &&
        <h3>{title}</h3>
      }
      {isEmpty ?
        (showIfEmpty ? <p>
          <Icon
            name='info'
            size='16px'
            p={2}
            mt={'-4px'}
            color='gray.500'
          />
          {emptyStateMessage}
        </p> : null) :
        <Flex
          maxWidth={640}
          flexDirection='row'
          flexWrap='wrap'
        >
          {items.map(profile =>
            <Flex p={4} alignItems='center' key={profile.dat_archive} >
              <Avatar name={profile.username} size='xs' mr={2} />
              <UsernameWithDATAddress {...profile} />
            </Flex>
          )}
        </Flex>}
    </Fragment>
  );
};

export default FollowList;
