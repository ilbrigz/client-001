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
import { Box, Checkbox } from '@mantine/core';
import GoogleBtn from './GoogleBtn';
import Label from '@components/common/termsAndServicesLabel';
type Props = { recaptchaRef: React.RefObject<ReCAPTCHA> };

const Login = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [credential, setCredential] = React.useState({
    email: '',
    password: '',
  });
  const [tosChecked, setTosChecked] = React.useState(false);
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
    if (!tosChecked) {
      setError('You need to accept our Terms of Services');
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
        <Checkbox
          label={<Label />}
          checked={tosChecked}
          onChange={(event) => {
            setError('');
            setTosChecked(event.currentTarget.checked);
          }}
        />
        <Flex mt={3}>
          {' '}
          <Text fontSize={12}>New Here?</Text>
          <Text
            color="blue.500"
            fontWeight={700}
            fontSize={12}
            cursor="pointer"
            onClick={() =>
              setAuthModalState((prev) => ({ ...prev, view: 'signup' }))
            }
            onError={() => console.log('something went wrong')}
          >
            &nbsp; SIGN UP
          </Text>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} type="submit" size="sm">
          Login
        </Button>
        <Button
          variant="outline"
          onClick={closeModal}
          colorScheme={'red'}
          size="sm"
        >
          Cancel
        </Button>
      </ModalFooter>
      <Box
        mb={25}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Text sx={{ fontSize: '12px', marginBottom: '15px', fontWeight: 700 }}>
          {' '}
          OR{' '}
        </Text>
        <GoogleBtn />
      </Box>
    </form>
  );
};

export default Login;
