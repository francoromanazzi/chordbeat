import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import playlistReducer from './playlistReducer';
import songReducer from './songReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  playlists: playlistReducer,
  song: songReducer
});
