import React from 'react';
import { Skeleton, Stack } from '@chakra-ui/react';

const ChatLoading = () => {
  return (
    <React.Fragment>
      <Stack>
        <Skeleton height={"45px"}/>
        <Skeleton height={"45px"}/>
        <Skeleton height={"45px"}/>
      </Stack>
    </React.Fragment>
  )
}

export default ChatLoading;