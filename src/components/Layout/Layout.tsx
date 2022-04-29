import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import ModalAuth from '@components/modal/ModalAuth';
import Navbar from '@components/Navbar/Navbar';
import { authModalState } from 'atom/authModal';
import React, { ReactNode } from 'react';
import { useRecoilState } from 'recoil';

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <>
      <ModalAuth />
      {children}
    </>
  );
}
