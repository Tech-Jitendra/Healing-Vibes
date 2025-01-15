// react and nextb import
import React, { useState } from 'react';
// mantine component
import { Center, Flex, Image, PinInput, Stack, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// style import
import useStyles from './ChangePhoneNumberOTPModal.styles';
// internals components
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseModal } from '@/components/elements/BaseModal/BaseModal';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { typography } from '../../../../../themes/Mantine/typography';
// stores import
import { useStores } from '@/models';
// others import
import { useForm } from '@mantine/form';
import { Images } from '@/public';
import { SuccessfulModal } from '../SuccessfulModal/SuccessfulModal';
import { translate } from '@/i18n';
import ErrorMessage from '@/components/elements/ErrorMessage/ErrorMessage';
import I18nFlex from '@/components/elements/I18nFlex/I18nFlex';

export const ChangePhoneNumberOTPModal = (props: { opened?: any; onClose?: any; setAddressRecall: any }) => {
  const { i18nStore, userStore } = useStores();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [otpResendResponseText, setOtpResendResponseText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [ loader, setLoader ] = useState(false);

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

  const changePhoneNumberOTP = () => {
    setLoader(true)
    let results = otpVerify.validate();
    if (results.hasErrors) return;
    if (!otpVerify.isValid()) return setLoader(false);
    else {
      userStore.changePhoneNumberVerify(otpVerify.values.otp).then((res)=>{
        if(res.ok){
          setLoader(false)
          props.onClose();
          otpVerify.reset();
          open();
          props.setAddressRecall(true)
        }
        else if(res.code == 400){
          if(res.error){
            otpVerify.reset();
            setLoader(false)
            setErrorMessage(res.error.toString());
            setTimeout(()=>{
              setErrorMessage("");
            },3000)
          }
        }
      })
    }
  };

  const handleResendOtp = () =>{
    userStore.phoneChangeResend().then((res)=>{
      if(res.ok) {
        otpVerify.reset();
        setOtpResendResponseText(res.message);
        setTimeout(() => {
          setOtpResendResponseText('');
        }, 5000);
      }
    })
  }

  return (
    <>
      <BaseModal
        size={'sm'}
        padding={'30px'}
        radius={'xl'}
        opened={props.opened}
        onClose={() => {
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
              txtkey="profile.modal.verifyNumber"
              style={typography.headings[i18nStore.getCurrentLanguage()].h6}
              color={theme.colors.dark[8]}
            />

            <Image
              onClick={() => {
                props.onClose();
              }}
              src={Images.close_modal_icon}
              className='cursor'
              alt="close_modal_icon"
              width={'14px'}
              height={'14px'}
            />
          </I18nFlex>
          <Center>
            <BaseText
              txtkey="profile.modal.verifyNumberOtpPara"
              my={'36px'}
              color={theme.colors.gray[6]}
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
            />
          </Center>
          <Stack>
            <PinInput
              dir={i18nStore.isRTL ? 'rtl' : 'ltr'}
              variant="filled"
              placeholder=""
              // className={classes.input}
              type={'number'}
              size={'55px'}
              spacing={'30px'}
              // value={otp}
              // onChange={setOtp}
              {...otpVerify.getInputProps('otp')}
            />
          </Stack>
          {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
          {otpResendResponseText ? (
            <ErrorMessage text_color={theme.colors.blue[4]} message={otpResendResponseText} />
          ) : null}
          <I18nFlex w={'100%'} justify={'center'} my={'45px'}>
            <BaseText
              txtkey="profile.modal.resendCode"
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
            />
            &nbsp;
            <BaseText
              className={classes.pointer}
              onClick={handleResendOtp}
              txtkey="profile.modal.resendText"
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
              color={theme.colors.blue[4]}
            />
          </I18nFlex>
          <BaseButton
             
            loading={loader}
            style_variant={!otpVerify.isValid() ? 'disabled' : 'filled'}
            color_variant={!otpVerify.isValid() ? 'gray' : 'blue'}
            onClick={changePhoneNumberOTP}
          >
            <BaseText txtkey="global.button.verify" />
          </BaseButton>
        </Flex>
      </BaseModal>
      <SuccessfulModal
        opened={opened}
        onClose={close}
        para="profile.modal.afterPhoneNumberVerifypara"
      />
    </>
  );
};
