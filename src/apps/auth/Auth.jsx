import React from 'react';
import { 
  Box, 
  Container, 
  Tab, 
  TabList, 
  TabPanel, 
  TabPanels, 
  Tabs, 
  } 
from '@chakra-ui/react';

import * as Components from "../../components";

const Auth = () => {
  const [authState, setAuthState] = React.useState("login");

  return (
    <React.Fragment>
      <section className='auth_section'>
        <Container 
          maxW={"xl"} 
          height={"80%"}
          centerContent 
          display={"flex"} 
          justifyContent={"center"} 
          alignItems={"center"}
        >
          <Box
            bg={"white"}
            width={"100%"}
            p={4}
            m={"40px 0 15px 0"}
            borderRadius={"lg"}
            borderWidth={"1px"}
          >
            <Tabs>
              <TabList 
                display={"flex"} 
                justifyContent={"space-around"}
              >
                <Tab width={"50%"} onClick={() => setAuthState("signup")}>Sign Up</Tab>
                <Tab width={"50%"} onClick={() => setAuthState("login")}>Log In</Tab>
              </TabList>

              <TabPanels padding={"30px"}>
                {
                  authState === "signup" && (
                    <Components.Signup setAuthState={setAuthState}/>
                  )
                }
                {
                  authState === "login" && (
                      <Components.Login />
                  )
                }
              </TabPanels>
            </Tabs>
          </Box>
        </Container>      
      </section>
    </React.Fragment>
  )
}

export default Auth;