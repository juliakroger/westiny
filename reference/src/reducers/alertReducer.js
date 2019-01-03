import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function alertReducer(state = initialState.alert, action) {
  let list;

  switch (action.type) {
    case types.FETCHING_ALERT_LOADING:
      return { ...state, loading: true };
    case types.FETCHING_ALERT_FULFILLED:
      return { ...state, loading: false, error: false, list: action.data };
    case types.FETCHING_ALERT_REJECTED:
      return { ...state, loading: false, error: true };
    case types.ALERT_PROP_CHANGED:
      return { ...state, ...action.data };
    case types.ALERT_TOGGLE_LOADING:

      list = state.list.map(item => item);
      list[action.index] = { ...state.list[action.index], loading: true };

      return { ...state, list };
    case types.ALERT_TOGGLE_FULFILLED:

      list = state.list.map(item => item);
      list[action.index] = { ...list[action.index], ...action.data, loading: false };

      return { ...state, list };
    case types.ALERT_TOGGLE_REJECTED:

      list = state.list.map(item => item);
      list[action.index] = { ...state.list[action.index], loading: false };

      return { ...state, list };
    default:
      return state;
  }
}
