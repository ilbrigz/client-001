import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const Bottom = (props: Props) => {
  return (
    <Flex
      bg="brand.main"
      h="600px"
      color="whiteAlpha.900"
      clipPath={{
        base: 'polygon(0 0, 100% 8%, 100% 100%, 0% 100%)',
        lg: 'polygon(0 0, 100% 17%, 100% 100%, 0% 100%)',
      }}
      mt={10}
    >
      <Center w="100%">
        <Heading textAlign="center">Coming Soon</Heading>
      </Center>
    </Flex>
  );
};

export default Bottom;
