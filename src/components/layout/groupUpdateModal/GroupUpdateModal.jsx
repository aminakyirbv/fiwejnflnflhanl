

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
import { ICONS } from '../../../icons/icons';
import UserBadgeItem from '../userBadgeItem/UserBadgeItem';
import { RequestsDB } from '../../../api/api';
import * as Components from "../../../components";

const GroupUpdateModal = () => {
  const [groupName, setGroupName] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [renameLoading, setRenameLoading] = React.useState(false);

  const { 
    setRender, 
    selectedChat , 
    setSelectedChat, 
    currentUser 
  } = Providers.useAuth();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleRemove = async (user) => {
    if(selectedChat?.groupAdmin._id !== currentUser?._id && user?._id !== currentUser?._id) {
      toast({
        title: "Only admins can deletet someone!",
        duration: 5000,
        status: "warning",
        position: "top-right",
        isClosable: true
      });
      return;
    };

    try {
      setIsLoading(true);
      const { data } = await RequestsDB.DeleteUserFromGroup({
        chatId: selectedChat?._id,
        userId: user?._id
      });

      if(data) {
        user?._id === currentUser?._id ? setSelectedChat() : setSelectedChat(data);
        setRender("Delteted!");
        setIsLoading(false);
      };
    } catch (e) {
      toast({
        title: "Error Occured!",
        description: e.response.data.message,
        duration: 5000,
        status: "error",
        position: "top-left",
        isClosable: true
      });
      setIsLoading(false);
    };
  };

  const handleRename = async () => {
    if(!groupName) return;

    try {
      setRenameLoading(true);

      const { data } = await RequestsDB.RenameGroup({
        chatId: selectedChat._id,
        chatName: groupName
      });

      if(data) {
        setRenameLoading(false);
        setSelectedChat(data);
        setRender("renamed!");
      }

    } catch (e){
      toast({
        title: "Error Occured!",
        description: e.response.data.message,
        duration: 5000,
        status: "error",
        position: "top-right",
        isClosable: true
      });
      setRenameLoading(false);
    }

    setGroupName("");
  }; 

  const handleSearch = async (query) => {
    setIsLoading(true)
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
      setIsLoading(false);
    }
  };

  const handleAddUser = async (user) => {
    if(selectedChat?.users.find(u => u._id === user?._id)) {
      toast({
        title: "User already added!",
        duration: 5000,
        status: "warning",
        position: "top-right",
        isClosable: true
      });
      return;
    };

    if(selectedChat?.groupAdmin._id !== currentUser?._id) {
      toast({
        title: "Only admins can add someone!",
        duration: 5000,
        status: "warning",
        position: "top-right",
        isClosable: true
      });
      return;
    };

    try {
      setIsLoading(true);
      const { data } = await RequestsDB.AddUserToGroup({
        chatId: selectedChat?._id,
        userId: user?._id
      });
      if(data) {
        setSelectedChat(data);
        setRender("Add again!");
        setIsLoading(false);
      };
    } catch(e) {
      toast({
        title: "Error Occured!",
        description: e.response.data.message,
        duration: 5000,
        status: "error",
        position: "top-left",
        isClosable: true
      });
      setIsLoading(false);
    };
  };  

  return (
    <React.Fragment>
      <Button display={{base: "flex"}} onClick={onOpen}>
        <ICONS.HiUserGroup />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            textAlign={"center"}
          >
            {selectedChat?.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box 
              width={"100%"}
              display={"flex"}
              flexWrap={"wrap"}
              pb={3}
            > 
              {selectedChat?.users.map((u, i) => (
                <UserBadgeItem 
                  key={i}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display={"flex"}>
              <Input 
                placeholder='Chat Name'
                mb={3}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>

            <FormControl>
              <Input 
                placeholder='Add User to Group'
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box mt={3}>
              {
                isLoading ? <Components.ChatLoading /> : (
                  searchResult?.slice(0,4).map((c, i) => (
                    <Components.UserListItem
                      key={i}
                      user={c}
                      handleFunction={() => handleAddUser(c)}
                    />
                  ))
                )
              }
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"red"} onClick={() => handleRemove(currentUser)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </React.Fragment>
  )
}

export default GroupUpdateModal;