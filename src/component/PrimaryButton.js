import React from 'react';
import { Button } from '@chakra-ui/core';

const PrimaryButton = ({ children, ...props }) =>
  <Button
    variantColor='pink'
    variant='ghost'
    border='none'
    size='lg'
    {...props}
  >
    {children}
  </Button>;

export default PrimaryButton;
