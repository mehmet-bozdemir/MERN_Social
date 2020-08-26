import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  EDIT_PROFILE,
  CLEAR_PROFILE,
  DELETE_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create profile
export const createProfile = (fd, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    const res = await axios.post("/api/profile", fd, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Edit profile
export const editProfile = (fd, history, edit = true) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    const res = await axios.put("/api/profile", fd, config);

    dispatch({
      type: EDIT_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete profile
export const deleteProfile = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/profile/${id}`);

    dispatch({
      type: DELETE_PROFILE,
      payload: id
    });

    dispatch(setAlert("Profiled Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Follow user
export const followUser = (followId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/follow/${followId}`);

    dispatch({
      type: FOLLOW_USER,
      payload: res.data
    });

    dispatch(setAlert("Following user", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Unfollow user
export const unfollowUser = (unfollowId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/unfollow/${unfollowId}`);

    dispatch({
      type: UNFOLLOW_USER,
      payload: res.data
    });

    dispatch(setAlert("Unfollowing user", "danger"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
