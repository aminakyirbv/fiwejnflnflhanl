
import React from 'react';
import { Box } from '@chakra-ui/react';

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <React.Fragment>
      <Box
        px={2}
        py={1}
        borderRadius={"lg"}
        m={1}
        mb={2}
        bgColor={"purple"}
        fontSize={12}
        cursor={"pointer"}
        onClick={handleFunction}
        display={"flex"}
        gap={"10px"}
        color={"white"}
        alignItems={"center"}
      >
        {user?.name}
        <span>&times;</span>
      </Box>
    </React.Fragment>
  )
}

export default UserBadgeItem;