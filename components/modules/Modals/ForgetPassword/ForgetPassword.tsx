/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Center, CloseButton, Flex, Image, useMantineTheme, Select } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { Country } from 'country-state-city';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import swal from 'sweetalert';
import { BaseModal } from '@/components/elements/BaseModal/BaseModal';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { typography } from '@/themes/Mantine/typography';
import { Input } from '@/components/elements/Input/Input';
import { useStores } from '@/models';
import { Images } from '../../../../public/index';

import { translate } from '@/i18n';
import { createStyle } from './ForgetPassword.style';

interface forgotPasswordProps {
  opened: boolean;
  close: any;
}

const resetPasswordByPhoneNumberSchema = yup.object({
  number: yup.string().required(`${translate('authentication.formText.invalidNumber')}`),
  countriesCode: yup.string().required(`${translate('authentication.required')}`),
});

const resetPasswordByEmailSchema = yup.object({
  email: yup
    .string()
    .email(`${translate('authentication.invalidEmail')}`)
    .required(`${translate('authentication.required')}`),
});

export const ForgotPassword = (props: forgotPasswordProps) => {
  const isPhone = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');
  const useStyles = createStyle();
  const { classes } = useStyles();
  const { i18nStore, userStore } = useStores();
  const passwordForgotMethods = {
    Email: 'Email',
    Phone: 'Phone',
  };
  const [selectedPasswordForgotType, setSelectedPasswordForgotType] = useState<string>();
  const theme = useMantineTheme();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [showPhoneNumberField, setShowPhoneNumberField] = useState(false);
  const userChoiceHandler = (type: string) => {
    setSelectedPasswordForgotType('');
    if (type === passwordForgotMethods.Email) {
      setSelectedPasswordForgotType(passwordForgotMethods.Email);
    }
    if (type === passwordForgotMethods.Phone) {
      setSelectedPasswordForgotType(passwordForgotMethods.Phone);
    }
  };

  // countriesCode
  const countriesCode: any = [];
  Country.getAllCountries().map((key) => {
    countriesCode.push({
      label: `+${key.phonecode} ${key.name}`,
      value: `+${key.phonecode}`,
    });
    return countriesCode.sort((a: any, b: any) => {
      if (a.label[0] < b.label[0]) return -1;
      if (a.label[0] > b.label[0]) return 1;
      return 0;
    });
  });

  // close Modal function
  const closeModal = () => {
    props.close();
    setSelectedPasswordForgotType('');
    setShowEmailField(false);
    setShowPhoneNumberField(false);
    resetPasswordByPhone.reset();
    resetPasswordByEmail.reset();
  };

  const selectPasswordForgotService = () => {
    selectedPasswordForgotType === passwordForgotMethods.Email ? setShowEmailField(true) : null;
    selectedPasswordForgotType === passwordForgotMethods.Phone
      ? setShowPhoneNumberField(true)
      : null;
  };

  const resetPasswordByEmail = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(resetPasswordByEmailSchema),
  });

  // ResetPassword By Email Api call
  const handleResetPasswordByEmail = () => {
    setLoader(true);

    if (resetPasswordByEmail.formState.isValid) {
      userStore.resetPassword(resetPasswordByEmail.getValues('email')).then((res) => {
        if (res.ok) {
          console.log('email link send successfully!');
          setLoader(false);
          closeModal();
          swal(
            `${translate('authentication.formText.forgotPasswordLink')}`,
            `${translate('authentication.formText.successfully')}`,
            'success'
          );
        } else if (res.code === 400) {
          if (res.error) {
            setLoader(false);
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 5000);
          }
        } else if (res.code === 401) {
          if (res.error) {
            setLoader(false);
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 5000);
          }
        } else {
          setLoader(false);
          resetPasswordByEmail.reset();
        }
      });
    }
  };

  // ResetPassword By Phone Number Api call
  const resetPasswordByPhone = useForm({
    defaultValues: {
      number: '',
      countriesCode: '',
    },
    resolver: yupResolver(resetPasswordByPhoneNumberSchema),
  });

  // smsPasswordReset By Phone Number Api
  const handleResetPasswordByPhone = () => {
    setLoader(true);

    if (resetPasswordByPhone.formState.isValid) {
      userStore
        .smsPasswordReset(
          `${resetPasswordByPhone.getValues('countriesCode')}${resetPasswordByPhone.getValues(
            'number'
          )}`
        )
        .then((res) => {
          if (res.ok) {
            console.log('phone link send successfully!');
            setLoader(false);
            closeModal();
            swal(
              `${translate('authentication.formText.forgotPasswordLink')}`,
              `${translate('authentication.formText.successfully')}`,
              'success'
            );
          } else if (res.code === 400) {
            if (res.error) {
              setLoader(false);
              setError(true);
              setTimeout(() => {
                setError(false);
              }, 5000);
            }
          } else if (res.code === 401) {
            if (res.error) {
              setLoader(false);
              setError(true);
              setTimeout(() => {
                setError(false);
              }, 5000);
            }
          } else {
            setLoader(false);
            resetPasswordByPhone.reset();
          }
        });
    }
  };

  const CancelAndConfirmButton = (props: any) => (
    <Flex
      wrap="wrap-reverse"
      gap={10}
      w="100%"
      align="center"
      justify="space-between"
      direction={i18nStore.isRTL ? 'row-reverse' : 'row'}
    >
      <BaseButton
        onClick={() => {
          closeModal();
        }}
        style_variant="filled"
        color_variant="red"
        w={isPhone ? '100%' : '47%'}
        h="45px"
      >
        <BaseText txtkey="global.button.cancel" color='white'/>
      </BaseButton>
      <BaseButton
        style_variant="filled"
        w={isPhone ? '100%' : '47%'}
        h="45px"
        type="submit"
        loading={loader}
        {...props}
      >
        <BaseText txtkey="global.button.confirm" />
      </BaseButton>
    </Flex>
  );

  return (
    <>
      <BaseModal
        radius={32}
        size={isPhone ? '100%' : isTablet ? '70%' : '40%'}
        withCloseButton={false}
        opened={props.opened}
        onClose={props.close}
      >
        <Flex direction="column" gap={20} style={{ padding: '25px' }}>
          <Flex direction="column" gap={8}>
            <Flex direction={i18nStore.isRTL ? 'row-reverse' : 'row'} justify="space-between">
              <BaseText
                style={typography.headings[i18nStore.getCurrentLanguage()].h3}
                color={theme.colors.dark[7]}
                txtkey="signUpForm.forgetPassword"
              />
              <CloseButton
                onClick={() => {
                  closeModal();
                }}
                aria-label="Close modal"
                iconSize={20}
              />
            </Flex>
            <BaseText
              ta={i18nStore.isRTL ? 'right' : 'left'}
              style={typography.paragraph[i18nStore.getCurrentLanguage()].p2}
              txtkey="authentication.formText.forgotPasswordText"
              fw={700}
            />
          </Flex>

          {!showEmailField && !showPhoneNumberField ? (
            <Flex direction="column" gap={30}>
              <Flex
                wrap="wrap"
                gap="10px"
                px="10px"
                w="100%"
                align="center"
                justify="space-around"
                direction={i18nStore.isRTL ? 'row' : 'row-reverse'}
              >
                {/* Email Icon */}
                <Flex
                  onClick={() => {
                    userChoiceHandler(passwordForgotMethods.Email);
                  }}
                  className={classes.iconBox}
                  w="100px"
                  h="100px"
                  style={{
                    background: `${
                      selectedPasswordForgotType === passwordForgotMethods.Email
                        ? theme.colors.blue[4]
                        : theme.colors.gray[4]
                    }`,
                  }}
                >
                  <Image
                    width={50}
                    alt="email_icon"
                    style={{ margin: 'auto' }}
                    src={Images.email_icon}
                  />
                </Flex>
                {/* Phone Icon */}
                {/* <Flex
                  onClick={() => {
                    userChoiceHandler(passwordForgotMethods.Phone);
                  }}
                  w="100px"
                  h="100px"
                  className={classes.iconBox}
                  style={{
                    background: `${
                      selectedPasswordForgotType === passwordForgotMethods.Phone
                        ? theme.colors.blue[4]
                        : theme.colors.gray[4]
                    }`,
                  }}
                >
                  <Image
                    width={50}
                    alt="phone_icon"
                    style={{ margin: 'auto' }}
                    src={Images.phone_icon}
                  />
                </Flex> */}
              </Flex>
              <CancelAndConfirmButton
                color_variant={selectedPasswordForgotType ? 'lime' : 'blue'}
                onClick={() => {
                  selectPasswordForgotService();
                }}
              />
            </Flex>
          ) : null}

          {/* Reset Password By Email */}
          {showEmailField ? (
            <form onSubmit={resetPasswordByEmail.handleSubmit(handleResetPasswordByEmail)}>
              <Flex direction="column" gap={30}>
                <Flex direction="column" gap={10} w="100%">
                  <BaseText
                    style={typography.label[i18nStore.getCurrentLanguage()].l1}
                    color={theme.colors.gray[6]}
                    txtkey="profile.email"
                    ta={i18nStore.isRTL ? 'right' : 'left'}
                  />
                  <Input
                    component="input"
                    type="text"
                    placeholder={`${translate('authentication.formText.writeEmail')}`}
                    style_variant="inputText1"
                    classNames={{ input: classes.input }}
                    inputvalue={resetPasswordByEmail.register('email')}
                    error={resetPasswordByEmail.formState.errors.email?.message}
                  />
                  {/* error message */}
                  <Center>
                    {error ? (
                      <BaseText
                        style={typography.label[i18nStore.getCurrentLanguage()].l1}
                        color={theme.colors.red[7]}
                        txtkey="authentication.invalidEmail"
                      />
                    ) : null}
                  </Center>
                </Flex>
                <CancelAndConfirmButton
                  
                  color_variant={resetPasswordByEmail.formState.isValid ? 'lime' : 'blue'}
                  onClick={() => {
                    if (resetPasswordByEmail.formState.isValid) {
                      handleResetPasswordByEmail();
                    } else {
                      console.log('email or password is empty');
                    }
                  }}
                />
              </Flex>
            </form>
          ) : null}

          {/* Reset Password By Phone */}
          {showPhoneNumberField ? (
            <form onSubmit={resetPasswordByPhone.handleSubmit(handleResetPasswordByPhone)}>
              <Flex direction="column" gap={30}>
                <Flex direction="column" gap={10} w="100%">
                  <BaseText
                    style={typography.label[i18nStore.getCurrentLanguage()].l1}
                    color={theme.colors.gray[6]}
                    txtkey="profile.phoneNumber"
                    ta={i18nStore.isRTL ? 'right' : 'left'}
                  />
                  <Select
                    searchable
                    placeholder="+914"
                    rightSection={<IconChevronDown size="1rem" />}
                    rightSectionWidth={30}
                    radius="xl"
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    classNames={{
                      rightSection: classes.rightSection,
                      input: classes.input,
                    }}
                    data={countriesCode}
                    {...resetPasswordByPhone.register('countriesCode')}
                    onChange={(event: any) => {
                      resetPasswordByPhone.clearErrors();
                      resetPasswordByPhone.setValue('countriesCode', event);
                    }}
                    error={resetPasswordByPhone.formState.errors.countriesCode?.message}
                  />
                  <Input
                    component="input"
                    type="number"
                    placeholder={`${translate('profile.phoneNumber')}`}
                    style_variant="inputText1"
                    classNames={{ input: classes.input }}
                    inputvalue={resetPasswordByPhone.register('number')}
                    error={resetPasswordByPhone.formState.errors.number?.message}
                  />
                  {/* error message */}
                  <Center>
                    {error ? (
                      <BaseText
                        style={typography.label[i18nStore.getCurrentLanguage()].l1}
                        color={theme.colors.red[7]}
                        txtkey="authentication.invalidNumber"
                      />
                    ) : null}
                  </Center>
                </Flex>
                <CancelAndConfirmButton
                  color_variant={resetPasswordByPhone.formState.isValid ? 'lime' : 'red'}
                  onClick={() => {
                    if (resetPasswordByPhone.formState.isValid) {
                      handleResetPasswordByPhone();
                    } else {
                      console.log('email or password is empty');
                    }
                  }}
                />
              </Flex>
            </form>
          ) : null}
        </Flex>
      </BaseModal>
    </>
  );
};
