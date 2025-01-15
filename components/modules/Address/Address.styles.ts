import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  container: {
    // width: "100%",
    marginTop: "35px",
    // paddingTop: "35px"
  },
  addNewAddressButton:{
    // marginTop: "35px",
    width: "100%",
    border:`1px dashed ${theme.colors.gray[2]}`,
    borderRadius: "20px",
    height: "58px"
  },
  addressBox:{
    width: "100%",
    padding: "28px",
    marginTop:"24px",
    border:`1px solid ${theme.colors.gray[2]}`,
    borderRadius:"20px"
  }
}));
