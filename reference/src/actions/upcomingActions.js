import * as types from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import axios from 'axios';
import config from '../config';


export function loadUpcoming() {
  return (dispatch) => {
    dispatch({ type: 'FETCHING_UPCOMING_LOADING' });

    const url = 'coins/upcoming';
    axios.get(`${config.apiURL}/${url}`).then((res) => {
      dispatch({ type: 'FETCHING_UPCOMING_FULFILLED', data: res.data });
    }).catch((e) => {
      dispatch({ type: 'FETCHING_UPCOMING_REJECTED' });
    });
  };
}
