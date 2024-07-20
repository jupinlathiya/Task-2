import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_USERS_SUCCESS,
  GET_USERS_REQUEST,
  GET_USERS_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../constants/userConstants";
import axios from "axios";

export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });

    const config = {
        header: {
          headers: {
            "Content-type": "application/json",
          },
        },
      };
    const { data } = await axios.get("http://localhost:5000/api/user");

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchUserDetails = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const config = {
      header: {
        headers: {
          "Content-type": "application/json",
        },
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/user/${userId}`
    );

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_USER_REQUEST });

    const config = {
        header: {
          headers: {
            "Content-type": "application/json",
          },
        },
      };
    const { data } = await axios.post("http://localhost:5000/api/user/", userData);

    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
        header: {
          headers: {
            "Content-type": "application/json",
          },
        },
      };
    const { data } = await axios.patch(`http://localhost:5000/api/user/${userId}`, userData);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const config = {
        header: {
          headers: {
            "Content-type": "application/json",
          },
        },
      };
    await axios.delete(`http://localhost:5000/api/user/${userId}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
