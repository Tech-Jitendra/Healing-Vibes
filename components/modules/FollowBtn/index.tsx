/* eslint-disable import/extensions */
import { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseText } from '@/components/elements/BaseText/BaseText';

export default function FollowBtn() {
  const theme = useMantineTheme();
  const [status, setStatus] = useState<Boolean>(true);
  const handleNotification = () => {
    status
      ? notifications.show({
          loading: false,
          message: 'User profile followed',
          autoClose: 2000,
          withCloseButton: true,
          icon: <IconCheck size={60} strokeWidth={5} color={theme.colors.green[0]} />,
          style: {
            backgroundColor: theme.colors.cyan[2],
            borderRadius: 15,
            fontSize: '110px',
            fontWeight: 700,
          },
        })
      : notifications.show({
          loading: false,
          message: 'User profile unfollowed',
          autoClose: 2000,
          withCloseButton: true,
          icon: <IconX size={60} strokeWidth={5} color={theme.colors.red[8]} />,
          style: {
            backgroundColor: theme.colors.cyan[2],
            borderRadius: 15,
            fontSize: '110px',
            fontWeight: 700,
          },
        });

    setStatus(!status);
  };
  return (
    <BaseButton
      style_variant="filled"
      color_variant={status ? 'lime' : 'blue'}
      radius={15}
      onClick={handleNotification}
    >
      {status ? (
        <BaseText txtkey="global.button.follow" />
      ) : (
        <BaseText txtkey="global.button.unfollow" />
      )}
    </BaseButton>
  );
}
