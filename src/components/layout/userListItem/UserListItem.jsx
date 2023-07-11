
import React from 'react';
import { Avatar, Box, Text } from '@chakra-ui/react';

const UserListItem = ({user, handleFunction}) => {

  return (
    <React.Fragment>
      <Box
        onClick={handleFunction}
        cursor={"pointer"}
        bg={"#e8e8e8"}
        _hover={{
          background: "#38b2ac",
          color:"white"
        }}
        overflow={"hidden"}
        w={"100%"}
        display={"flex"}
        alignItems={"center"}
        color={"black"}
        px={3}
        py={2}
        mb={2}
        borderRadius={"lg"}
      >
        <Avatar 
          mr={2}
          size={"sm"}
          cursor={"pointer"}
          name={user?.name}
          src={user?.avatar}
        />
        <Box>
          <Text>{user?.name}</Text>
          <Text fontSize={"xs"}>
            <b>Email:</b>
            {user?.email}
          </Text>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default UserListItem;
