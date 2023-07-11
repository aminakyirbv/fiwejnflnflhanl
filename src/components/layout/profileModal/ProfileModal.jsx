import React from 'react'
import { 
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  Text, 
  useDisclosure 
} from '@chakra-ui/react';

import { ICONS } from '../../../icons/icons';

const ProfileModal = ({ user, children }) => {
  const [profileImage, setProfileImage] = React.useState("");
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const NoneAvatar = "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png";

  React.useEffect(() => {
    if(user?.avatar) {
      setProfileImage(user.avatar);
    } else {
      setProfileImage(NoneAvatar);
    }
  }, [user?.avatar]);

  return (
    <React.Fragment>
      {
        children ? (
          <span onClick={onOpen}>{children}</span>
        ) : (
          <Button>
            <ICONS.BiUserPin onClick={onOpen}/>
          </Button>
        )
      }

      <Modal 
        isOpen={isOpen}
        onClose={onClose}
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"40px"}
            display={"flex"}
            justifyContent={"center"}
          >
            {user?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Image 
              borderRadius={"full"}
              boxSize={"150px"}
              src={profileImage}
              alt={user?.name}
            />

            <Text
              marginTop={"30px"}
              fontSize={{ base: "28px", md: "30px" }}
            >
              Email: {user?.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={"orange"}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  )
}

export default ProfileModal;