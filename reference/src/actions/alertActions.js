import * as types from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import axios from 'axios';
import config from '../config';

export function loadAlert() {
  return (dispatch) => {
    dispatch({ type: types.FETCHING_ALERT_LOADING });

    const url = 'alerts';

    axios.get(`${config.apiURL}/${url}`, { params: {} }).then((res) => {
      dispatch({ type: types.FETCHING_ALERT_FULFILLED, data: res.data });
    }).catch((e) => {
      dispatch({ type: types.FETCHING_ALERT_REJECTED });
    });
  };
}

export function toggleAlert(item, index) {
  return (dispatch) => {
    dispatch({ type: types.ALERT_TOGGLE_LOADING, index });

    const url = 'alerts/toggle';

    axios.post(`${config.apiURL}/${url}`, { masternode: item.masternode._id }).then((res) => {
      dispatch({ type: types.ALERT_TOGGLE_FULFILLED, data: res.data, index });
    }).catch((e) => {
      dispatch({ type: types.ALERT_TOGGLE_REJECTED, index });
    });
  };
}
