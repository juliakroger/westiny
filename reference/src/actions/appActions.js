import * as types from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import axios from 'axios';
import config from '../config';

export function closeModal(modalName) {
  return (dispatch) => {
    dispatch({ type: types.APP_CLOSE_MODAL, data: modalName });
  };
}

export function openModal(modalName) {
  return (dispatch) => {
    dispatch({ type: types.APP_OPEN_MODAL, data: modalName });
  };
}

export function copiedToClipboard() {
  return (dispatch) => {
    dispatch({ type: types.APP_PRIVATE_KEY_COPIED });
  };
}
