import { types, flow } from 'mobx-state-tree';
import * as storage from 'localforage';
import { withEnvironment } from '../../extensions/with-environment';
import { ACTION_RESPONSES } from '../../api/endpoint.types';
import * as UserSchemas from './schemas';
import { API_ENDPOINTS } from './endpoints';
/**
 * Model description here for TypeScript hints.
 */

export const UserStore = types
  .model({
    loggedInUserData: types.maybeNull(UserSchemas.LoggedInUser),
    userData: types.maybeNull(UserSchemas.User),
    avatarData: types.maybeNull(UserSchemas.AvatarPaginated),
    termsOfUse: types.maybeNull(UserSchemas.TermsOfUse),
    referralSourceData: types.maybeNull(UserSchemas.ReferralSourcePaginated),
    is_logged_in: types.maybeNull(types.boolean),
    remember_me: types.maybeNull(types.boolean),
    isLoggedInUser: types.maybeNull(types.boolean),
    verfyEmailData: types.maybeNull(UserSchemas.LoggedInUser),
    address: types.maybeNull(UserSchemas.AddressResults),
    getAddress: types.maybeNull(UserSchemas.Address),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    getUserLoggedInStatus: flow(function* (userLogin: boolean) {
      self.isLoggedInUser = userLogin;
      return true;
    }),
    loginUser: flow(function* (email: string, password: string) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.loginUser,
        {
          email,
          password,
        }
      );
      console.log("---40 userstore", JSON.stringify(response.data.user, null, 2));
      switch (response.status) {

        case 200:
          self.loggedInUserData = null;
          yield storage.clear();
          self.is_logged_in = true;
          self.loggedInUserData = UserSchemas.LoggedInUser.create(
            response.data
          );
          yield storage.setItem(
            self.environment.api.config.token_key,
            response.data[self.environment.api.config.token_key]
          );
          return ACTION_RESPONSES.success;
        case 400:
          return {
            ...ACTION_RESPONSES.failure, code: response.status, error: response.data,
          };
        case 401:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
        case 500:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          return ACTION_RESPONSES.success;
      }
    }),
    logoutUser: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.logoutuser
      );
      switch (response.status) {
        case 204:
        case 200:
          yield storage.removeItem(self.environment.api.config.token_key);
          yield storage.clear();
          self.is_logged_in = false;
          self.loggedInUserData = null;
          return ACTION_RESPONSES.success;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    deleteUser: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.deleteUser
      );
      switch (response.status) {
        case 204:
          yield storage.removeItem(self.environment.api.config.token_key);
          yield storage.clear();
          self.is_logged_in = false;
          self.loggedInUserData = null;
          return ACTION_RESPONSES.success;
        default:
          yield storage.clear();
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    signupUser: flow(function* (
      email: string,
      full_name: string,
      password1: string,
      password2: string,
      // phone: string,
      // is_terms_agreed: boolean
    ) {
      storage.clear();
      self.is_logged_in = false;
      const response = yield self.environment.api.call(
        API_ENDPOINTS.registerUser,
        {
          email,
          full_name,
          password1,
          password2,
          // phone,
          // is_terms_agreed: is_terms_agreed
        }
      );
      const error = null;
      // console.log("response.dat---123", JSON.stringify(response.data, null, 2));
      switch (response.status) {


        case 201:
          self.loggedInUserData = null;
          yield storage.clear();
          self.is_logged_in = true;
          self.loggedInUserData = UserSchemas.LoggedInUser.create(
            response.data
          );
          yield storage.setItem(
            self.environment.api.config.token_key,
            response.data[self.environment.api.config.token_key]
          );
          return ACTION_RESPONSES.success;
        case 400:
          return {
            ...ACTION_RESPONSES.failure, code: response.status, error: response.data,
          };
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    verifyEmail: flow(function* (otp: string) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.verifyEmail,
        {
          otp,
        }
      );

      // console.log("email-verification--store 155 response", JSON.stringify(response, null, 2));
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.failure;
        case 404:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    resendVerificationEmail: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.resendVerificationEmail,
        {}
      );
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    verifyPhoneNumber: flow(function* (otp: string) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.verifyPhoneNumber,
        {
          otp,
        }
      );
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
        default:
          console.error('UNHANDLED ERROR');
      }
      return ACTION_RESPONSES.failure;
    }),
    createPassword: flow(function* (new_password1: string, new_password2: string) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.createPassword,
        {
          new_password1,
          new_password2,
        }
      );
      switch (response.status) {
        case 200:
          self.is_logged_in = true;
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
      }
      return ACTION_RESPONSES.failure;
    }),
    resendVerificationSMS: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.resendVerificationSMS
      );
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
      }
      return ACTION_RESPONSES.failure;
    }),
    getLoginUserData: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.loginUserData
      );
      switch (response.status) {
        case 200:
          self.userData = UserSchemas.User.create(response.data);
          return ACTION_RESPONSES.success;
        case 405:
          storage.clear();
          self.is_logged_in = false;
          break;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    getReferralSource: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.getReferralSource
      );
      switch (response.status) {
        case 200:
          self.referralSourceData = UserSchemas.ReferralSourcePaginated.create(
            response.data
          );
          return ACTION_RESPONSES.success;
        case 401:
          console.log('Authentication credentials were not provided.');
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
    }),
    getAvatar: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.avatar
      );
      switch (response.status) {
        case 200:
          self.avatarData = UserSchemas.AvatarPaginated.create(response.data);
          return ACTION_RESPONSES.success;
        case 405:
          storage.clear();
          self.is_logged_in = false;
          break;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    rememberMe: flow(function* (val: boolean) {
      self.remember_me = val;
    }),
    editUser: flow(function* (
      data: {
        avatar?: string | null;
        full_name?: string | null;
        email?: string | null;
        phone?: string | null;
      }
        | FormData
    ) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.editUser,
        data
      );
      switch (response.status) {
        case 200:
          // self.loggedInUserData.user = UserSchemas.User.create(response.data);
          return ACTION_RESPONSES.success;
        case 400:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
        case 401:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    resendEmail: flow(function* (email: string | null) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.resendVerificationEmail,
        { email }
      );
      switch (response.status) {
        case 200:
          // here we have design a modal which will be showing the message of resend email
          return true;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return false;
    }),
    changePassword: flow(function* (
      old_password: string,
      new_password1: string,
      new_password2: string
    ) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.changePassword,
        {
          old_password,
          new_password1,
          new_password2,
        }
      );
      let error = null;
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          error = response.data;
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data.old_password };
        case 401:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data.old_password };
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    changeEmail: flow(function* (
      email: string,
    ) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.changeEmail,
        {
          email,
        }
      );
      let error = null;
      // console.log("376---", JSON.stringify(response.status, null, 2));
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          error = response.data;
          // console.log("email error---", error);
          return { ...ACTION_RESPONSES.failure, code: response.status, message: error.email };
        case 401:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    verifyChangeEmail: flow(function* (
      otp: string,
    ) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.verifyChangeEmail,
        {
          otp,
        }
      );
      let error = null;
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          error = response.data;
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data.message };
        case 401:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    resendChangeEmailOtp: flow(function* (
    ) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.resendChangeEmailOtp, {});
      let error = null;
      switch (response.status) {
        case 200:
          return { ...ACTION_RESPONSES.success, code: response.status, message: response.data.message };
        case 400:
          error = response.data;
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data.message };
        case 401:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    changePhoneNumber: flow(function* (
      phone: string,
    ) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.changePhoneNumber,
        {
          phone,
        }
      );
      let error = null;
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          error = response.data;
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data.phone };
        case 401:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    changePhoneNumberVerify: flow(function* (
      otp: string,
    ) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.changePhoneNumberVerify,
        {
          otp,
        }
      );
      let error = null;
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          error = response.data;
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data.message };
        case 401:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    phoneChangeResend: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.phoneChangeResend, {}
      );
      let error = null;
      switch (response.status) {
        case 200:
          return { ...ACTION_RESPONSES.success, code: response.status, message: response.data.message };
        case 400:
          error = response.data;
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data.message };
        case 401:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    getTermsOfUse: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.termsOfUse
      );
      switch (response.status) {
        case 200:
          self.termsOfUse = UserSchemas.TermsOfUse.create(response.data);
          return ACTION_RESPONSES.success;
        case 401:
          console.log('Authentication credentials were not provided.');
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
    }),
    resetPassword: flow(function* (
      email: string,
    ) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.resetPassword, {
        email,
      });
      const error = null;
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
        case 401:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    smsPasswordReset: flow(function* (
      phone: string,
    ) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.smsPasswordReset, {
        phone,
      });
      const error = null;
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
        case 401:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    resetPasswordConfirm: flow(function* (
      new_password1: string,
      new_password2: string,
      uid: string,
      token: string,
    ) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.resetPasswordConfirm, {
        new_password1,
        new_password2,
        uid,
        token,
      });
      let error = null;
      switch (response.status) {
        case 200:
          self.loggedInUserData = null;
          yield storage.clear();
          self.is_logged_in = true;
          self.loggedInUserData = UserSchemas.LoggedInUser.create(
            response.data
          );
          yield storage.setItem(
            self.environment.api.config.token_key,
            response.data[self.environment.api.config.token_key]
          );
          return ACTION_RESPONSES.success;
        case 400:
          error = response.data;
          break;
        case 401:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    getUserAddress: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.userAddress
      );
      switch (response.status) {
        case 200:
          self.address = UserSchemas.AddressResults.create(response.data);
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.success;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    getUserAddressById: flow(function* (id: string | undefined) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.getAddressById, {}, { id }
      );
      console.log(response.data);
      switch (response.status) {
        case 200:
          self.getAddress = UserSchemas.Address.create(response.data);
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.success;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    updateAddress: flow(function* (data, id: string | undefined) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.updateAddress, data, { id }
      );
      console.log(response.data);
      switch (response.status) {
        case 200:
          self.getAddress = UserSchemas.Address.create(response.data);
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.success;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    deleteAddress: flow(function* (id: string | undefined) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.deleteAddress, {}, { id }
      );
      console.log(response.data);
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 204:
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.success;
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    createAddress: flow(function* (
      data
    ) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.createAddress, data
      );
      console.log(response.data);
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 201:
          return ACTION_RESPONSES.success;
        case 400:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data.message };
        default:
          console.error('UNHANDLED ERROR');
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    loginFacebook: flow(function* (access_token: string) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.loginFacebook,
        {
          access_token,
        }
      );
      console.log('this is log in response ', response);
      switch (response.status) {
        case 200:
          self.loggedInUserData = null;
          yield storage.clear();
          self.is_logged_in = true;
          self.loggedInUserData = UserSchemas.LoggedInUser.create(
            response.data
          );
          yield storage.setItem(
            self.environment.api.config.token_key,
            response.data[self.environment.api.config.token_key]
          );
          return ACTION_RESPONSES.success;
        case 400:
          return {
            ...ACTION_RESPONSES.failure, code: response.status, error: response.data,
          };
        case 401:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
        case 500:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          return ACTION_RESPONSES.success;
      }
    }),
    loginGoogle: flow(function* (access_token: string) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.loginGoogle,
        {
          access_token,
        }
      );
      console.log('this is log in response ', response);
      switch (response.status) {
        case 200:
          self.loggedInUserData = null;
          yield storage.clear();
          self.is_logged_in = true;
          self.loggedInUserData = UserSchemas.LoggedInUser.create(
            response.data
          );
          yield storage.setItem(
            self.environment.api.config.token_key,
            response.data[self.environment.api.config.token_key]
          );
          return ACTION_RESPONSES.success;
        case 400:
          return {
            ...ACTION_RESPONSES.failure, code: response.status, error: response.data,
          };
        case 401:
          return { ...ACTION_RESPONSES.failure, code: response.status, error: response.data };
        case 500:
          return ACTION_RESPONSES.failure;
        default:
          console.error('UNHANDLED ERROR');
          return ACTION_RESPONSES.success;
      }
    }),
  }));
