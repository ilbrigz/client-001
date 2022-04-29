import { Button } from '@mantine/core';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';

type Props = {};

function sandbox({}: Props) {
  const { data: session } = useSession();
  return (
    <Button
      variant="white"
      color="dark"
      size="md"
      sx={(theme) => ({
        borderRadius: '60px',
        fontSize: '10pt',
        fontWeight: 700,
        height: '34px',
        border: '1px solid',
        borderColor: theme.colors.gray[6],
        _hover: {
          bg: 'gray.50',
        },
        '&:hover': {
          backgroundColor: theme.colors.gray[5],
        },
      })}
      leftIcon={<Image src="/images/googlelogo.png" height={15} width={15} />}
      onClick={() => signIn('google', { redirect: false }, { prompt: 'login' })}
    >
      Continue With Google
    </Button>
  );
}

export default sandbox;
