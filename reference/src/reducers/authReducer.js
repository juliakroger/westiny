import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.AUTH_LOADING:
      return { ...state, loading: true };
    case types.AUTH_FULFILLED:
      return { ...state, loading: false, isAuthenticated: true, user: action.data.user, token: action.data.token };
    case types.AUTH_REJECTED:
      return { ...state, loading: false, isAuthenticated: false };
    case types.EXTERNAL_LOGIN_LOADING:
      return { ...state, external: { ...state.external, externalLoginLoading: true } };
    case types.EXTERNAL_LOGIN_REJECTED:
      return { ...state, external: { ...state.external, externalLoginLoading: false, externalLoginRejected: true } };
    case types.LOGIN_LOADING:
      return { ...state, login: { ...state.login, loginLoading: true } };
    case types.LOGIN_FULFILLED:
      return { ...state, isAuthenticated: true, user: action.data.user, token: action.data.token, login: { ...state.login, loginLoading: false, loginError: false, loginRejected: false, loginFulfilled: true } };
    case types.LOGIN_REJECTED:
      return { ...state, login: { ...state.login, loginLoading: false, loginError: false, loginRejected: true, loginFulfilled: false } };
    case types.LOGIN_ERROR:
      return { ...state, login: { ...state.login, loginLoading: false, loginError: action.data, loginRejected: false, loginFulfilled: false } };
    case types.SIGNUP_LOADING:
      return { ...state, signup: { ...state.signup, signupLoading: true } };
    case types.SIGNUP_FULFILLED:
      return { ...state, signup: { ...state.signup, signupLoading: false, signupError: false, signupRejected: false, signupFulfilled: true, sendEmailFulfilled: true } };
    case types.SIGNUP_REJECTED:
      return { ...state, signup: { ...state.signup, signupLoading: false, signupError: false, signupRejected: true, sendEmailFulfilled: false } };
    case types.SIGNUP_ERROR:
      return { ...state, signup: { ...state.signup, signupLoading: false, signupError: action.data, signupRejected: false, sendEmailFulfilled: false } };
    case types.FORGOT_PASSWORD_LOADING:
      return { ...state, forgotPassword: { ...state.forgotPassword, forgotPasswordLoading: true } };
    case types.FORGOT_PASSWORD_FULFILLED:
      return { ...state, forgotPassword: { ...state.forgotPassword, forgotPasswordLoading: false, forgotPasswordError: false, forgotPasswordRejected: false, forgotPasswordFulfilled: true, sendEmailFulfilled: true } };
    case types.FORGOT_PASSWORD_REJECTED:
      return { ...state, forgotPassword: { ...state.forgotPassword, forgotPasswordLoading: false, forgotPasswordError: false, forgotPasswordRejected: true, sendEmailFulfilled: false } };
    case types.FORGOT_PASSWORD_ERROR:
      return { ...state, forgotPassword: { ...state.forgotPassword, forgotPasswordLoading: false, forgotPasswordError: action.data, forgotPasswordRejected: false, sendEmailFulfilled: false } };
    case types.CHECK_RENEW_PASSWORD_LOADING:
      return { ...state, renewPassword: { ...state.renewPassword, checkRenewPasswordLoading: true } };
    case types.CHECK_RENEW_PASSWORD_FULFILLED:
      return { ...state, renewPassword: { ...state.renewPassword, checkRenewPasswordLoading: false, checkRenewPasswordRejected: false, checkRenewPasswordFulfilled: true, checkRenewPasswordError: false, ...action.data } };
    case types.CHECK_RENEW_PASSWORD_REJECTED:
      return { ...state, renewPassword: { ...state.renewPassword, checkRenewPasswordLoading: false, checkRenewPasswordRejected: true, checkRenewPasswordError: false, checkRenewPasswordFulfilled: false } };
    case types.CHECK_RENEW_PASSWORD_ERROR:
      return { ...state, renewPassword: { ...state.renewPassword, checkRenewPasswordLoading: false, checkRenewPasswordError: action.data, renewPasswordRejected: false } };
    case types.RENEW_PASSWORD_LOADING:
      return { ...state, renewPassword: { ...state.renewPassword, renewPasswordLoading: true } };
    case types.RENEW_PASSWORD_FULFILLED:
      return { ...state, renewPassword: { ...state.renewPassword, renewPasswordLoading: false, renewPasswordError: false, renewPasswordRejected: false, renewPasswordFulfilled: true } };
    case types.RENEW_PASSWORD_REJECTED:
      return { ...state, renewPassword: { ...state.renewPassword, renewPasswordLoading: false, renewPasswordError: false, renewPasswordRejected: true, sendEmailFulfilled: false } };
    case types.RENEW_PASSWORD_ERROR:
      return { ...state, renewPassword: { ...state.renewPassword, renewPasswordLoading: false, renewPasswordError: action.data, renewPasswordRejected: false, sendEmailFulfilled: false } };
    case types.CHECK_EMAIL_LOADING:
      return { ...state, signup: { ...state.signup, checkEmailLoading: true } };
    case types.CHECK_EMAIL_FULFILLED:
      return { ...state, signup: { ...state.signup, checkEmailLoading: false, checkEmailRejected: false, checkEmailFulfilled: true } };
    case types.CHECK_EMAIL_REJECTED:
      return { ...state, signup: { ...state.signup, checkEmailLoading: false, checkEmailRejected: true, checkEmailFulfilled: false } };
    case types.GENERATE_PRIVATE_KEY_LOADING:
      return { ...state, signup: { ...state.signup, privateKeyLoading: true } };
    case types.GENERATE_PRIVATE_KEY_FULFILLED:
      return { ...state, user: action.data.user, token: action.data.token, signup: { ...state.signup, signupOpened: true, privateKeyLoading: false, signupError: false, privateKeyFulfilled: true, signupFulfilled: true } };
    case types.GENERATE_PRIVATE_KEY_FINISHED:
      return { ...state, isAuthenticated: true, signup: initialState.auth.signup };
    case types.GENERATE_PRIVATE_KEY_REJECTED:
      return { ...state, signup: { ...state.signup, privateKeyLoading: false, signupError: true, privateKeyFulfilled: false } };
    case types.FORGOT_PASSWORD_PROP_UPDATED:
      return { ...state, forgotPassword: { ...state.forgotPassword, ...action.data } };
    case types.FORGOT_PASSWORD_CLEAR:
      return { ...state, forgotPassword: initialState.auth.forgotPassword };
    case types.RENEW_PASSWORD_PROP_UPDATED:
      return { ...state, renewPassword: { ...state.renewPassword, ...action.data } };
    case types.LOGIN_PROP_UPDATED:
      return { ...state, login: { ...state.login, ...action.data } };
    case types.SIGNUP_PROP_UPDATED:
      return { ...state, signup: { ...state.signup, ...action.data } };
    case types.LOGIN_OPEN:
      return { ...state, login: { ...state.login, loginOpened: true } };
    case types.SIGNUP_OPEN:
      return { ...state, signup: { ...state.signup, signupOpened: true, privateKeyLoading: false, signupError: false, privateKeyFulfilled: false } };
    case types.LOGIN_CLOSE:
      return { ...state, login: initialState.auth.login };
    case types.SIGNUP_CLOSE:
      return { ...state, signup: initialState.auth.signup };
    case types.PRIVATE_KEY_COPIED:
      return { ...state, signup: { ...state.signup, privateKeyCopied: true } };
    case types.LOGOUT:
      return { ...initialState.auth, loading: false };
    default:
      return state;
  }
}
