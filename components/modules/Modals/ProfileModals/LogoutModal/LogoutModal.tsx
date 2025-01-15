// react and nextb import
import React,{ useState } from 'react';
// mantine component
import { Flex, useMantineTheme } from '@mantine/core';
// internals components
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseModal } from '@/components/elements/BaseModal/BaseModal';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { typography } from '../../../../../themes/Mantine/typography';
// stores import
import { useStores } from '@/models';
import { useRouter } from 'next/router';
import I18nFlex from '@/components/elements/I18nFlex/I18nFlex';

export const LogOutModal = (props: { opened?: any; onClose?: any; id?: string }) => {
    const router = useRouter()
    const {  userStore, i18nStore } = useStores();
    const theme = useMantineTheme();

    const [ loader, setLoader ] = useState(false)
    
    const handleLogOut = () =>{
        setLoader(true)
        userStore.logoutUser().then((res)=>{
            if(res.ok){
                setLoader(false)
                props.onClose();
                router.push("/login");
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
            withCloseButton={false}
        >
                <BaseText
                    txtkey="profile.logOutModal.heading"
                    ta={"center"}
                    // style={typography.label[i18nStore.getCurrentLanguage()].l4}
                    color={theme.colors.dark[8]}
                    fw={600}
                />
                <BaseText
                    mt={"10px"}
                    txtkey="profile.logOutModal.para"
                    ta={"center"}
                    // style={typography.paragraph[i18nStore.getCurrentLanguage()].p4}
                    fw={400}
                    color={theme.colors.gray[7]}
                />
                <I18nFlex justify={'space-between'} align={'center'} mt={"40px"} >
                    <BaseButton
                        w={'48%'}
                        loading={loader}
                        style_variant={ 'filled' }
                        color_variant={'red' }
                        onClick={handleLogOut}
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
