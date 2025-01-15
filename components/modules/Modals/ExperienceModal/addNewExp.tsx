/* eslint-disable import/extensions */
// react and nextb import
import React from 'react';
// mantine component
// styles components
// internals components

import { observer } from 'mobx-react-lite';
import { useMediaQuery } from '@mantine/hooks';

import { BaseModal } from '@/components/elements/BaseModal/BaseModal';

import { ExpForm } from '../../Forms/expForm';

const AddNewExp = observer((props: { opened?: any; onClose?: any }) => {
  const isPhone = useMediaQuery('(max-width: 576px)');
  return (
    <>
      <BaseModal
        size={isPhone ? '65%' : '50%'}
        padding={isPhone ? '20px' : '30px'}
        radius="lg"
        opened={props.opened}
        onClose={() => {
          props.onClose();
        }}
        withCloseButton
        title="Add new experience"
      >
        <ExpForm onClose={props.onClose} opened={props.opened} />
      </BaseModal>
    </>
  );
});

export default AddNewExp;
