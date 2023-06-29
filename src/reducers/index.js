import { combineReducers } from 'redux';
// import sessionReducer from './session';
import userReducer from './user';
import authReducer from './auth'
import {reducer as notificationsReducer} from 'reapop'
import redirectReducer from './redirect';
import loadingReducer from './loading';
import recaptchaReducer from './recaptcha';
import notificationReducer from './notification';
import blogReducer from './blogs';
import filefolderReducer from './filefolderReducer';
import templatesReducer from './templates';
import visitorReducer from './visitor';

const rootReducer = combineReducers({
  // sessionState: sessionReducer,
  userState: userReducer,
  authState: authReducer,
  notifications: notificationsReducer(),
  redirect : redirectReducer,
  loading: loadingReducer,
  recaptcha: recaptchaReducer,
  notification: notificationReducer,
  blogs: blogReducer,
  filefolders: filefolderReducer,
  templates: templatesReducer,
  visitors: visitorReducer,
});

export default rootReducer;
