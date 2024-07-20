import {
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'

export const adminUserLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {  }
    case USER_LOGIN_SUCCESS:
      return {  userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const adminUserRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {}
    case USER_REGISTER_SUCCESS:
      return { userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const createUserReducer = (state={},action) =>{
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {}
    case CREATE_USER_SUCCESS:
      return { userDetails: action.payload ,error:false }
    case CREATE_USER_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const getUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { loading: true };
    case GET_USER_SUCCESS:
      return { loading: false, userDetails: action.payload };
    case GET_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { loading: true, users: [] };
    case GET_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case GET_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { loading: true };
    case UPDATE_USER_SUCCESS:
      return { loading: false, userDetails: action.payload };
    case UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true };
    case DELETE_USER_SUCCESS:
      return { loading: false, success: true };
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
