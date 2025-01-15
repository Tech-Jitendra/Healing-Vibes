import React from 'react'
import { Text } from '@mantine/core'
import { TxKeyPath } from '@/i18n';

const ErrorMessage = (props:{
    message: TxKeyPath | string
    text_color?: string
}) => {
  return (
    <Text
      ta={"center"}
      color={ props.text_color?props.text_color: 'red'}
      fw={700}
      size="lg"
    >
      {props.message}
    </Text>
  )
}

export default ErrorMessage