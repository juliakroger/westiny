import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function upcomingReducer(state = initialState.upcoming, action) {
  switch (action.type) {
    case types.FETCHING_UPCOMING_LOADING:
      return { ...state, loading: true };
    case types.FETCHING_UPCOMING_FULFILLED:
      return { ...state, loading: false, error: false, list: action.data };
    case types.FETCHING_UPCOMING_REJECTED:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
