import { createStyles } from '@mantine/core';
import { useStores } from '@/models';

export const createStyle = () => {

  const {i18nStore} =useStores()

return createStyles((theme) => ({
  align:{
    textAlign: i18nStore.isRTL? "right":"left",
  },
  rightSection: { 
    right: i18nStore.isRTL? "83%":""
  },
}))}
