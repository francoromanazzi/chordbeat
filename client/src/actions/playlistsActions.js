import axios from 'axios';
import {
  CLEAR_ERRORS,
  CLEAR_CURRENT_PLAYLISTS,
  PLAYLISTS_LOADING,
  PLAYLIST_LOADING,
  GET_ERRORS,
  GET_PLAYLISTS,
  GET_PLAYLIST
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

// Add song to playlist
export const addToPlaylist = (playlistID, song) => dispatch => {
  const newSong = {
    title: song.tab.name,
    artist: song.tab.artist,
    yt: song.ytID,
    tab: song.tab.url
  };

  axios
    .post(`/api/playlists/${playlistID}`, { newSong })
    .then(res => {
      dispatch(getPlaylists());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { error: err.response.data }
      })
    );
};

// Create a new playlist
export const createPlaylist = (newPlaylist, history) => dispatch => {
  const { title, description, songs } = newPlaylist;
  axios
    .post('/api/playlists', { title, description })
    .then(res => {
      // Add all the songs into the new empty playlist
      const songPromises = songs.map(song =>
        axios.post(`/api/playlists/${res.data._id}`, {
          newSong: { title: song.title, artist: song.artist }
        })
      );

      Promise.all(songPromises)
        .then(res => {
          dispatch(getPlaylists());
          history.push('/playlists');
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: { error: err.response.data }
          })
        );
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: { error: err.response.data }
      });
    });
};

// Delete playlist
export const deletePlaylist = playlistID => dispatch => {
  axios
    .delete(`/api/playlists/${playlistID}`)
    .then(res => dispatch(getPlaylists()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { error: err.response.data }
      })
    );
};

// Get a single playlist
export const getPlaylist = playlistID => dispatch => {
  dispatch(setPlaylistLoading());
  axios
    .get(`/api/playlists/${playlistID}`)
    .then(res => dispatch({ type: GET_PLAYLIST, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { error: err.response.data }
      })
    );
};

// Edit playlist
export const editPlaylist = (playlist, history) => dispatch => {
  dispatch(setPlaylistLoading());
  const updatePlaylistInfo = axios.put(`/api/playlists/${playlist._id}`, {
    title: playlist.title,
    description: playlist.description
  });
  const removeAllSongsAndAddNew = axios
    .delete(`/api/playlists/${playlist._id}/songs`)
    .then(() => {
      const addSongs = playlist.songs.map(song =>
        axios.post(`/api/playlists/${playlist._id}`, { newSong: song })
      );
      Promise.all(addSongs);
    });

  Promise.all([updatePlaylistInfo, removeAllSongsAndAddNew])
    .then(res => {
      dispatch(getPlaylists());
      history.push('/playlists');
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

// Set loading state
export const setPlaylistLoading = () => {
  return {
    type: PLAYLIST_LOADING
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
