import React from 'react'
import { Box } from '@chakra-ui/react';

import { Providers } from '../../../providers';
import * as Components from "../../../components";

const ChatRoom = () => {
  const { selectedChat } = Providers.useAuth();

  return (
    <React.Fragment>
      <Box
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems={"center"}
        flexDir={"column"}
        p={3}
        bg="white"
        w={{base: "100%", md: "68%"}}
        borderRadius={"lg"}
        borderWidth={"2px"}
      >
        <Components.SingleChat />
      </Box>
    </React.Fragment>
  )
};

export default ChatRoom;
