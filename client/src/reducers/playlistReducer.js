import {
  PLAYLIST_LOADING,
  GET_PLAYLISTS,
  GET_PLAYLIST,
  ADD_PLAYLIST,
  DELETE_PLAYLIST,
  CLEAR_CURRENT_PLAYLISTS
} from '../actions/types';

const initialState = {
  playlists: [],
  playlist: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
        loading: false
      };
    case GET_PLAYLIST:
      return {
        ...state,
        playlist: action.payload,
        loading: false
      };
    case ADD_PLAYLIST:
      return {
        ...state,
        playlists: [action.payload, ...state.playlists]
      };
    case DELETE_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.filter(
          playlist => playlist._id !== action.payload
        )
      };
    case CLEAR_CURRENT_PLAYLISTS:
      return {
        ...state,
        playlist: {},
        playlists: {}
      };
    default:
      return state;
  }
}
