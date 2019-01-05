import isEmpty from '../validation/is-empty';

import {
  SET_CURRENT_USER,
  REMOVE_HEADER_TOKEN,
  PUT_HEADER_TOKEN
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  headerToken: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        headerToken: true
      };
    case REMOVE_HEADER_TOKEN:
      return {
        ...state,
        headerToken: false
      };
    case PUT_HEADER_TOKEN:
      return {
        ...state,
        headerToken: true
      };
    default:
      return state;
  }
}
