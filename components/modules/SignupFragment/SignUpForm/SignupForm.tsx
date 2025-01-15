import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { Input } from '@/components/elements/Input/Input';
import { BasePasswordInput } from '@/components/elements/PasswordInput/PasswordInput';
import { useStores } from '@/models';
import { typography } from '@/themes/Mantine/typography';
import { Box, Center, Flex, Image, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { Images } from '../../../../public/index';
import { createStyle } from './SignupForm.style';
// import { useForm } from "@mantine/form";
import FacebookLogin from '@greatsumini/react-facebook-login';
import { yupResolver } from '@hookform/resolvers/yup';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import swal from 'sweetalert';
import * as yup from 'yup';
import { translate } from '../../../../i18n';

import {facebookLoginAppIdNum} from "@/utils/delay";
export const SignupForm = (props: { incrementTimelineStep: Function }) => {
  const useStyles = createStyle();
  const [phoneNumber, setPhoneNumber] = useState<any>('');
  const { classes } = useStyles();
  const { i18nStore, userStore } = useStores();
  const theme = useMantineTheme();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<any>('');
  const router = useRouter();

  const schema = yup
    .object({
      full_name: yup.string().required(`${translate('authentication.required')}`),
      email: yup
        .string()
        .email(`${translate('authentication.invalidEmail')}`)
        .required(`${translate('authentication.required')}`),
      password1: yup
        .string()
        .required(`${translate('authentication.required')}`)
        .matches(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, {
          message: translate('authentication.invalidPassword'),
        }),
      password2: yup
        .string()
        .oneOf([yup.ref('password1'), ''], 'Passwords must match')
        .required(`${translate('authentication.required')}`),
      // phone_number: yup
      //   .string()
      //   .required(`${translate('authentication.required')}`)
      //   .matches(/^\+[0-9]{1,3}[0-9]{9,}$/, { message: translate('authentication.invalidPhoneNumber') }),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const signUpForm = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { setValue } = signUpForm;
  const onSubmit = (data: FormData) => console.log(data);

  // SignUp api
  const handleSignUp = () => {
    setLoader(true);

    if (signUpForm.formState.isValid) {
      userStore
        .signupUser(
          signUpForm.getValues('email'),
          signUpForm.getValues('full_name'),
          signUpForm.getValues('password1'),
          signUpForm.getValues('password2'),
          // signUpForm.getValues('phone_number')
        )
        .then((res) => {
          if (res.ok) {
            signUpForm.reset();
            props.incrementTimelineStep();
            setLoader(false);
            // setEmailOtp(true)
          } else if (res.code == 400) {
            if (res.error) {
              setLoader(false);
              setError(res.error?.email?.toString());
              // else if (res.error.non_field_errors)
              // setError(res.error?.non_field_errors?.toString());
              setTimeout(() => {
                setError('');
              }, 5000);
            }
          }
        });
    }
  };
  const onGoogleLogin = (google_access_token: any) => {
    setLoader(true);
    userStore.loginGoogle(google_access_token).then((res) => {
      if (res.ok) {
        console.log('user logged in successfully!');
        router.push('/home');
        setLoader(false);
      } else if (res.code == 400) {
        if (res.error) {
          swal(`${res.error.non_field_errors}`, `${translate('profile.error.error')}`, 'error');
          setLoader(false);
        }
      } else if (res.code == 401) {
        if (res.error) {
          swal(`${res.error.non_field_errors}`, `${translate('profile.error.error')}`, 'error');
          setLoader(false);
        }
      }
    });
  };

  const onFacebookLogin = (facebook_access_token: any) => {
    setLoader(true);
    userStore.loginFacebook(facebook_access_token).then((res) => {
      if (res.ok) {
        console.log('user logged in successfully!');
        router.push('/home');
        setLoader(false);
      } else if (res.code == 400) {
        if (res.error) {
          swal(`${res.error.non_field_errors}`, `${translate('profile.error.error')}`, 'error');
          setLoader(false);
        }
      } else if (res.code == 401) {
        if (res.error) {
          swal(`${res.error.non_field_errors}`, `${translate('profile.error.error')}`, 'error');
          setLoader(false);
        }
      }
    });
  };

   let facebookLoginAppId = facebookLoginAppIdNum;

  return (
    <Flex gap={26} direction={'column'}>
      <form onSubmit={signUpForm.handleSubmit(onSubmit)}>
        <Flex direction={'column'} gap={20}>
          <Center>
            <BaseText
              style={typography.headings[i18nStore.getCurrentLanguage()].h2}
              color={theme.colors.dark[8]}
              txtkey={'signUpForm.signUp'}
            />
          </Center>
          {/* Social Media Login */}
          {/* <Flex justify="center" align="center" gap={32}>
            <FacebookLogin
              appId={facebookLoginAppId}
              onSuccess={(response) => {
                onFacebookLogin(response.accessToken);
              }}
              onFail={(error) => {
                swal(`${error}`, `${translate('profile.error.error')}`, 'error');
              }}
              render={({ onClick }) => (
                <Box className={classes.facebookIconBox} onClick={onClick}>
                  <Image width={20} src={Images.facebook_icon} />
                </Box>
              )}
            />
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                onGoogleLogin(credentialResponse.credential);
              }}
              type="icon"
              shape="circle"
              onError={() => {
                swal(`${error}`, `${translate('profile.error.error')}`, 'error');
              }}
            />
          </Flex> */}
          {/* FullName Input Box */}
          <Flex direction={'column'} gap={10}>
            <BaseText
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
              color={theme.colors.gray[6]}
              txtkey={'profile.name'}
            />

            <Input
              w={'100%'}
              mah={'44px'}
              radius="xl"
              component={'input'}
              classNames={{ input: classes.input }}
              placeholder={`${translate('profile.name')}`}
              style_variant={'inputText1'}
              inputvalue={signUpForm.register('full_name')}
              error={signUpForm.formState.errors.full_name?.message}
              id={'test-fullname'}
            />
          </Flex>
          {/* Email Input Box */}
          <Flex direction={'column'} gap={10}>
            <BaseText
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
              color={theme.colors.gray[6]}
              txtkey={'global.label.label2'}
            />
            <Input
              w={'100%'}
              mah={'44px'}
              radius="xl"
              component={'input'}
              classNames={{ input: classes.input }}
              placeholder={`${translate('authentication.formText.writeEmail')}`}
              style_variant={'inputText1'}
              inputvalue={signUpForm.register('email')}
              error={signUpForm.formState.errors.email?.message}
              id={'test-email'}
            />
          </Flex>
          {/* Password Input Box */}
          <Flex direction={'column'} gap={10}>
            <BaseText
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
              color={theme.colors.gray[6]}
              txtkey={'global.label.label3'}
            />
            <BasePasswordInput
              w={'100%'}
              mah={'44px'}
              placeholder={`${translate('authentication.formText.writePassword')}`}
              inputvalue={signUpForm.register('password1')}
              error={signUpForm.formState.errors.password1?.message}
              id={'test-password1'}
            />
          </Flex>
          {/* Confirm Password Input Box */}
          <Flex direction={'column'} gap={10}>
            <BaseText
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
              color={theme.colors.gray[6]}
              txtkey={'global.label.label4'}
            />
            <BasePasswordInput
              w={'100%'}
              mah={'44px'}
              placeholder={`${translate('authentication.formText.writePassword')}`}
              inputvalue={signUpForm.register('password2')}
              error={signUpForm.formState.errors.password2?.message}
              id={'test-password2'}
            />
          </Flex>
          {/* Phone number input */}
          {/* <Flex direction={'column'} gap={10}>
            <>
              <BaseText
                style={typography.label[i18nStore.getCurrentLanguage()].l1}
                color={theme.colors.gray[6]}
                txtkey={'global.label.label5'}
              />

              <Controller
                control={signUpForm.control}
                name="phone_number"
                defaultValue=''
                render={({ field }) => (
                  <PhoneInput
                    value={field.value}
                    onChange={(value) => {
                      setPhoneNumber(value);
                      field.onChange(value || ''); // Update the form value
                      console.log("value", value);
                    }}
                    placeholder={`${translate('authentication.formText.phoneNumber')}`}
                    error={signUpForm.formState.errors.phone_number?.message}
                    id={'test-phone-number'}
                    
                  />
                )}
              />
            </> */}

            {/* error message for the whole form */}
            {/* <Text
              ta={'center'}
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
              color={theme.colors.red[7]}
            >
              {error}
            </Text>
          </Flex> */}
          {/* SignUp Form Submit Button */}
          <BaseButton
            type="submit"
            onClick={() => {
              if (signUpForm.formState.isValid) handleSignUp();
              else {
                console.log('email or password is empty');
                // console.log('eerror while submitting--', signUpForm.formState.errors.phone_number);
              }
            }}
            w={'100%'}
            mah={'39px'}
            style_variant={signUpForm.formState.isValid ? 'filled' : 'disabled'}
            color_variant={signUpForm.formState.isValid ? 'lime' : 'gray'}
            loading={loader}
          >
            <BaseText
              style={typography.buttonText[i18nStore.getCurrentLanguage()].b2}
              color={signUpForm.formState.isValid ? theme.white : theme.colors.dark[1]}
              txtkey={'header.signUp'}
            />
          </BaseButton>
        </Flex>
      </form>
      {/* Already have account then login page link */}
      <Flex justify="center" align="center" gap={5}>
        <BaseText
          style={typography.label[i18nStore.getCurrentLanguage()].l1}
          color={theme.colors.gray[6]}
          txtkey={'authentication.formText.oldUser'}
        />
        <Link className={classes.link} href="/login">
          <BaseText
            style={typography.headings[i18nStore.getCurrentLanguage()].h7}
            color={theme.colors.blue[4]}
            txtkey={'signUpForm.login'}
          />
        </Link>
      </Flex>
    </Flex>
  );
};
