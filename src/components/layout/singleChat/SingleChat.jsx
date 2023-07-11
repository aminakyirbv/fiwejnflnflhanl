import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

import { Providers } from '../../../providers';
import { ICONS } from '../../../icons/icons';
import { getSender, getSenderInfo } from '../../../helpers/ChatLogics';
import ProfileModal from '../profileModal/ProfileModal';
import * as Components from "../../../components";

const SingleChat = () => {
  const { 
    setRender, 
    render, 
    selectedChat, 
    setSelectedChat,
    currentUser
  } = Providers.useAuth();
  
  return (
    <React.Fragment>
      {
        selectedChat ? (
          <>
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              pb={3}
              px={2}
              w={"100%"}
              display={"flex"}
              justifyContent={{base: "space-between"}}
              alignItems={"center"}
            >
              <Button
                display={{base: "flex" , md: "none"}}
                onClick={() => setSelectedChat(null)}
              >
                <ICONS.BsArrowBarLeft />
              </Button>
              {
                !selectedChat?.isGroupChat && 
                  <>
                    {getSender(currentUser, selectedChat?.users)}
                    <ProfileModal user={getSenderInfo(currentUser, selectedChat?.users)}/>
                  </>
              }

              { 
                selectedChat?.isGroupChat && 
                  <>
                    {selectedChat?.chatName.toUpperCase()}
                    <Components.GroupUpdateModal />
                  </>
              }
            </Text>

            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"flex-end"}
              p={3}
              bg="#e8e8e8"
              w={"100%"}
              height={"100%"}
              borderRadius={"lg"}
              overflowY={"hidden"}
            >

            </Box>
          </>
        ) : (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent="center"
            height={"100%"}
          >
            <Text
              fontSize={"3xl"}
              pb={3}
            >
              Click on a user to start chatting!
            </Text>
          </Box>
        )
      }
    </React.Fragment>
  )
}

export default SingleChat;
