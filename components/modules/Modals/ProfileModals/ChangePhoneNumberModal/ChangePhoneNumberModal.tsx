// react and nextb import
import React, { useState } from 'react';
// mantine component
import { Center, Flex, Image, Select, Stack, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
//styles component
import { createStyle } from './ChangePhoneNumberModal.styles';
// internals components
import { ChangePhoneNumberOTPModal } from '../ChangePhoneNumberOTPModal/ChangePhoneNumberOTPModal';
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseModal } from '@/components/elements/BaseModal/BaseModal';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { Input } from '@/components/elements/Input/Input';
import { typography } from '../../../../../themes/Mantine/typography';
// stores import
import { useStores } from '@/models';
// others import
import { Images } from '@/public';
import { translate } from '@/i18n';
// external
import { Country } from 'country-state-city';
 
import ErrorMessage from '@/components/elements/ErrorMessage/ErrorMessage';
import I18nFlex from '@/components/elements/I18nFlex/I18nFlex';

export const ChangePhoneNumberModal = (props: { opened?: any; onClose?: any; setAddressRecall: any }) => {
  const { i18nStore, userStore } = useStores();
  const useStyles = createStyle();
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [errorMessage, setErrorMessage] = useState('');
  const [ loader, setLoader ] = useState(false);

  const changePhoneNumber = useForm({
    initialValues: {
      phone: '',
      country_code: '+966',
    },
    validate: {
      phone: (value) => {
        if (value.toString().length == 0) return translate('profile.modal.phoneNumberLengthError');
      },
      country_code: (value) => {
        if (!value) return 'Invalid Country Code';
      },
    },
  });

  let countryLists: any = [];

  {
    Country.getAllCountries().map((key) => {
      countryLists.push({
        label: '+' + key.phonecode + ' ' + key.name,
        value: '+' + key.phonecode,
      });
    });
  }

  const handlePhoneNumberChange = () => {
    setLoader(true)
    let results = changePhoneNumber.validate();
    if (results.hasErrors) return;
    if (!changePhoneNumber.isValid()) return setLoader(false);
    else {
      userStore
        .changePhoneNumber(changePhoneNumber.values.country_code + changePhoneNumber.values.phone)
        .then((res) => {
          if (res.ok) {
            setLoader(false)
            props.onClose();
            changePhoneNumber.reset();
            open();
          } else if (res.code == 400) {
            if (res.error) {
              changePhoneNumber.reset();
              setLoader(false)
              setErrorMessage(res.error.toString());
              setTimeout(()=>{
                setErrorMessage("");
              },3000)
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
          changePhoneNumber.reset();
        }}
        withCloseButton={false}
      >
        <form onSubmit={changePhoneNumber.onSubmit((values) => console.log(values))}>
          <I18nFlex
            justify={'space-between'}
            align={'center'}
          >
            <BaseText
              txtkey="profile.modal.changePhoneNumber"
              style={typography.headings[i18nStore.getCurrentLanguage()].h6}
              color={theme.colors.dark[8]}
            />

            <Image
              onClick={() => {
                props.onClose();
                changePhoneNumber.reset();
              }}
              className='cursor'
              src={Images.close_modal_icon}
              alt="close_modal_icon"
              width={'14px'}
              height={'14px'}
            />
          </I18nFlex>

          <BaseText
            ta={i18nStore.isRTL ? 'right' : 'left'}
            my={'38px'}
            txtkey="profile.modal.paraPhoneNumber"
            style={typography.paragraph[i18nStore.getCurrentLanguage()]['p1.5']}
            color={theme.colors.gray[6]}
          />
          <Stack>
            <BaseText
              className={classes.align}
              txtkey="profile.modal.countryCode"
              color={theme.colors.gray[6]}
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
            />
            <Select
              searchable
              hoverOnSearchChange={false}
              placeholder="+966"
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
              classNames={{ rightSection: classes.rightSection, input: classes.input }}
              w={'100%'}
              variant="filled"
              radius={'xl'}
              // size="lg"
              data={countryLists}
              {...changePhoneNumber.getInputProps('country_code')}
            />
          </Stack>
          <Stack mt={'lg'}>
            <BaseText
              className={classes.align}
              txtkey="profile.phoneNumber"
              color={theme.colors.gray[6]}
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
            />
            <Input
              style_variant={'inputText2'}
              type="number"
              inputMode="numeric"
              variant="filled"
              component={'input'}
              classNames={{
                input: classes.input,
              }}
              placeholder={`${translate('profile.phoneNumber')}`}
              {...changePhoneNumber.getInputProps('phone')}
            />
          </Stack>
          {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
          <BaseButton
            mt={'80px'}
             
            loading={loader}
            style_variant={changePhoneNumber.isValid() ? 'filled' : 'disabled'}
            color_variant={changePhoneNumber.isValid() ? 'blue' : 'gray'}
            onClick={handlePhoneNumberChange}
          >
            <BaseText txtkey="global.button.continue" />
          </BaseButton>
        </form>
      </BaseModal>
      <ChangePhoneNumberOTPModal setAddressRecall={props.setAddressRecall} opened={opened} onClose={close} />
    </>
  );
};