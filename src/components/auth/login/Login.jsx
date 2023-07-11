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
import { Hooks } from '../../../hooks';

const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();
  const { actions } = Hooks.useRedirect();

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
      const request = await RequestsDB.LoginUser(data);
      toast({
        title: "Logged in successfully!",
        duration: 5000,
        status: "success",
        position: "top-right",
        isClosable: true
      });
      localStorage.setItem("UserInfo", JSON.stringify(request.data));
      actions.goToChat();
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
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={"5px"}>
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

          <Button
            colorScheme={"blue"}
            width={"100%"}
            style={{marginTop: 15}}
            type={"submit"}
            isLoading={isLoading}
          >
            Log In
          </Button>
        </VStack>
      </form>
    </React.Fragment>
  )
}

export default Login;