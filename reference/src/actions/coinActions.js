import * as types from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import axios from 'axios';
import config from '../config';

export function loadCoin(resource, offset = 0, forceIndex) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_COIN_LOADING' });

    const url = 'coins';

    axios.get(`${config.apiURL}/${url}`, {
      params: {
        offset,
      },
    }).then((res) => {
      dispatch({ type: 'FETCHING_COIN_FULFILLED', data: res.data });
    }).catch((e) => {
      dispatch({ type: 'FETCHING_COIN_REJECTED' });
    });
  };
}
