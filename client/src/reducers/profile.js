import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  EDIT_PROFILE,
  GET_PROFILES,
  DELETE_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case EDIT_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case DELETE_PROFILE:
      return {
        ...state,
        profiles: state.profiles.filter((profile) => profile._id !== payload),
        loading: false
      };
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}
