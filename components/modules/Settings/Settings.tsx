import React, { useEffect, useState } from 'react';
import { Box, Divider, Flex, Select, Stack, Switch } from '@mantine/core';

import useStyles from './Settings.styles';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { typography } from '@/themes/Mantine/typography';
import { useStores } from '@/models';
import Router from 'next/router';
import { languageDetails } from '@/models/modules/i18n/schema';
import { translate } from '@/i18n';

export const Settings = () => {
  const { i18nStore, settingsStore } = useStores();
  const { classes } = useStyles();
  const [notificationSettings, setNotificationSettings] = useState<any>({
    push_notification: null,
    email_notification: null,
    sms_notification: null,
  });

  const handleNotification = (data: any) => {
    settingsStore.editSettings(data).then((res) => {
      if (res.ok) {
        console.log('notifiaction has been updated');
      }
    });
  };

  useEffect(() => {
    settingsStore.getSettings().then((res) => {
      if (res.ok) {
        if (settingsStore.settings != null) {
          setNotificationSettings({
            push_notification: settingsStore.settings.push_notification,
            email_notification: settingsStore.settings.email_notification,
            sms_notification: settingsStore.settings.sms_notification,
          });
        }
      }
    });
  }, []);

  return (
    <Box className={classes.container}>
      <BaseText
        txtkey="profile.setting.changeLanguage"
        // style={typography.headings[i18nStore.getCurrentLanguage()].h5}
        fw={700}
      />
      <Select
        mt={'10px'}
        placeholder="English"
        onChange={async (value: any) => {
          await i18nStore.setAppLanguage(value);
          Router.reload();
        }}
       
        defaultValue={i18nStore.getCurrentLanguage()}
        data={[
          // { value: 'en', label: `${languageDetails.en.localName}` },
          // { value: 'ar', label: `${languageDetails.ar.localName}` },
        ]}
      />
      <Divider my={'xl'} />

      <Stack>
        <Flex justify={'space-between'} align={'center'}>
          <BaseText txtkey={'profile.setting.push'} />
          <Switch
            onLabel={translate("profile.setting.on")}
            offLabel={translate("profile.setting.off")}
            defaultChecked={settingsStore.settings?.push_notification}
            onChange={() => {
              setNotificationSettings({
                ...notificationSettings,
                push_notification: !notificationSettings?.push_notification,
              });
              handleNotification({
                ...notificationSettings,
                push_notification: !notificationSettings?.push_notification,
              });
            }}
          />
        </Flex>
        <Flex justify={'space-between'} align={'center'}>
          <BaseText txtkey={'profile.setting.emailNotification'} />
          <Switch
            onLabel={translate("profile.setting.on")}
            offLabel={translate("profile.setting.off")}
            defaultChecked={settingsStore.settings?.email_notification}
            onChange={() => {
              setNotificationSettings({
                ...notificationSettings,
                email_notification: !notificationSettings?.email_notification,
              });
              handleNotification({
                ...notificationSettings,
                email_notification: !notificationSettings?.email_notification,
              });
            }}
          />
        </Flex>
        <Flex justify={'space-between'} align={'center'}>
          <BaseText txtkey={'profile.setting.smsNotification'} />
          <Switch
            onLabel={translate("profile.setting.on")}
            offLabel={translate("profile.setting.off")}
            defaultChecked={settingsStore.settings?.sms_notification}
            onClick={() => {
              setNotificationSettings({
                ...notificationSettings,
                sms_notification: !notificationSettings?.sms_notification,
              });
              handleNotification({
                ...notificationSettings,
                sms_notification: !notificationSettings?.sms_notification,
              });
            }}
          />
        </Flex>
      </Stack>
    </Box>
  );
};
