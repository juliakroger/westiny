import { combineReducers } from 'redux';
import monitor from './monitorReducer';
import coin from './coinReducer';
import upcoming from './upcomingReducer';
import alert from './alertReducer';
import auth from './authReducer';
import app from './appReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  app,
  auth,
  alert,
  coin,
  upcoming,
  monitor,
  routing: routerReducer,
});

export default rootReducer;
