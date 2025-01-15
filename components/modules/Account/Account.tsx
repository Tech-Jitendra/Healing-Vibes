//React and next imports
import React, { useState, useEffect } from 'react';
// mantine component imports
import { Box, Center, FileButton, Flex, Grid, Image, Loader, TextInput, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// styles import
import { createStyle } from './Account.styles';
// component
import { ChangePassword } from '../Modals/ProfileModals/ChangePasswordModal/ChangePasswordModal';
import { EmailChangeModal } from '../Modals/ProfileModals/EmailChangeModal/EmailChangeModal';
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { typography } from '@/themes/Mantine/typography';
import { Input } from '@/components/elements/Input/Input';
//store import
import { useStores } from '@/models';
// other import
import { translate } from '@/i18n';
import { ChangePhoneNumberModal } from '../Modals/ProfileModals/ChangePhoneNumberModal/ChangePhoneNumberModal';
import ErrorMessage from '@/components/elements/ErrorMessage/ErrorMessage';
import { useForm } from '@mantine/form';
// import { useForm } from "react-hook-form";

export const Account = () => {
  const { i18nStore, userStore } = useStores();
  const useStyles = createStyle();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const emailChangeModal = useDisclosure(false);
  const phoneNumberChangeModal = useDisclosure(false);
  const [imageUploadMessage, setImageUploadMessage] = useState<any>('');
  const [images, setImages] = useState<any>(null);
  const [ loader, setLoader ] = useState(true);
  const [ addressRecall, setAddressRecall ] = useState(true);
  
  const onImageChange = (event: File) => {
    console.log("e name debug--", event?.name);
    if (event?.name) {
      setImages(URL.createObjectURL(event));
      const data = new FormData();
      data.append('avatar', event);
      userStore.editUser(data).then((res) => {
        if (res.ok) {
          setImageUploadMessage(translate('profile.addedAvatar'));
          setTimeout(() => {
            setImageUploadMessage("");
          },5000)
        }
      });
    }
  };
  const onImageRemove = () => {
    // if (event?.name) {
      // setImages(URL.createObjectURL(event));
      console.log("remove avatar")
      const data = new FormData();
      data.append('avatar', "");
      userStore.editUser(data).then((res) => {
        if (res.ok) {
          setImages(null);
          setImageUploadMessage(translate('profile.removeAvatar'));
          setAddressRecall(true)
          setTimeout(() => {
            setImageUploadMessage("");
          },5000)
        }
      });
    // }
  };
  const account = useForm({
    initialValues: {
      avatar: "",
      name: "",
      email: "",
      phoneNumber: userStore.userData?.phone,
      password: 'JhonDeo@123',
    },
  });

  useEffect(() => {
    userStore.getLoginUserData().then((res) => {
      if (res.ok) {
        if (userStore.userData != null ) {
          setLoader(false)
          account.setValues({
            avatar: userStore.userData.avatar,
            name: userStore.userData.full_name,
            email: userStore.userData.email,
            phoneNumber: userStore.userData.phone,
          });
        }
        setAddressRecall(false)
      }
    });
  }, [addressRecall]);

  return (
    <>
    {loader?
      <Center h={"100vh"} >
      <Loader size="xl" />
    </Center>:
  
    <Box className={classes.container}>
      <form onSubmit={account.onSubmit((values: any) => console.log(values))}>
        <Flex align={'center'} justify={'space-between'} wrap={'wrap'}>
          <div className={classes.imageFlex}>
            <Image
              width={'120px'}
              height={'120px'}
              radius={'50%'}
              alt="profile_image"
              {...account.getInputProps('avatar')}
              // src={ images ? images : userStore?.userData?.avatar ?userStore?.userData?.avatar: Images.default_profile_avatar }
              src={ images ? images : userStore?.userData?.avatar }
            />
          </div>
          <Flex gap={'18px'} className={classes.imageFlex}>
            <FileButton onChange={onImageChange} accept="image/*">
              {(props) => (
                <BaseButton
                  w={'125px'}
                  style_variant={'filled'}
                  color_variant={'lime'}
                  {...props}
                >
                  <BaseText txtkey="profile.buttonChange" />
                </BaseButton>
              )}
            </FileButton>
            <BaseButton
              w={'125px'}
              style_variant={'filled'}
              color_variant={'red'}
              onClick={() => {
                onImageRemove()
              }}
            >
              <BaseText txtkey="profile.buttonRemove" />
            </BaseButton>
          </Flex>
        </Flex>
          {imageUploadMessage?
          <ErrorMessage
          message={imageUploadMessage}
          text_color={theme.colors.black[4]}
          
          />
        :null}

        <Grid className={classes.grid}>
          <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <BaseText
              txtkey="profile.name"
              // style={typography.label[i18nStore.getCurrentLanguage()].l1}
              
              color={theme.colors.black[4]}
            />
            <Input
              mt={'sm'}
              placeholder={`${translate('profile.name')}`}
              style_variant={'inputText2'}
              component={'input'}
              variant="filled"
              disabled
              classNames={{
                input: classes.input,
              }}
              {...account.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <BaseText
              txtkey="profile.email"
              // style={typography.label[i18nStore.getCurrentLanguage()].l1}
              color={theme.colors.black[4]}
            />
            <Input
              mt={'sm'}
              placeholder={`${translate('profile.email')}`}
              style_variant={'inputText2'}
              component={'input'}
              variant="filled"
              disabled
              classNames={{
                rightSection: classes.rightSection,
                input: classes.input,
              }}
              rightSection={
                <BaseText
                  onClick={emailChangeModal[1].open}
                  className={classes.mantineInputRightSection}
                  txtkey="profile.change"
                  color={theme.colors.blue[4]}
                  // style={typography.label[i18nStore.getCurrentLanguage()].l4}
                  fw={600}
                />
              }
              {...account.getInputProps('email')}
            />
          </Grid.Col>
        </Grid>
        <Grid className={classes.grid}>
          {/* <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <BaseText
              txtkey="profile.phoneNumber"
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
              color={theme.colors.gray[6]}
            />
            <Input
              mt={'sm'}
              placeholder={`${translate('profile.phoneNumber')}`}
              style_variant={'inputText2'}
              component={'input'}
              variant="filled"
              disabled
              classNames={{
                rightSection: classes.rightSection,
                input: classes.input,
              }}
              rightSection={
                <BaseText
                  onClick={phoneNumberChangeModal[1].open}
                  className={classes.mantineInputRightSection}
                  txtkey="profile.change"
                  color={theme.colors.blue[4]}
                  style={typography.label[i18nStore.getCurrentLanguage()].l4}
                />
              }
              {...account.getInputProps('phoneNumber')}
            />
          </Grid.Col> */}
          <Grid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <BaseText
              txtkey="profile.password"
              // style={typography.label[i18nStore.getCurrentLanguage()].l1}
              color={theme.colors.black[4]}
            />
            <TextInput
              mt={'sm'}
              placeholder={`${translate('profile.password')}`}
              variant="filled"
              type="password"
              autoComplete="on"
              radius={'xl'}
              disabled
              classNames={{
                rightSection: classes.rightSection,
                input: classes.input,
              }}
              rightSection={
                <BaseText
                  onClick={open}
                  className={classes.mantineInputRightSection}
                  txtkey="profile.change"
                  color={theme.colors.blue[4]}
                  // style={typography.label[i18nStore.getCurrentLanguage()].l4}
                  fw={600}
                  
                />
              }
              {...account.getInputProps('password')}
            />
          </Grid.Col>
        </Grid>
      </form>
      <ChangePassword setAddressRecall={setAddressRecall} opened={opened} onClose={close} />
      <EmailChangeModal setAddressRecall={setAddressRecall} opened={emailChangeModal[0]} onClose={emailChangeModal[1].close} />
      <ChangePhoneNumberModal
        setAddressRecall={setAddressRecall}
        opened={phoneNumberChangeModal[0]}
        onClose={phoneNumberChangeModal[1].close}
      />
    </Box>}
    </>
  );
};
