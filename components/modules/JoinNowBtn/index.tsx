/* eslint-disable import/extensions */
import { useState } from 'react';
import { IconPlus, IconX } from '@tabler/icons-react';
import { useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { useRouter } from 'next/router';

export default function JoinNowBtn() {
  const theme = useMantineTheme();
  const [status, setStatus] = useState<Boolean>(true);
  const router = useRouter();
  const handleNotification = () => {
    status
      ? notifications.show({
          loading: false,
          message: 'Community Joined Successfully',
          autoClose: 2000,
          withCloseButton: true,
          icon: <IconPlus size={60} strokeWidth={5} color={theme.colors.green[0]} />,
          style: {
            backgroundColor: theme.colors.cyan[2],
            borderRadius: 15,
            fontSize: '110px',
            fontWeight: 700,
          },
        })
      : notifications.show({
          loading: false,
          message: 'Community Left !',
          autoClose: 2000,
          withCloseButton: true,
          icon: <IconX size={60} strokeWidth={4} color={theme.colors.red[2]} />,
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
      color_variant={status ? 'blue' : 'red'}
      radius={15}
      mt={15}
      onClick={()=>{
        handleNotification();
        router.push('/community/join')
      }}
    >
      {status ? (
        <BaseText txtkey="global.button.Join" />
      ) : (
        <BaseText txtkey="global.button.Joined" />
      )}
    </BaseButton>
  );
}
