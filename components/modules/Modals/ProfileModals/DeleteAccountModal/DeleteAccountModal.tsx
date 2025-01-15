// react and nextb import
import React from 'react';
import { useRouter } from 'next/router';
// mantine component
import { Flex, useMantineTheme } from '@mantine/core';
// internals components
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseModal } from '@/components/elements/BaseModal/BaseModal';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { typography } from '../../../../../themes/Mantine/typography';
// stores import
import { useStores } from '@/models';
import I18nFlex from '@/components/elements/I18nFlex/I18nFlex';

export const DeleteAccountModal = (props: { opened?: any; onClose?: any; id?: string }) => {
  const { i18nStore, userStore } = useStores();
  const theme = useMantineTheme();
  const router = useRouter();

  const deleteUser = () =>{
    userStore.deleteUser().then((res)=>{
        if(res.ok){
            router.push("/");
        }
    })
  }

  return (
      <BaseModal
        size={'sm'}
        padding={'30px'}
        radius={'xl'}
        opened={props.opened}
        onClose={() => {
          props.onClose();
        }}
        // dir={i18nStore.isRTL?"rtl":"ltr"}
        withCloseButton={false}
      >
            <BaseText
                txtkey="profile.deleteModal.heading"
                ta={"center"}
                style={typography.label[i18nStore.getCurrentLanguage()].l4}
                color={theme.colors.dark[8]}
            />
            <BaseText
                mt={"10px"}
                txtkey="profile.deleteModal.para"
                ta={"center"}
                style={typography.paragraph[i18nStore.getCurrentLanguage()].p4}
                color={theme.colors.gray[7]}
            />
            <I18nFlex justify={'space-between'} align={'center'} mt={"40px"} >
                <BaseButton
                    w={'48%'}
                    style_variant={ 'filled' }
                    color_variant={'red' }
                    onClick={deleteUser}
                >
                    <BaseText txtkey="global.button.yes" />
                </BaseButton>
                <BaseButton
                    w={'48%'}
                    style_variant={ 'filled'}
                    color_variant={ 'blue'}
                    onClick={props.onClose}
                >
                    <BaseText txtkey="global.button.no" 
                        color={theme.colors.blue[5]}
                    />
                </BaseButton>
            </I18nFlex>
      </BaseModal>
  );
};
