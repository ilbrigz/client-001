import { TriangleDownIcon } from '@chakra-ui/icons';
import { Flex, Heading, Box, Text } from '@chakra-ui/react';
import { Container } from '@mantine/core';
import React from 'react';
import Image from 'next/image';

type Props = {};

const AboutUs = (props: Props) => {
  return (
    <Flex
      //   bg="yellow"
      alignItems="center"
      flexDir="column"
      overflow="hidden"
      minH={'90vh'}
      //   h="80vh"
    >
      <Container size="xl">
        <Heading
          // fontSize={{
          //   sm: '3.5em',
          //   md: '2em',
          //   lg: '3em',
          //   xl: '3,5em',
          // }}
          fontSize={{ base: '28px', md: '36px', lg: '42px' }}
          textAlign="center"
          mt={30}
        >
          About Us
        </Heading>
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          justifyContent="center"
        >
          <Box display="block" flexBasis="50%" px={{ base: 5, lg: '4em' }}>
            <Image
              src="/computer.svg"
              layout="responsive"
              height={300}
              width={300}
            />
          </Box>
          <Box flexBasis="50%" px={5} mt={{ base: 0, lg: '4em' }}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              alias magnam ut reprehenderit dignissimos, autem, eveniet,
              consequuntur fugit sint quae eum dolor nemo commodi sunt nihil
              blanditiis doloribus asperiores aut. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Aliquid alias magnam ut
              reprehenderit dignissimos, autem, eveniet, consequuntur fugit sint
              quae eum dolor nemo commodi sunt nihil blanditiis doloribus
              asperiores aut. Lorem ipsum dolor sit amet.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AboutUs;
