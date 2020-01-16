import {
  GET_DIARIES,
  GET_DIARY,
  ADD_DIARY,
  UPDATE_DIARY,
  DELETE_DIARY,
  DIARIES_LOADING
} from "../actions/types";

const initialState = {
  diaries: [],
  diary: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DIARIES:
      return {
        ...state,
        diaries: action.payload,
        loading: false
      };
    case DELETE_DIARY:
      return {
        ...state,
        diaries: state.diaries.filter(diary => diary._id !== action.payload)
      };
    case ADD_DIARY:
    case UPDATE_DIARY:
      return {
        ...state,
        diaries: [action.payload, ...state.diaries]
      };
    case DIARIES_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_DIARY:
      return {
        ...state,
        diary: action.payload,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
}
