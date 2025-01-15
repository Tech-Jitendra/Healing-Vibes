import React from 'react';
import { Modal, ModalProps } from '@mantine/core';
import { PolymorphicComponentProps } from '@mantine/utils';

interface BaseModalProps extends PolymorphicComponentProps<'div', ModalProps> {
  title?: string | null;
}

export const BaseModal = (props: BaseModalProps) => (
    <Modal {...props} opened={props.opened} onClose={props.onClose} centered title={props.title}>
      {props.children}
    </Modal>
  );
