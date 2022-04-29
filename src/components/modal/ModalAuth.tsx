import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Button,
} from '@chakra-ui/react';
import { authModalState } from 'atom/authModal';
import { SessionContextValue, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { useRecoilState } from 'recoil';
import Login from './authmodal/Login';
import SignUp from './authmodal/SignUp';
import ReCAPTCHA from 'react-google-recaptcha';

type Props = {};

const ModalAuth = (props: Props) => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const { data: session }: SessionContextValue & { role?: 'string' } =
    useSession();
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };
  return (
    <Modal
      isOpen={modalState.open}
      onClose={closeModal}
      isCentered
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          {session?.user
            ? `Hello ${session?.role}`
            : modalState.view.toUpperCase()}
        </ModalHeader>
        {session?.user ? (
          <ModalBody>
            <h1>
              Signed in as <Text> {session?.user?.email}</Text> <br />
            </h1>
            <Button
              onClick={() => {
                signOut({ redirect: false });
              }}
            >
              Logout
            </Button>
          </ModalBody>
        ) : modalState.view === 'login' ? (
          <Login recaptchaRef={recaptchaRef} />
        ) : (
          <SignUp recaptchaRef={recaptchaRef} />
        )}
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          onError={() => {
            console.log('something went wrong');
            recaptchaRef.current?.reset();
          }}
          onChange={(value) => console.log(value)}
        />
      </ModalContent>
    </Modal>
  );
};

export default ModalAuth;
