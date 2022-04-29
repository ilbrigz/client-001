import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import { authModalState } from 'atom/authModal';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { TextInput } from '@mantine/core';
import { signIn, SignInResponse } from 'next-auth/react';
import ReCAPTCHA from 'react-google-recaptcha';

type Props = { recaptchaRef: React.RefObject<ReCAPTCHA> };

const Login = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [credential, setCredential] = React.useState({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setError('');
    setCredential({
      ...credential,
      [e.target.name]: value,
    });
  };
  const closeModal = () => {
    setAuthModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };
  const onLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { recaptchaRef } = props;
    if (!credential.email || !credential.password) {
      setError('Email and Password must not be empty');
      return;
    }
    try {
      const token = await recaptchaRef.current?.executeAsync();
      if (!token) return;
      recaptchaRef.current?.reset();
      const r: any = await signIn('credentials', {
        email: credential.email,
        password: credential.password,
        redirect: false,
      });
      if (r?.status === 401) {
        setError('Login Failed. Incorrect Username or Password.');
      } else if (r?.status === 200) {
        setError('');
      } else {
        setError('Something went wrong.');
      }
    } catch (error) {
      console.log(error);
      recaptchaRef.current?.reset();
      return;
    }
  };

  return (
    <form onSubmit={onLogin}>
      <ModalBody>
        {' '}
        <TextInput
          label="Your email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={credential.email}
        />
        <TextInput
          name="password"
          value={credential.password}
          type="password"
          onChange={handleChange}
          label="Password"
          placeholder="password"
        />
        <Text color="red.500" fontSize={12} mt={3}>
          {error}
        </Text>
        <Flex mt={3}>
          {' '}
          <Text fontSize={10}>New Here?</Text>
          <Text
            color="blue.500"
            fontWeight={700}
            fontSize={10}
            cursor="pointer"
            onClick={() =>
              setAuthModalState((prev) => ({ ...prev, view: 'signup' }))
            }
            onError={() => console.log('somthing went wrong')}
          >
            &nbsp; SIGN UP
          </Text>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} type="submit">
          Login
        </Button>
        <Button variant="outline" onClick={closeModal} colorScheme={'red'}>
          Cancel
        </Button>
      </ModalFooter>
    </form>
  );
};

export default Login;
