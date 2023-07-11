import React from 'react';
import { Avatar, Box, Button, Stack, Text, useToast } from '@chakra-ui/react';

import { Providers } from '../../../providers';
import { RequestsDB } from '../../../api/api';
import * as Components from "../../../components";
import { getSender } from '../../../helpers/ChatLogics';

const ChatList = () => {
  const { 
    setChats, 
    chats, 
    selectedChat, 
    setSelectedChat,
    currentUser,
    render
  } = Providers.useAuth();
  const toast = useToast();

  const fetchAllChats = async () => {
    try {
      const { data } = await RequestsDB.GetChats();
      if(data) {
        setChats(data);
      } 
    } catch(e) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats!",
        duration: 5000,
        status: "error",
        position: "top-right",
        isClosable: true
      });
    }
  };  

  React.useEffect(() => {
    fetchAllChats();
  }, [render]);

  return (
    <React.Fragment>
      <Box
        display={{base: selectedChat ? "none" : "flex", md: "flex"}}
        flexDir={"column"}
        alignItems={"center"}
        p={3}
        bg={"white"}
        w={{base: "100%", md: "31%"}}
        borderRadius={"lg"}
        borderWidth={"2px"}
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text>
            My Chats
          </Text>
          <Components.GroupModal>
            <Button
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            >
              New Group chat
              +
            </Button>
          </Components.GroupModal>
        </Box>

        <Box
          p={3}
          display={"flex"}
          bg={"#f8f8f8"}
          width={"100%"}
          borderRadius={"lg"}
          overflowY={"hidden"}
          h={"100%"}
          flexDir={"column"}
        >
          {
            chats ? (
              <Stack
                overflowY={"scroll"}
              >
                {
                  chats?.map((c, i)=> (
                    <Box 
                      cursor={"pointer"}
                      key={i}
                      onClick={() => setSelectedChat(c)}
                      bg={selectedChat === c ? "#38b2ac" : "#e8e8e8"}
                      color={selectedChat === c ? "white" : "black"}
                      px={3}
                      py={2}
                      borderRadius={"lg"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"15px"}
                    >
                      <Avatar 
                        size={"sm"}
                        name={getSender(currentUser, c.users)}
                        src={c.avatar}
                      />
                      <Box>
                        <Text fontSize={"15px"}>
                          {
                            !c.isGroupChat
                              ? getSender(currentUser, c.users)
                              : c.chatName
                          }
                        </Text>
                      </Box>
                    </Box>
                  ))
                }
              </Stack>
            ) : <Components.ChatLoading />
          }
        </Box>
      </Box>
    </React.Fragment>
  )
};

export default ChatList;
