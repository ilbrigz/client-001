import { ActionIcon, Text, Title } from '@mantine/core';
import React from 'react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import Octo from '@components/common/Octo';
import { authModalState } from 'atom/authModal';
import { useSetRecoilState } from 'recoil';
import { createStyles, Center, Stack, Box } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: { height: '95vh', display: 'flex', flexDirection: 'column' },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    background: '#6D2974',
    position: 'relative',
    flexGrow: 1,
    textAlign: 'center',
    color: theme.white,
  },
  wave: {
    marginTop: '-25px',
    zIndex: -5,
    position: 'relative',
    // '& img': {
    //   border: '1px solid red',
    // },
  },
}));

type Props = {};

export default function Hero({}: Props) {
  const { classes } = useStyles();
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <div className={classes.wrapper}>
      <Center className={classes.contentContainer}>
        <Title
          order={1}
          sx={(theme) => ({
            fontSize: theme.fontSizes.xl,
          })}
        >
          Welcome to Octabit Studios
        </Title>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Necessitatibus non 1{' '}
        </Text>
        <ActionIcon
          onClick={() => {
            setAuthModalState((prev) => ({
              ...prev,
              open: true,
            }));
          }}
          sx={(theme) => ({
            borderColor: 'white',
            color: 'white',
            padding: '20px',
            '&:hover': {
              color: theme.colors.dark[5],
            },
          })}
          mt="1.5rem"
        >
          <TriangleDownIcon />
        </ActionIcon>
        <Box
          sx={(theme) => ({
            marginTop: '2rem',
            width: '100px',
            height: '100px',
            fill: theme.white,
          })}
        >
          <Octo />
        </Box>
      </Center>
      <div className={classes.wave}>
        <img src="/wave.svg" />
      </div>
    </div>
  );
}
