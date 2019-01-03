import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function monitorReducer(state = initialState.monitor, action) {
  switch (action.type) {
    case types.FETCHING_MONITOR_LOADING:
      return { ...state, loading: true };
    case types.FETCHING_MONITOR_FULFILLED:
      return { ...state, loading: false, monitorUpdating: false, error: false, list: action.data };
    case types.FETCHING_MONITOR_REJECTED:
      return { ...state, loading: false, error: true };
    case types.MONITOR_REFRESH_LOADING:
      return { ...state, monitorRefreshLoading: true };
    case types.MONITOR_REFRESH_FULFILLED:
      return { ...state, monitorRefreshLoading: false, list: action.data };
    case types.MONITOR_PROP_CHANGED:
      return { ...state, ...action.data };
    case types.FETCHING_MONITOR_MASTERNODES_SEARCH_LOADING:
      return { ...state, masternodeSearchLoading: true };
    case types.FETCHING_MONITOR_MASTERNODES_SEARCH_FULFILLED:
      return { ...state, masternodeSearchLoading: false, masternodeSearchError: false, masternodeSearchResult: action.data };
    case types.FETCHING_MONITOR_MASTERNODES_SEARCH_REJECTED:
      return { ...state, masternodeSearchLoading: false, masternodeSearchError: true };
    case types.FETCHING_MONITOR_ADD_LOADING:
      return { ...state, monitorAddLoading: true };
    case types.FETCHING_MONITOR_UPDATING:
      return { ...state, monitorUpdating: true };
    case types.FETCHING_MONITOR_ADD_FULFILLED:
      return { ...state, monitorAddLoading: false, masternodeSearchResultNotFound: !action.data.length, monitorAddError: false, monitorAddOpened: false, list: state.list.concat(action.data) };
    case types.FETCHING_MONITOR_ADD_REJECTED:
      return { ...state, monitorAddLoading: false, monitorAddError: true };
    case types.MONITOR_ADD_CLOSE:
      return { ...state, monitorAddOpened: false };
    case types.MONITOR_ADD_OPEN:
      return { ...state, monitorAddOpened: true, masternodeSearchLoading: false, masternodeSearchError: false, masternodeSearchResultNotFound: false, masternodeSearchResult: [], monitorAddSelectedList: [] };
    case types.MONITOR_SELECTED:
      return { ...state, ...action.data };
    case types.MONITOR_REMOVE_CLOSE:
      return { ...state, monitorRemoveOpened: false };
    case types.MONITOR_REMOVE_OPEN:
      return { ...state, monitorRemoveOpened: true, monitorRemoveItem: action.data };
    case types.MONITOR_REMOVE_LOADING:
      return { ...state, monitorRemoveLoading: true };
    case types.MONITOR_REMOVE_FULFILLED:
      return { ...state, list: state.list.filter(item => item._id !== action.data.removedMonitorId), monitorRemoveLoading: false, monitorRemoveOpened: false, monitorRemoveError: false };
    case types.MONITOR_REMOVE_REJECTED:
      return { ...state, monitorRemoveLoading: false, monitorRemoveError: true };
    default:
      return state;
  }
}
