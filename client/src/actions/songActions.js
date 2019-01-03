import axios from 'axios';
import googleApiKey from '../keys';
import {
  GET_ERRORS,
  GET_SONG,
  SONG_LOADING,
  CLEAR_ERRORS,
  CLEAR_SONG
} from '../actions/types';
var ytSearch = require('youtube-search');

// Search a song
export const searchSong = search => dispatch => {
  dispatch(clearErrors());
  dispatch(setSongLoading());

  // Temporarily remove default header auth from axios request if it exists (youtube rejects it)
  let authHeaderBackup = null;
  if (axios.defaults.headers.common['Authorization']) {
    authHeaderBackup = axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['Authorization'];
  }

  const youtubeRes = ytSearch(search, {
    key: googleApiKey,
    maxResults: 1,
    type: 'video'
  });

  const ugRes = axios.post('/api/songs', { search });

  Promise.all([youtubeRes, ugRes])
    .then(res => {
      // Put back the default auth header if it was removed before
      if (authHeaderBackup !== null)
        axios.defaults.headers.common['Authorization'] = authHeaderBackup;

      dispatch({
        type: GET_SONG,
        payload: {
          ytID: res[0].results[0].id,
          tab: res[1].data
        }
      });
    })
    .catch(err => {
      // Put back the default auth header if it was removed before
      if (authHeaderBackup !== null)
        axios.defaults.headers.common['Authorization'] = authHeaderBackup;

      dispatch({
        type: GET_ERRORS,
        payload: { error: err.response.data }
      });
    });
};

// Set loading state
export const setSongLoading = () => {
  return {
    type: SONG_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Clear song tab
export const clearSong = () => {
  return {
    type: CLEAR_SONG
  };
};
