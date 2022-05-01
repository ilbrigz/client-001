import { ActionIcon, Text, Title } from '@mantine/core';
import React from 'react';
import Octo from '@components/common/Octo';
import { authModalState } from 'atom/authModal';
import { useSetRecoilState } from 'recoil';
import { createStyles, Center } from '@mantine/core';
import { AiFillCaretDown } from 'react-icons/ai';

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
  },
  icon: {
    marginTop: '20px',
    padding: 10,
    height: '50px',
    width: '50px',
    border: '1px solid',
    borderColor: theme.colors.gray[1],
    '&:hover svg': {
      fill: theme.colors.gray[7],
    },
  },
  OctoWrapper: {
    marginTop: '2rem',
    width: '100px',
    height: '100px',
    fill: theme.white,
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
          Necessitatibus non 0{' '}
        </Text>
        <ActionIcon
          className={classes.icon}
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              open: true,
            }))
          }
        >
          <AiFillCaretDown size="5em" color="white" />
        </ActionIcon>
        <div className={classes.OctoWrapper}>
          <Octo />
        </div>
      </Center>
      <div className={classes.wave}>
        <img src="/wave.svg" />
      </div>
    </div>
  );
}
