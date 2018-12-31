import axios from 'axios';
import {
  CLEAR_ERRORS,
  CLEAR_CURRENT_PLAYLISTS,
  PLAYLISTS_LOADING,
  GET_ERRORS,
  GET_PLAYLISTS
} from '../actions/types';

// Search a song
export const getPlaylists = () => dispatch => {
  dispatch(clearErrors());
  dispatch(setPlaylistsLoading());

  axios
    .get('/api/playlists')
    .then(res => {
      dispatch({
        type: GET_PLAYLISTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { error: err.response.data }
      })
    );
};

// Set loading state
export const setPlaylistsLoading = () => {
  return {
    type: PLAYLISTS_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Clear playlists from current user
export const clearCurrentPlaylists = () => {
  return {
    type: CLEAR_CURRENT_PLAYLISTS
  };
};
