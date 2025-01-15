// react and nextb import
import React, { useState } from 'react';
// mantine component
import { useForm } from '@mantine/form';
import { Image, Stack, useMantineTheme } from '@mantine/core';
//  styles component
import { createStyle } from './ChangePasswordModal.styles';
// internals components
import { BasePasswordInput } from '@/components/elements/PasswordInput/PasswordInput';
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseModal } from '@/components/elements/BaseModal/BaseModal';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { typography } from '../../../../../themes/Mantine/typography';
// stores import
import { useStores } from '@/models';
// others import
import { Images } from '@/public';
import { translate } from '@/i18n';
import { useDisclosure } from '@mantine/hooks';
import { SuccessfulModal } from '../SuccessfulModal/SuccessfulModal';
 
import ErrorMessage from '@/components/elements/ErrorMessage/ErrorMessage';
import I18nFlex from '@/components/elements/I18nFlex/I18nFlex';

export const ChangePassword = (props: { opened?: any; onClose?: any; setAddressRecall: any }) => {
  const { i18nStore, userStore } = useStores();
  const useStyles = createStyle();
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const checkPasswordLength = (value: string) =>{
    if(value.length < 7) {
      return translate('profile.modal.passwordLength')
    }
  }

  const changePasswordForm = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validate: {
      currentPassword: (value) => checkPasswordLength(value),
      newPassword: (value) => checkPasswordLength(value),
      confirmNewPassword: (value) => checkPasswordLength(value)
    },
  });

  const passwordsMatching = () =>
    changePasswordForm.values.newPassword != changePasswordForm.values.confirmNewPassword;

  const handlePasswordChange = () => {
    let results = changePasswordForm.validate();
    if (results.hasErrors) return;
    if (!changePasswordForm.isValid()) return;
    if (passwordsMatching()) return;
    else {
      setLoader(true);
      userStore
        .changePassword(
          changePasswordForm.values.currentPassword,
          changePasswordForm.values.newPassword,
          changePasswordForm.values.confirmNewPassword
        )
        .then((res) => {
          if (res.ok) {
            props.onClose();
            changePasswordForm.reset();
            open();
            props.setAddressRecall(false)
            setLoader(false);
          } else if (res.code == 400) {
            if (res.error) {
              setLoader(false);
              changePasswordForm.reset();
              setErrorMessage(res.error.toString());
              setTimeout(() => {
                setErrorMessage('');
              }, 3000);
            }
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
          changePasswordForm.reset();
          props.setAddressRecall(false)
        }}
        withCloseButton={false}
      >
        <I18nFlex
          justify={'space-between'}
          align={'center'}
        >
          <BaseText
            txtkey="profile.modal.changePasswordHeading"
            style={typography.headings[i18nStore.getCurrentLanguage()].h6}
            color={theme.colors.dark[8]}
          />

          <Image
            onClick={() => {
              props.onClose();
              changePasswordForm.reset();
              props.setAddressRecall(false)
            }}
            className='cursor'
            src={Images.close_modal_icon}
            alt="close_modal_icon"
            width={'14px'}
            height={'14px'}
          />
        </I18nFlex>
        <form onSubmit={changePasswordForm.onSubmit((values) => console.log(values))}>
          <Stack mt={'34px'}>
            <BaseText
              className={classes.align}
              txtkey="profile.modal.currentPassword"
              color={theme.colors.gray[6]}
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
            />
            <BasePasswordInput
              placeholder={`${translate('profile.modal.currentPassword')}`}
              {...changePasswordForm.getInputProps('currentPassword')}
              autoComplete="on"
            />
          </Stack>
          <Stack my={'24px'}>
            <BaseText
              className={classes.align}
              txtkey="profile.modal.newPassword"
              color={theme.colors.gray[6]}
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
            />
            <BasePasswordInput
              placeholder={`${translate('profile.modal.newPassword')}`}
              {...changePasswordForm.getInputProps('newPassword')}
              autoComplete="on"
            />
          </Stack>
          <Stack>
            <BaseText
              className={classes.align}
              txtkey="profile.modal.confirmPassword"
              color={theme.colors.gray[6]}
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
            />
            <BasePasswordInput
              placeholder={`${translate('profile.modal.confirmPassword')}`}
              {...changePasswordForm.getInputProps('confirmNewPassword')}
              autoComplete="on"
            />
          </Stack>
        </form>
        {passwordsMatching() ? (
          <BaseText txtkey="profile.error.passwordMatchError" color={theme.colors.red[5]} />
        ) : null}
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
        <BaseButton
          mt={'30px'}
           
          loading={loader}
          style_variant={!changePasswordForm.isValid() || passwordsMatching() ? 'disabled' : 'filled'}
          color_variant={!changePasswordForm.isValid() || passwordsMatching() ? 'gray' : 'blue'}
          onClick={handlePasswordChange}
        >
          <BaseText txtkey="global.button.save" />
        </BaseButton>
      </BaseModal>
      <SuccessfulModal opened={opened} onClose={close} para="profile.modal.passwordSuccessful" />
    </>
  );
};