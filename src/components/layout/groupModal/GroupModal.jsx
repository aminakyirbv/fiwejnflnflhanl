

import React from 'react';
import { 
  Box,
  Button, 
  FormControl, 
  Input, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  useDisclosure, 
  useToast
} from '@chakra-ui/react';

import { Providers } from '../../../providers';
import { RequestsDB } from '../../../api/api';
import * as Components from "../../../components";

const GroupModal = ({ children }) => {
  const [groupName, setGroupName] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { currentUser, chats, setChats } = Providers.useAuth();

  const handleSearch = async (query) => {
    if(!query) {
      return;
    }
    setSearch(query);

    try {
      setIsLoading(true);
      const { data } = await RequestsDB.SearchUser(search);
      if(data) {
        setIsLoading(false);
        setSearchResult(data);
      }
    } catch(e) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        duration: 5000,
        status: "error",
        position: "top-left",
        isClosable: true
      });
    }
  };

  const handleSubmit = async () => {
    if(!groupName || !selectedUser) {
      toast({
        title: "Please fill the all Fields!",
        duration: 5000,
        status: "warning",
        position: "top-left",
        isClosable: true
      });
      return;
    }

    try {
      const { data } = await RequestsDB.CreateGroup({
        name: groupName,
        users: JSON.stringify(selectedUser?.map(u => u._id))
      });
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        duration: 5000,
        status: "success",
        position: "top-right",
        isClosable: true
      });
    } catch(e) {
      toast({
        title: "Failed to create the Chat!",
        description: e.response.message,
        duration: 5000,
        status: "error",
        position: "top-left",
        isClosable: true
      });
    }
  };

  const handleGroup = (user) => {
    if(selectedUser.includes(user)) {
      toast({
        title: "User already added!",
        duration: 5000,
        status: "warning",
        position: "top-right",
        isClosable: true
      });
      return;
    };

    setSelectedUser([...selectedUser, user])
  };

  const handleDelete = (user) => {
    setSelectedUser(prev => prev.filter(c => c._id !== user._id))
  }

  return (
    <React.Fragment>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader 
            fontSize={"35px"} 
            display={"flex"} 
            justifyContent={"center"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
          >
            <FormControl isRequired>
              <Input 
                placeholder='Chat Name'
                mb={3}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <Input 
                placeholder='Add users'
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w={"100%"} display={"flex"} flexWrap={"wrap"}>
              {
                selectedUser?.map((c, i) => (
                  <Components.UserBadgeItem
                    key={i}
                    user={c}
                    handleFunction={() => handleDelete(c)}
                  />
                ))
              }
            </Box>
            <Box mt={4} w={"100%"}>
              {
                isLoading ? <Components.ChatLoading /> : (
                  searchResult?.slice(0,4).map((c, i) => (
                    <Components.UserListItem
                      key={i}
                      user={c}
                      handleFunction={() => handleGroup(c)}
                    />
                  ))
                )
              }
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme={"blue"}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </React.Fragment>
  )
}

export default GroupModal;
