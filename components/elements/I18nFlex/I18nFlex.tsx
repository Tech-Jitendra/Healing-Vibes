import React from 'react';
import { Flex, FlexProps } from '@mantine/core';
import { useStores } from '@/models';

const I18nFlex = (props: FlexProps) => {
    const { i18nStore } = useStores()
    return (
        <Flex {...props} direction={i18nStore.isRTL ? 'row-reverse' : 'row'}>
        {props.children}
        </Flex>
    );
};

export default I18nFlex;
