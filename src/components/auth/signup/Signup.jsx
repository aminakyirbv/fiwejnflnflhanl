import React from 'react';
import { 
  Button,
  FormControl, 
  FormLabel, 
  Input, 
  useToast, 
  VStack 
} from '@chakra-ui/react';
import { useForm } from "react-hook-form";

import { RequestsDB } from '../../../api/api';

const Signup = ({setAuthState}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [avatar, setAvatar] = React.useState("");

  const toast = useToast();

  const {
    register,
    handleSubmit
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    const isValidate = 
      !!Object.entries(data)
      .map((i) => i[1] !== " ")
      .some(el => el);

    if(!isValidate) {
      toast({
        title: "Please Fill all the Fields!",
        duration: 5000,
        status: "warning",
        position: "top-right",
        isClosable: true
      });
      setIsLoading(false);
      return;
    };

    try {
      const request = await RequestsDB.CreateUser({...data, avatar});
      toast({
        title: "Registration successfully!",
        duration: 5000,
        status: "success",
        position: "top-right",
        isClosable: true
      });
      if(!!request) {
        setAuthState("login")
      }
      setIsLoading(false)
    } catch(e) {
      toast({
        title: "Error Occured!",
        description: e.response.data.message,
        duration: 5000,
        status: "warning",
        position: "top-right",
        isClosable: true
      });
      setIsLoading(false);
    };
  };

  const sendPhoto = (ava) => {
    setIsLoading(true);
    if(ava === undefined) {
      toast({
        title: "Please select an Image!",
        duration: 5000,
        status: "warning",
        position: "top-right",
        isClosable: true
      });
      return;
    }

    if(ava.type === "image/jpeg" || ava.type === "image/png") {
      const data = new FormData();
      data.append("file", ava);
      data.append("upload_preset", "mern-chat");
      data.append("cloud_name", "almazesh");
      fetch("https://api.cloudinary.com/v1_1/almazesh/image/upload", {
        method: "POST",
        body: data
      })
      .then(res => res.json())
      .then(res => {
        setAvatar(res?.url.toString());
        setIsLoading(false)
        toast({
          title: "Image successfully uploaded!",
          duration: 5000,
          status: "success",
          position: "top-right",
          isClosable: true
        });
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: err?.message,
          duration: 5000,
          status: "warning",
          position: "top-right",
          isClosable: true
        });
      })
      .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false);
      toast({
        title: "Please select an Image!",
        duration: 5000,
        status: "warning",
        position: "top-right",
        isClosable: true
      });
      return;
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={"5px"}>
          <FormControl isRequired >
            <FormLabel>
              Name
            </FormLabel>
            <Input 
              type={"text"}
              placeholder={"Enter your Name!"}
              {...register("name")}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>
              Email
            </FormLabel>
            <Input 
              type={"email"}
              placeholder={"Enter your Email!"}
              {...register("email")}
            />
          </FormControl>
          
          <FormControl isRequired>
            <FormLabel>
              Password
            </FormLabel>
            <Input 
              type={"password"}
              placeholder={"Enter your Password!"}
              {...register("password")}
            />
          </FormControl>

          <FormControl >
            <FormLabel>
              Upload your Avatar
            </FormLabel>
            <Input 
              type={"file"}
              p={1.5}
              accept='image/*'
              placeholder={"Enter your Password!"}
              onChange={(e) => sendPhoto(e.target.files[0])}
            />
          </FormControl>

          <Button
            colorScheme={"blue"}
            width={"100%"}
            style={{marginTop: 15}}
            type={"submit"}
            isLoading={isLoading}
          >
            Sign Up
          </Button>
        </VStack>
      </form>
    </React.Fragment>
  )
}

export default Signup;