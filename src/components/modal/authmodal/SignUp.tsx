import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  ModalBody,
  Button,
  ModalFooter,
} from '@chakra-ui/react';
import { authModalState } from 'atom/authModal';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import ReCAPTCHA from 'react-google-recaptcha';
import GoogleBtn from './GoogleBtn';
import { Box, Checkbox } from '@mantine/core';
import Label from '@components/common/termsAndServicesLabel';

type Props = { recaptchaRef: React.RefObject<ReCAPTCHA> };

const SignUp = (props: Props) => {
  const { data: session } = useSession();
  const setAuthModalState = useSetRecoilState(authModalState);
  const [tosChecked, setTosChecked] = React.useState(false);
  const [credential, setCredential] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
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
  const onSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    if (credential.password !== credential.confirmPassword) {
      setError('Password and confirm password did not match');
      return;
    }

    if (!tosChecked) {
      setError('You need to accept our Terms of Services');
      return;
    }

    handleForm();
  };
  const handleForm = async () => {
    const { recaptchaRef } = props;
    try {
      const token = await recaptchaRef.current?.executeAsync();
      if (!token) return;
      recaptchaRef.current?.reset();
      axios
        .post('/api/register', {
          email: credential.email,
          password: credential.password,
        })
        .then(async function (response) {
          const r: any = await signIn('credentials', {
            email: credential.email,
            password: credential.password,
            redirect: false,
          });
          if (r?.status === 200) {
            setError('');
          } else {
            setError('Something went wrong.');
          }
        })
        .catch(function (error) {
          recaptchaRef.current?.reset();
          if (error.message == 'Request failed with status code 401') {
            setError('Email already exists');
            return;
          }
          setError(error.message);
        });
    } catch (error) {}
  };
  return (
    <>
      <form onSubmit={onSignUp}>
        <ModalBody>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              isRequired
              value={credential.email}
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="email"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              isRequired
              name="password"
              value={credential.password}
              type="password"
              onChange={handleChange}
              placeholder="password"
              size="sm"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              isRequired
              name="confirmPassword"
              value={credential.confirmPassword}
              type="password"
              onChange={handleChange}
              placeholder="confirm password"
              size="sm"
            />
          </FormControl>
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
            <Text fontSize={12}>Already Have an Account? </Text>
            <Text
              color="blue.500"
              fontWeight={700}
              fontSize={12}
              cursor="pointer"
              onClick={() =>
                setAuthModalState((prev) => ({ ...prev, view: 'login' }))
              }
            >
              &nbsp; LOGIN
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit" size="sm">
            Sign Up
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
          <Text
            sx={{ fontSize: '12px', marginBottom: '15px', fontWeight: 700 }}
          >
            {' '}
            OR{' '}
          </Text>
          <GoogleBtn />
        </Box>
      </form>
    </>
  );
};

export default SignUp;
