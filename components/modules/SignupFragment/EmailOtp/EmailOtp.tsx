import React, { useState } from 'react';
import { Box, Center, Flex } from '@mantine/core';
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { typography } from '@/themes/Mantine/typography';
import { useMantineTheme } from '@mantine/core';
import { useStores } from '@/models';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PinInput } from '@mantine/core';
import { translate } from '../../../../i18n';
import swal from 'sweetalert';
import { useRouter } from 'next/router';

const OTPSchema = yup.object({
  emailOtp: yup.string().length(4, ''),
});
export const EmailOtp = (props: { incrementTimelineStep: Function }) => {
  const { i18nStore, userStore } = useStores();
  const theme = useMantineTheme();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<any>('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailOtp: '',
    },
    resolver: yupResolver(OTPSchema),
  });

  const handleEmailOtp = () => {
    setLoader(true);

    userStore. verifyEmail(`${getValues('emailOtp')}`).then((res) => {
      if (res.ok) {
        reset();
        setLoader(false);
        props.incrementTimelineStep();
        router.replace('/login');
      
      } else if (res.code == 404) {
        if (res.error) {
          setLoader(false);
          setError(translate('profile.error.invalidOtp'));
          setTimeout(() => {
            setError('');
          }, 5000);
        }
      }
    });

  };

  const handleResendVerificationEmail = () => {
    setLoader(true);

    userStore.resendVerificationEmail().then((res) => {
      if (res.ok) {
        setLoader(false);
        swal(
          `${translate('profile.modal.resendText')}`,
          `${translate('authentication.formText.successfully')}`,
          'success'
        );
      }
    });
  };

  return (
    <Flex gap={26} direction={'column'}>
      <form onSubmit={handleSubmit(handleEmailOtp)}>
      <Flex justify={'center'} align={'center'} direction={'column'} gap={30}>
        <Center>
          <BaseText
            style={typography.headings[i18nStore.getCurrentLanguage()].h2}
            color={theme.colors.dark[8]}
            txtkey={'profile.modal.verifyOtp'}
          />
        </Center>
        <Flex justify={'center'} align={'center'} direction={'column'} gap={39}>
          <Flex w={'70%'} justify={'center'} direction={'column'}>
            <BaseText
              ta={'center'}
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
              color={theme.colors.gray[6]}
              txtkey={'profile.modal.emailOtpPara'}
            />
          </Flex>
          {/* Otp Enter */}
          <PinInput
            {...register('emailOtp')}
            onChange={(event: any) => {
              clearErrors();
              setValue('emailOtp', event);
            }}
            error={error}
            radius={'5px'}
            spacing={'28px'}
            size={'xl'}
            placeholder=""
            variant="filled"
            type="number"
          />
          {/* Error Message */}

          <Center>
            {error ? (
              <BaseText
                style={typography.label[i18nStore.getCurrentLanguage()].l1}
                color={theme.colors.red[7]}
                txtkey={'profile.error.invalidOtp'}
              />
            ) : (
              <></>
            )}
          </Center>
        </Flex>
        {/* Resend Verification Link */}
        <Flex justify="center" align="center" gap={5}>
          <BaseText
            style={typography.label[i18nStore.getCurrentLanguage()].l1}
            color={theme.colors.gray[6]}
            txtkey={'profile.modal.resendCode'}
          />
          <Box style={{ cursor: 'pointer' }} onClick={() => handleResendVerificationEmail()}>
            <BaseText
              style={typography.headings[i18nStore.getCurrentLanguage()].h7}
              color={theme.colors.blue[4]}
              txtkey={'profile.modal.resendText'}
            />
          </Box>
        </Flex>
        {/* Otp Submit Button */}
        <BaseButton
          type="submit"
          w={'80%'}
          h={'39px'}
          style_variant={'filled'}
          color_variant={'lime'}
          loading={loader}
          
        >
          <BaseText
            style={typography.buttonText[i18nStore.getCurrentLanguage()].b2}
            color="white"
            txtkey={'global.button.continue'}
          />
        </BaseButton>
      </Flex>
      </form>
    </Flex>
  );
};
