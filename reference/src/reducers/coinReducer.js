import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function coinReducer(state = initialState.coin, action) {
  switch (action.type) {
    case types.FETCHING_COIN_LOADING:
      return { ...state, loading: true };
    case types.FETCHING_COIN_FULFILLED:
      return { ...state, loading: false, error: false, list: action.data };
    case types.FETCHING_COIN_REJECTED:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
