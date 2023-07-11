import React from 'react';
import { Box } from '@chakra-ui/react';

import * as Components from "../../../components";

const Chatpage = () => {


  return (
    <React.Fragment>
      <section className='chat_container'>
        <Components.SideDrawer />
        <Box
          display={"flex"}
          justifyContent="space-between"
          width={"100%"}
          height={"100vh"}
          padding={"10px"}
        >
          <Components.ChatList />
          <Components.ChatRoom />
        </Box>
      </section>
    </React.Fragment>
  )
}
export default Chatpage;