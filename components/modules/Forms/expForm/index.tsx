/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Flex, InputBase, useMantineTheme, Center, FileInput } from '@mantine/core';
import { observer } from 'mobx-react-lite';
// import { randomUUID } from 'crypto';
import moment from 'moment';
import { BaseText } from '@/components/elements/BaseText/BaseText';
import { typography } from '@/themes/Mantine/typography';
import { useStores } from '@/models';
import { BaseButton } from '@/components/elements/BaseButton/BaseButton';

export const ExpForm = observer((props: { opened?: any; onClose?: any }) => {
  const { i18nStore, experienceStore } = useStores();
  // const { experienceCardData } = experienceStore;
  const theme = useMantineTheme();
  // const [loader, setLoader] = useState(false);
  // const [error, setError] = useState('');
  // const [year, date] = new Date().toDateString();
  const dateFormatted = moment(new Date()).format('MMM YYYY');
  // const autoId = `'id' + ${Math.random().toString(16).slice(2)}`;
  const autoId = crypto.randomUUID();
  const [formData, setFormData] = useState<any>({
    title: '',
    description: '',
    userName: '',
    datePosted: dateFormatted,
    comments: 10,
    id: autoId,
    userHandle: ' ',
    likes: 10,
    userImg:
      'https://img.freepik.com/premium-photo/man-with-glasses-black-shirt-is-circle_745528-3013.jpg?w=740',
  });

  const { experienceCardData } = experienceStore;
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = async () => {
    try {
      await experienceStore.addExperienceCard(formData);
      console.log('storeData', JSON.stringify(experienceCardData));
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    <Flex direction="column" gap={20}>
      {/* Title Input Box */}
      <Flex direction="column" gap={10}>
        <BaseText
          style={typography.label[i18nStore.getCurrentLanguage()].l1}
          color={theme.colors.black[8]}
          txtkey="experiences.title"
        />
        <InputBase
          w="100%"
          mah="44px"
          radius="lg"
          onChange={(e: any) => {
            setFormData((prev: any) => ({ ...prev, title: e.target.value }));
          }}
        />
      </Flex>

      {/* Description Input Box */}
      <Flex direction="column" gap={10}>
        <BaseText
          style={typography.label[i18nStore.getCurrentLanguage()].l1}
          color={theme.colors.black[8]}
          txtkey="experiences.description"
        />
        <InputBase
          w="100%"
          mah="44px"
          radius="lg"
          onChange={(e: any) => {
            setFormData((prev: any) => ({ ...prev, description: e.target.value }));
          }}
        />
      </Flex>

      {/* User Image Input Box */}
      <Flex direction="column" gap={10}>
        <BaseText
          style={typography.label[i18nStore.getCurrentLanguage()].l1}
          color={theme.colors.black[8]}
          txtkey="experiences.userImg"
        />

        <FileInput
          // onChange={() => {}}
          value={avatar}
          placeholder="Upload user img"
          onChange={setAvatar}
          radius="lg"
        />
      </Flex>

      {/* User Name Input Box */}
      <Flex direction="column" gap={10}>
        <BaseText
          style={typography.label[i18nStore.getCurrentLanguage()].l1}
          color={theme.colors.black[8]}
          txtkey="experiences.userName"
        />
        <InputBase
          w="100%"
          mah="44px"
          radius="lg"
          onChange={(e: any) => {
            setFormData((prev: any) => ({ ...prev, userName: e.target.value }));
          }}
        />
      </Flex>

      {/**user handle */}
      <Flex direction="column" gap={10}>
        <BaseText
          style={typography.label[i18nStore.getCurrentLanguage()].l1}
          color={theme.colors.black[8]}
          txtkey="experiences.userHandle"
        />
        <InputBase
          w="100%"
          mah="44px"
          radius="lg"
          onChange={(e: any) => {
            setFormData((prev: any) => ({ ...prev, userHandle: `@${e.target.value}` }));
          }}
        />
      </Flex>

      {/**submit btn */}
      <Center>
        {' '}
        <BaseButton
          color_variant="lime"
          style_variant="filled"
          type="submit"
          onClick={() => {
            props.onClose();
            handleSubmit();
          }}
          mt={20}
        >
          <BaseText txtkey="experiences.addNewExp" />
        </BaseButton>
      </Center>
    </Flex>
    // </form>
  );
});
