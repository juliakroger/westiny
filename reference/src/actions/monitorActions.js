import * as types from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import axios from 'axios';
import config from '../config';


export function loadMonitor() {
  return (dispatch) => {
    dispatch({ type: types.FETCHING_MONITOR_LOADING });

    const url = 'monitors';
    axios.get(`${config.apiURL}/${url}`, { params: {} }).then((res) => {
      dispatch({ type: types.FETCHING_MONITOR_FULFILLED, data: res.data });
    }).catch((e) => {
      dispatch({ type: types.FETCHING_MONITOR_REJECTED });
    });
  };
}

export function refreshMonitor() {
  return (dispatch) => {
    dispatch({ type: types.MONITOR_REFRESH_LOADING });

    const url = 'monitors';
    axios.get(`${config.apiURL}/${url}`, { params: {} }).then((res) => {
      dispatch({ type: types.MONITOR_REFRESH_FULFILLED, data: res.data });
    }).catch((e) => {
      dispatch({ type: types.MONITOR_REFRESH_REJECTED });
    });
  };
}

export function propChanged(propName, value) {
  return (dispatch) => {
    dispatch({ type: types.MONITOR_PROP_CHANGED, data: { [propName]: value } });
  };
}

export function selectMonitor(masternodeId, selectedList) {
  return (dispatch) => {
    const monitorAddSelectedList = selectedList.concat([]);

    if (monitorAddSelectedList.indexOf(masternodeId) === -1) {
      monitorAddSelectedList.push(masternodeId);
    } else {
      monitorAddSelectedList.splice(monitorAddSelectedList.indexOf(masternodeId), 1);
    }

    dispatch({ type: types.MONITOR_SELECTED, data: { monitorAddSelectedList } });
  };
}

export function selectAllMonitors(resultList, selectedList) {
  return (dispatch) => {
    const checked = resultList.length === selectedList.length;
    const monitorAddSelectedList = checked ? [] : resultList.map(item => item._id);

    dispatch({ type: types.MONITOR_SELECTED, data: { monitorAddSelectedList } });
  };
}

export function deselectAllMonitors() {
  return (dispatch) => {
    dispatch({ type: types.MONITOR_SELECTED, data: { monitorAddSelectedList: [] } });
  };
}

export function searchMasternodes(searchText) {
  return (dispatch) => {
    dispatch({ type: types.FETCHING_MONITOR_MASTERNODES_SEARCH_LOADING });

    const url = 'masternodes/search';

    axios.post(`${config.apiURL}/${url}`, { searchText }).then((res) => {
      dispatch({ type: types.FETCHING_MONITOR_MASTERNODES_SEARCH_FULFILLED, data: res.data });
    }).catch((e) => {
      dispatch({ type: types.FETCHING_MONITOR_MASTERNODES_SEARCH_REJECTED });
    });
  };
}

export function addMonitors(selectedList) {
  return (dispatch) => {
    dispatch({ type: types.FETCHING_MONITOR_ADD_LOADING });

    const url = 'monitors';

    setTimeout(() => {
      axios.post(`${config.apiURL}/${url}`, selectedList).then((res) => {
        dispatch({ type: types.FETCHING_MONITOR_UPDATING });

        setTimeout(() => {
          axios.get(`${config.apiURL}/${url}`, { params: {} }).then((res) => {
            dispatch({ type: types.FETCHING_MONITOR_FULFILLED, data: res.data });
          }).catch((e) => {
            dispatch({ type: types.FETCHING_MONITOR_REJECTED });
          });
        }, 4000);

        dispatch({ type: types.FETCHING_MONITOR_ADD_FULFILLED, data: res.data });
      }).catch((e) => {
        dispatch({ type: types.FETCHING_MONITOR_ADD_REJECTED });
      });
    }, 1000);
  };
}

export function addMonitorClose() {
  return (dispatch) => {
    dispatch({ type: types.MONITOR_ADD_CLOSE });
  };
}

export function addMonitorOpen() {
  return (dispatch) => {
    dispatch({ type: types.MONITOR_ADD_OPEN });
  };
}

export function removeMonitorClose() {
  return (dispatch) => {
    dispatch({ type: types.MONITOR_REMOVE_CLOSE });
  };
}

export function removeMonitorOpen(item) {
  return (dispatch) => {
    dispatch({ type: types.MONITOR_REMOVE_OPEN, data: item });
  };
}

export function removeMonitor(monitorId) {
  return (dispatch) => {
    dispatch({ type: types.MONITOR_REMOVE_LOADING });

    const url = 'monitors';

    axios.delete(`${config.apiURL}/${url}/${monitorId}`).then(() => {
      dispatch({ type: types.MONITOR_REMOVE_FULFILLED, data: { removedMonitorId: monitorId } });
    }).catch((e) => {
      dispatch({ type: types.MONITOR_REMOVE_REJECTED });
    });
  };
}
