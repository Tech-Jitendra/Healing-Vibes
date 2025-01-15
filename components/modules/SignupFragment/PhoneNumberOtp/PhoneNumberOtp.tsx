import React, { useState } from "react";
import { Box, Center, Flex } from "@mantine/core";
import { BaseButton } from "@/components/elements/BaseButton/BaseButton";
import { BaseText } from "@/components/elements/BaseText/BaseText";
import { typography } from "@/themes/Mantine/typography";
import { useMantineTheme } from "@mantine/core";
import { useStores } from "@/models";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PinInput } from "@mantine/core";
import { translate } from "../../../../i18n";
import swal from "sweetalert";
import { useRouter } from "next/router";

const OTPSchema = yup.object({
  numberOtp: yup.string().length(4, "")
});

export const PhoneNumberOtp = () => {
  const { i18nStore, userStore } = useStores();
  const theme = useMantineTheme();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<any>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      numberOtp: ""
      // termsOfService: false
    },
    resolver: yupResolver(OTPSchema)
  });

  // Otp in Number api
  const handleNumberOtp = () => {
    setLoader(true);

    userStore.verifyPhoneNumber(`${getValues("numberOtp")}`).then((res) => {
      if (res.ok) {
        setValue("numberOtp", "");
        router.push("/profile");
        setLoader(false);
      } else if (res.code == 400) {
        if (res.error) {
          setLoader(false);
          setError(translate("profile.error.invalidOtp"));
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      }
    });
  };

  // Resend Otp in Number api
  const handleResendVerificationNumber = () => {
    setLoader(true);

    userStore.resendVerificationSMS().then((res) => {
      if (res.ok) {
        setValue("numberOtp", "");
        setLoader(false);
        swal(
          `${translate("profile.modal.resendText")}`,
          `${translate("authentication.formText.successfully")}`,
          "success"
        );
      }
    });
  };

  return (
    <Flex gap={26} direction={"column"}>
      <form onSubmit={handleSubmit(handleNumberOtp)}>
        <Flex justify={"center"} align={"center"} direction={"column"} gap={30}>
          <Center>
            <BaseText
              style={typography.headings[i18nStore.getCurrentLanguage()].h2}
              color={theme.colors.dark[8]}
              txtkey={"profile.modal.verifyNumber"}
            />
          </Center>
          <Flex
            justify={"center"}
            align={"center"}
            direction={"column"}
            gap={39}
          >
            <Flex
              w={"70%"}
              justify={"center"}
              direction={"column"}
              align={"center"}
            >
              <BaseText
                ta={"center"}
                style={typography.label[i18nStore.getCurrentLanguage()].l1}
                color={theme.colors.gray[6]}
                txtkey={"profile.modal.verifyNumberOtpPara"}
              />
            </Flex>
            {/* Otp Enter */}
            <PinInput
              {...register("numberOtp")}
              onChange={(event: any) => {
                clearErrors();
                setValue("numberOtp", event);
              }}
              radius={"5px"}
              spacing={"28px"}
              size={"xl"}
              placeholder=""
              error={error}
              variant="filled"
              type="number"
            />
            {/* Error Message */}
            <Center>
              {error ? (
                <BaseText
                  style={typography.label[i18nStore.getCurrentLanguage()].l1}
                  color={theme.colors.red[7]}
                  txtkey={"profile.error.invalidOtp"}
                />
              ) : null}
            </Center>
          </Flex>
          {/* Resend Otp Button */}
          <Flex justify="center" align="center" gap={5}>
            <BaseText
              style={typography.label[i18nStore.getCurrentLanguage()].l1}
              color={theme.colors.gray[6]}
              txtkey={"profile.modal.resendCode"}
            />
            <Box style={{ cursor: "pointer" }}>
              <BaseText
                onClick={() => handleResendVerificationNumber()}
                style={typography.headings[i18nStore.getCurrentLanguage()].h7}
                color={theme.colors.blue[4]}
                txtkey={"profile.modal.resendText"}
              />
            </Box>
          </Flex>
          {/* Otp Submit Button */}
          <BaseButton
            type="submit"
            w={"80%"}
            h={"39px"}
            style_variant={
              getValues("numberOtp")?.length == 4 ? "filled" : "disabled"
            }
            color_variant={
              getValues("numberOtp")?.length == 4 ? "blue" : "gray"
            }
            loading={loader}
          >
            <BaseText
              style={typography.buttonText[i18nStore.getCurrentLanguage()].b2}
              color={
                getValues("numberOtp")?.length == 4
                  ? theme.white
                  : theme.colors.dark[1]
              }
              txtkey={"global.button.continue"}
            />
          </BaseButton>
        </Flex>
      </form>
    </Flex>
  );
};
