import { Text } from '@chakra-ui/react';
const Label = () => (
  <Text fontSize={10.5}>
    I agree to the{' '}
    <Text as="span" style={{ textDecoration: 'underline', fontWeight: 700 }}>
      Terms of Service
    </Text>{' '}
    and{' '}
    <Text as="span" style={{ textDecoration: 'underline', fontWeight: 700 }}>
      Policy
    </Text>
    ;
  </Text>
);

export default Label;
