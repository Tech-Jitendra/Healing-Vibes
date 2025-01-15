// react and nextb import
import React, { useState } from 'react';
// mantine component
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Box, Flex, Image, useMantineTheme } from '@mantine/core';
// styles component
import { createStyle } from './EmailChangeModal.styles';
// internals components
import { EmailChangeOtpModal } from '../EmailChangeOtpModal/EmailChangeOtpModal';
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseModal } from '@/components/elements/BaseModal/BaseModal';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { typography } from '../../../../../themes/Mantine/typography';
// stores import
import { useStores } from '@/models';
// others import
import { Images } from '@/public';
import { translate } from '@/i18n';
import { Input } from '@/components/elements/Input/Input';

import ErrorMessage from '@/components/elements/ErrorMessage/ErrorMessage';
import I18nFlex from '@/components/elements/I18nFlex/I18nFlex';
import Error from 'next/error';

export const EmailChangeModal = (props: { opened?: any; onClose?: any; setAddressRecall: any }) => {
  const { i18nStore, userStore } = useStores();
  const emailOTP = useDisclosure(false);
  const theme = useMantineTheme();
  const useStyles = createStyle();
  const { classes } = useStyles();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');

  const changeMail = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : translate('profile.error.mailError'),
    },
  });

  const changeEmail = () => {
    let results = changeMail.validate();
    if (results.hasErrors) return;
    if (!changeMail.isValid()) return;
    else {
      setLoader(true);
      userStore.changeEmail(changeMail.values.email).then((res) => {
        if (res.ok) {
          props.onClose();
          changeMail.reset();
          emailOTP[1].open();
          setLoader(false);
          props.setAddressRecall(false);
        } else if (res.code == 400) {
          setLoader(false);
          setError(res.message[0]);
          changeMail.reset();
          setTimeout(() => {
            setError('');
          }, 5000);
        }
      });
    }
  };

  return (
    <>
      <BaseModal
        size={'sm'}
        padding={'30px'}
        radius={'xl'}
        opened={props.opened}
        onClose={() => {
          props.onClose();
          changeMail.reset();
          props.setAddressRecall(false);
        }}
        withCloseButton={false}
      >
        <form onSubmit={changeMail.onSubmit((values) => console.log(values))}>
          <Flex direction={'column'} justify={'space-between'} w={'100%'} h={'300px'}>
            <I18nFlex justify={'space-between'} align={'center'}>
              <BaseText
                txtkey="profile.modal.changeEmail"
                style={typography.headings[i18nStore.getCurrentLanguage()].h6}
                color={theme.colors.dark[8]}
              />

              <Image
                onClick={() => {
                  props.onClose();
                  changeMail.reset();
                  props.setAddressRecall(false);
                }}
                className="cursor"
                src={Images.close_modal_icon}
                alt="close_modal_icon"
                width={'14px'}
                height={'14px'}
              />
            </I18nFlex>
            <BaseText
              ta={i18nStore.isRTL ? 'right' : 'left'}
              txtkey="profile.modal.emailPara"
              style={typography.paragraph[i18nStore.getCurrentLanguage()]['p1.5']}
              color={theme.colors.gray[6]}
            />
            <Box>
              <BaseText
                className={classes.input}
                txtkey="profile.modal.email"
                style={typography.label[i18nStore.getCurrentLanguage()].l1}
              />
              <Input
                placeholder={`${translate('profile.email')}`}
                style_variant={'inputText2'}
                component={'input'}
                variant="default"
                classNames={{
                  input: classes.input,
                }}
                {...changeMail.getInputProps('email')}
                // error={changeMail.errors.email}
              />
            </Box>
            {error ? <ErrorMessage message={error} /> : null}

            {/* { console.log(error)} */}
            <BaseButton
              mt={'30px'}
              loading={loader}
              style_variant={!changeMail.isValid() ? 'disabled' : 'filled'}
              color_variant={!changeMail.isValid() ? 'gray' : 'blue'}
              onClick={changeEmail}
            >
              <BaseText txtkey="global.button.continue" />
            </BaseButton>
          </Flex>
        </form>
      </BaseModal>
      <EmailChangeOtpModal
        setAddressRecall={props.setAddressRecall}
        opened={emailOTP[0]}
        onClose={emailOTP[1].close}
      />
    </>
  );
};
