// react and nextb import
import React, { useState } from 'react';
// mantine component
import { Flex, Image, PinInput, Stack, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
// style import
import useStyles from './EmailOTP.styles';
// internals components
import ErrorMessage from '@/components/elements/ErrorMessage/ErrorMessage';
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseModal } from '@/components/elements/BaseModal/BaseModal';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { typography } from '../../../../../themes/Mantine/typography';
// stores import
import { useStores } from '@/models';
// others import
import { Images } from '@/public';
import { SuccessfulModal } from '../SuccessfulModal/SuccessfulModal';
 
import { translate } from '@/i18n';
import I18nFlex from '@/components/elements/I18nFlex/I18nFlex';

export const EmailChangeOtpModal = (props: { opened?: any; onClose?: any; setAddressRecall?:any }) => {
  const { i18nStore, userStore } = useStores();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [error, setError] = useState('');
  const [otpResendResponseText, setOtpResendResponseText] = useState('');
  const [loader, setLoader] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const otpVerify = useForm({
    initialValues: {
      otp: '',
    },
    validate: {
      otp: (value) => {
        if (value.length != 4) return translate('profile.error.errorMessageForOTP');
      },
    },
  });

  const verifyEmailChangeOtp = () => {
    setLoader(true);
    let results = otpVerify.validate();
    if (results.hasErrors) return;
    if (!otpVerify.isValid()) return setLoader(false);
    else {
      userStore.verifyChangeEmail(otpVerify.values.otp).then((res) => {
        if (res.ok) {
          otpVerify.reset();
          props.onClose();
          open();
          props.setAddressRecall(true)
        } else if (res.code == 400) {
          if (res.error) {
            setError(res.error);
            otpVerify.reset();
            setTimeout(() => {
              setError('');
            }, 5000);
          }
        }
        setLoader(false);
      });
    }
  };

  const resendChangeEmailOtp = () => {
    userStore.resendChangeEmailOtp().then((res) => {
      if (res.ok) {
        otpVerify.reset();
        setOtpResendResponseText(res.message);
        setTimeout(() => {
          setOtpResendResponseText('');
        }, 5000);
      }
    });
  };

  return (
    <>
      <BaseModal
        size={'sm'}
        padding={'30px'}
        radius={'xl'}
        opened={props.opened}
        onClose={() => {
          otpVerify.reset();
          props.onClose();
        }}
        withCloseButton={false}
      >
        <Flex direction={'column'} justify={'space-between'} w={'100%'} h={'400px'}>
          <I18nFlex
            justify={'space-between'}
            align={'center'}
          >
            <BaseText
              txtkey="profile.modal.verifyOtp"
              style={typography.headings[i18nStore.getCurrentLanguage()].h6}
              color={theme.colors.dark[8]}
            />

            <Image
              onClick={() => {
                otpVerify.reset();
                props.onClose();
              }}
              className='cursor'
              src={Images.close_modal_icon}
              alt="close_modal_icon"
              width={'14px'}
              height={'14px'}
            />
          </I18nFlex>
          <BaseText
            txtkey="profile.modal.emailOtpPara"
            my={'36px'}
            color={theme.colors.gray[6]}
            style={typography.label[i18nStore.getCurrentLanguage()].l1}
          />
          <form onSubmit={otpVerify.onSubmit((values) => console.log(values))}>
            <Stack>
              <PinInput
                dir={i18nStore.isRTL ? 'rtl' : 'ltr'}
                variant="filled"
                placeholder=""
                // className={classes.input}
                type={'number'}
                size={'50px'}
                spacing={'40px'}
                // value={otp}
                // onChange={setOtp}
                {...otpVerify.getInputProps('otp')}
              />
            </Stack>
          </form>
          {error ? <ErrorMessage message={error} /> : null}
          {otpResendResponseText ? (
            <ErrorMessage text_color={theme.colors.blue[4]} message={otpResendResponseText} />
          ) : null}
          <I18nFlex
            w={'100%'}
            justify={'center'}
            my={'40px'}
          >
            <BaseText
              txtkey="profile.modal.resendCode"
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
            />
            &nbsp;
            <BaseText
              onClick={resendChangeEmailOtp}
              txtkey="profile.modal.resendText"
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
              className={classes.pointer}
              color={theme.colors.blue[4]}
            />
          </I18nFlex>
          <BaseButton 
             
            loading={loader}
            style_variant={!otpVerify.isValid() ? 'disabled' : 'filled'}
            color_variant={!otpVerify.isValid() ? 'gray' : 'blue'}
            onClick={verifyEmailChangeOtp}
          >
            <BaseText txtkey="global.button.verify" />
          </BaseButton>
        </Flex>
      </BaseModal>
      <SuccessfulModal opened={opened} onClose={close} para="profile.modal.emailChanged" />
    </>
  );
};
