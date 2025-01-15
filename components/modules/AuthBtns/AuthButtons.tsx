import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { Group } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { createStyle } from './AuthBtns.styles';
import { useStores } from '@/models';

const AuthButtons: React.FC = () => {
  const useStyles = createStyle();
  const { classes } = useStyles();
  const router = useRouter();
  const { userStore } = useStores();

  if (userStore.isLoggedInUser) console.log('true--- user is logeed in 16');

  return (
    <Group>
      <BaseButton
        style_variant="filled"
        className={classes.loginButton}
        color_variant="lime"
        onClick={() => {
          router.push('/login');
        }}
      >
        <BaseText size={15} fontWeight_variant={700} txtkey="global.button.login" />
      </BaseButton>

      <BaseButton
        style_variant="filled"
        className={classes.loginButton}
        color_variant="blue"
        onClick={() => {
          router.push('/signup');
        }}
      >
        <BaseText size={15} fontWeight_variant={700} txtkey="global.button.signup" />
      </BaseButton>
    </Group>
  );
};

export default AuthButtons;
