import * as types from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import axios from 'axios';
import config from '../config';
import { browserHistory } from 'react-router';

export function loadAuth() {
  return (dispatch) => {
    const token = localStorage.getItem('auth_token');

    if (!token || token === null || token === 'undefined') {
      dispatch({ type: types.AUTH_REJECTED });
    } else {
      const url = 'auth/check';

      axios.post(`${config.apiURL}/${url}`, { token }).then((res) => {
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
        dispatch({ type: types.AUTH_FULFILLED, data: res.data });
      }).catch((e) => {
        dispatch({ type: types.AUTH_REJECTED });
      });
    }
  };
}

export function checkEmail(hash) {
  return (dispatch) => {
    dispatch({ type: types.CHECK_EMAIL_LOADING });

    const url = 'auth/check-email';

    axios.post(`${config.apiURL}/${url}`, { hash }).then((res) => {
      dispatch({ type: types.CHECK_EMAIL_FULFILLED, data: res.data });
    }).catch((e) => {
      dispatch({ type: types.CHECK_EMAIL_REJECTED });
    });
  };
}

export function externalLogin(hash) {
  return (dispatch) => {
    dispatch({ type: types.EXTERNAL_LOGIN_LOADING });

    const url = 'auth/login-external';

    axios.post(`${config.apiURL}/${url}`, { hash }).then((res) => {
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      localStorage.setItem('auth_token', res.data.token);
      dispatch({ type: types.LOGIN_FULFILLED, data: res.data });
      browserHistory.push('/monitoring');
    }).catch((e) => {
      dispatch({ type: types.EXTERNAL_LOGIN_REJECTED });
    });
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch({ type: types.LOGIN_LOADING });

    const url = 'auth/login';

    axios.post(`${config.apiURL}/${url}`, { email, password }).then((res) => {
      if (res && res.data && res.data.token) {
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
        localStorage.setItem('auth_token', res.data.token);
        dispatch({ type: types.LOGIN_FULFILLED, data: res.data });
      }
      else {
        dispatch({ type: types.LOGIN_REJECTED });
      }
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.error_code !== 'ERROR') {
        dispatch({ type: types.LOGIN_ERROR, data: error.response.data });
      } else {
        dispatch({ type: types.LOGIN_REJECTED });
      }
    });
  };
}

export function anonymousLogin(privateKey) {
  return (dispatch) => {
    dispatch({ type: types.LOGIN_LOADING });

    const url = 'auth/login-anonymous';

    axios.post(`${config.apiURL}/${url}`, { privateKey }).then((res) => {
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      localStorage.setItem('auth_token', res.data.token);
      dispatch({ type: types.LOGIN_FULFILLED, data: res.data });
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.error_code !== 'ERROR') {
        dispatch({ type: types.LOGIN_ERROR, data: error.response.data });
      } else {
        dispatch({ type: types.LOGIN_REJECTED });
      }
    });
  };
}

export function signup(email, password, name, privateKey) {
  return (dispatch) => {
    dispatch({ type: types.SIGNUP_LOADING });

    const url = 'auth/signup';

    axios.post(`${config.apiURL}/${url}`, { email, password, name, privateKey }).then((res) => {
      dispatch({ type: types.SIGNUP_FULFILLED, data: res.data });
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.error_code !== 'ERROR') {
        dispatch({ type: types.SIGNUP_ERROR, data: error.response.data });
      } else {
        dispatch({ type: types.SIGNUP_REJECTED });
      }
    });
  };
}

export function sendForgotPasswordEmail(email) {
  return (dispatch) => {
    dispatch({ type: types.FORGOT_PASSWORD_LOADING });

    const url = 'auth/forgot-password';

    axios.post(`${config.apiURL}/${url}`, { email }).then((res) => {
      dispatch({ type: types.FORGOT_PASSWORD_FULFILLED, data: res.data });
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.error_code !== 'ERROR') {
        dispatch({ type: types.FORGOT_PASSWORD_ERROR, data: error.response.data });
      } else {
        dispatch({ type: types.FORGOT_PASSWORD_REJECTED });
      }
    });
  };
}

export function checkRenewPassword(hash) {
  return (dispatch) => {
    dispatch({ type: types.CHECK_RENEW_PASSWORD_LOADING });

    const url = 'auth/check-renew-password';

    axios.post(`${config.apiURL}/${url}`, { hash }).then((res) => {
      dispatch({ type: types.CHECK_RENEW_PASSWORD_FULFILLED, data: res.data });
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.error_code !== 'ERROR') {
        dispatch({ type: types.CHECK_RENEW_PASSWORD_ERROR, data: error.response.data });
      } else {
        dispatch({ type: types.CHECK_RENEW_PASSWORD_REJECTED });
      }
    });
  };
}

export function renewPassword(password, email, hash) {
  return (dispatch) => {
    dispatch({ type: types.RENEW_PASSWORD_LOADING });

    const url = 'auth/renew-password';

    axios.post(`${config.apiURL}/${url}`, { password, email, hash }).then((res) => {
      dispatch({ type: types.RENEW_PASSWORD_FULFILLED, data: res.data });
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.error_code !== 'ERROR') {
        dispatch({ type: types.RENEW_PASSWORD_ERROR, data: error.response.data });
      } else {
        dispatch({ type: types.RENEW_PASSWORD_REJECTED });
      }
    });
  };
}

export function changePassword(oldPassword, newPassword) {
  return (dispatch) => {
    dispatch({ type: types.RENEW_PASSWORD_LOADING });

    const url = 'auth/change-password';
    const token = localStorage.getItem('auth_token');

    axios.post(`${config.apiURL}/${url}`, { oldPassword, newPassword, token }).then((res) => {
      dispatch({ type: types.RENEW_PASSWORD_FULFILLED, data: res.data });
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.error_code !== 'ERROR') {
        dispatch({ type: types.RENEW_PASSWORD_ERROR, data: error.response.data });
      } else {
        dispatch({ type: types.RENEW_PASSWORD_REJECTED });
      }
    });
  };
}

export function generatePrivateKey() {
  return (dispatch) => {
    dispatch({ type: types.GENERATE_PRIVATE_KEY_LOADING });
    const url = 'auth/generate-private-key';

    axios.post(`${config.apiURL}/${url}`, {}).then((res) => {
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      localStorage.setItem('auth_token', res.data.token);

      dispatch({ type: types.GENERATE_PRIVATE_KEY_FULFILLED, data: res.data });
    }).catch((e) => {
      dispatch({ type: types.SIGNUP_REJECTED });
    });
  };
}

export function privateKeyFinished() {
  return (dispatch) => {
    dispatch({ type: types.GENERATE_PRIVATE_KEY_FINISHED });
  };
}

export function loginPropUpdated(propName, value) {
  return (dispatch) => {
    dispatch({ type: types.LOGIN_PROP_UPDATED, data: { [propName]: value } });
  };
}

export function renewPasswordPropUpdated(propName, value) {
  return (dispatch) => {
    dispatch({ type: types.RENEW_PASSWORD_PROP_UPDATED, data: { [propName]: value } });
  };
}

export function signupPropUpdated(propName, value) {
  return (dispatch) => {
    dispatch({ type: types.SIGNUP_PROP_UPDATED, data: { [propName]: value } });
  };
}

export function clearForgetPassword() {
  return (dispatch) => {
    dispatch({ type: types.FORGOT_PASSWORD_CLEAR });
  };
}

export function forgotPasswordPropUpdated(propName, value) {
  return (dispatch) => {
    dispatch({ type: types.FORGOT_PASSWORD_PROP_UPDATED, data: { [propName]: value } });
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.setItem('auth_token', null);
    axios.defaults.headers.common.Authorization = '';
    dispatch({ type: types.LOGOUT });
  };
}

export function signupClose() {
  return (dispatch) => {
    dispatch({ type: types.SIGNUP_CLOSE });
  };
}

export function signupOpen() {
  return (dispatch) => {
    dispatch({ type: types.SIGNUP_OPEN });
  };
}

export function loginClose() {
  return (dispatch) => {
    dispatch({ type: types.LOGIN_CLOSE });
  };
}

export function loginOpen() {
  return (dispatch) => {
    dispatch({ type: types.LOGIN_OPEN });
  };
}

export function copiedToClipboard() {
  return (dispatch) => {
    dispatch({ type: types.PRIVATE_KEY_COPIED });
  };
}
