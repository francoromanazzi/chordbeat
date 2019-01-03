import { SONG_LOADING, GET_SONG, CLEAR_SONG } from '../actions/types';

const initialState = {
  song: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SONG_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SONG:
      return {
        ...state,
        song: action.payload,
        loading: false
      };
    case CLEAR_SONG:
      return {
        ...state,
        song: {}
      };
    default:
      return state;
  }
}
