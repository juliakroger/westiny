import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function appReducer(state = initialState.app, action) {
  switch (action.type) {
    case types.APP_OPEN_MODAL:
      return { ...state, privateKeyCopied: false, modals: { ...initialState.app.modals, [action.data]: { opened: true } } };
    case types.APP_CLOSE_MODAL:
      return { ...state, modals: { ...state.modals, [action.data]: { opened: false } } };
    case types.APP_PRIVATE_KEY_COPIED:
      return { ...state, privateKeyCopied: true };
    default:
      return state;
  }
}
