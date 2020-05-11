import { combineReducers } from 'redux';

import auth from './auth/reducer';
import playlist from './playlist/reducer';

export default combineReducers({ auth, playlist });
