import React, { useState } from 'react';
import { Center, Flex , Select } from '@mantine/core';
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { typography } from '@/themes/Mantine/typography';
import { useMantineTheme } from '@mantine/core';
import { useStores } from '@/models';
import { Input } from '@/components/elements/Input/Input';
import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import { translate } from "../../../../i18n";
import { Country }  from 'country-state-city';
import { createStyle } from "./AddNumber.style"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const addPhoneNumber = yup.object({
    number: yup.string().required(`${translate('authentication.formText.invalidNumber')}`),
    countriesCode: yup.string().required(`${translate('authentication.formText.invalidNumber')}`),

})

export const AddNumber = (props: { incrementTimelineStep: Function }) => {
    const { i18nStore, userStore } = useStores();
    const useStyles = createStyle()
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState<any>("");

    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        watch,
        setValue,
        getValues,
    
        formState: { errors, isValid }
      }= useForm({
        defaultValues: {
            number: '',
            countriesCode: '',
            // termsOfService: false,
        },
        resolver:yupResolver(addPhoneNumber)

    });


    // Add number api
    const handleAddNumber = () => {
        setLoader(true)

        userStore.editUser({ phone: `${getValues("countriesCode")}${getValues("number")}` }).then((res) => {
            if (res.ok) {
                reset()
                setLoader(false)
                props.incrementTimelineStep()
            }
            else if (res.code == 400) {
                if (res.error) {
                    setLoader(false)
                    setError(translate('authentication.formText.invalidNumber'))
                    setTimeout(() => {
                        setError("")
                    }, 5000)
                }
            }
        })
    }


     // countriesCode
     let countriesCode: any = []
     {
         Country.getAllCountries().map((key) => {
           countriesCode.push({
             label: "+"+ key.phonecode+" "+key.name,
             value: "+"+ key.phonecode,
           })
           countriesCode.sort((a:any, b:any) => {
             if (a['label'][0] < b['label'][0])
               return -1
             else if (a['label'][0] > b['label'][0])
               return 1
             else return 0
           })
         });
       }

    return (
        <Flex gap={26}
            direction={'column'}
        >
            <form onSubmit={handleSubmit(handleAddNumber)}>
                <Flex direction={'column'} gap={50}>
                    <Center>
                        <BaseText
                            style={typography.headings[i18nStore.getCurrentLanguage()].h2}
                            color={theme.colors.dark[8]}
                            txtkey={'authentication.enterMobileNumber'}
                        />
                    </Center>
                    {/* Select CountriesCode */}
                    <Flex direction={'column'} gap={10} >
                        <BaseText
                            style={typography.label[i18nStore.getCurrentLanguage()].l1}
                            color={theme.colors.gray[6]}
                            txtkey={'profile.modal.countryCode'}
                        />
                        <Select
                            searchable
                            placeholder="Select your country code"
                            rightSection={<IconChevronDown size="1rem" />}
                            classNames={{
                                rightSection: classes.rightSection,
                                input: classes.input
                            }}
                            rightSectionWidth={30}
                            radius="xl"
                            styles={{ rightSection: { pointerEvents: 'none' } }}
                            data={countriesCode}
                            {...register('countriesCode')}
                            onChange={(event: any) => {
                                clearErrors();
                                setValue("countriesCode", event);
                              }}
                              error = {errors.countriesCode?.message}
                        />
                    </Flex>
                    {/* Phone Number Input Box */}
                    <Flex direction={'column'} gap={10} >
                        <BaseText
                            style={typography.label[i18nStore.getCurrentLanguage()].l1}
                            color={theme.colors.gray[6]}
                            txtkey={'authentication.enterMobileNumber'}
                        />
                        <Input
                            w={'100%'}
                            h={'44px'}
                            component={'input'}
                            classNames={{ input: classes.input }}
                            type={'number'}
                            placeholder={`${translate('profile.phoneNumber')}`}
                            style_variant={'inputText1'}
                           inputvalue= {register('number')}
                           error ={errors.number?.message}
                        />
                        {/* Error Message */}
                        <Center>
                            {error ?
                                <BaseText style={typography.label[i18nStore.getCurrentLanguage()].l1}
                                    color={theme.colors.red[7]} txtkey={'authentication.formText.invalidNumber'} />
                                : null}
                        </Center>
                    </Flex>
                    {/* Number Add Button */}
                    <BaseButton
                        type ='submit'
                        w={'100%'}
                        mah={'39px'}
                        style_variant={isValid ? 'filled' : 'disabled'}
                        color_variant={isValid? 'blue' : 'gray'}
                        loading={loader}
                    >
                        <BaseText
                            style={typography.buttonText[i18nStore.getCurrentLanguage()].b2}
                            color={isValid ? theme.white : theme.colors.dark[1]}
                            txtkey={'signUpForm.login'}
                        />
                    </BaseButton>
                </Flex>
            </form>
            {/* Already have account then login page link */}
            <Flex
                justify="center" align="center" gap={5}>
                <BaseText
                    style={typography.label[i18nStore.getCurrentLanguage()].l1}
                    color={theme.colors.gray[6]}
                    txtkey={'authentication.formText.oldUser'}
                />
                <Link style={{ textDecoration: "none" }} href='/login'>
                    <BaseText
                        style={typography.headings[i18nStore.getCurrentLanguage()].h7}
                        color={theme.colors.blue[4]}
                        txtkey={'signUpForm.login'}
                    />
                </Link>
            </Flex>
        </Flex>
    )
}