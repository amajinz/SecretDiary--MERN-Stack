import axios from 'axios'
import { returnErrors } from '../actions/errorActions'
import { getDiaries } from '../actions/diaryActions'
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from './types'
import { authenticationURL, signupURL, loginURL } from '../constants'

export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING })

  axios
    .get(authenticationURL, tokenHeader(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: AUTH_ERROR
      })
    })
}

// Register User
export const signup = ({
  name,
  email,
  password,
  passwordConfirmation
}) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ name, email, password, passwordConfirmation })
  axios
    .post(signupURL, body, config)
    .then(res =>
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'SIGNUP_FAIL')
      )
      dispatch({
        type: SIGNUP_FAIL
      })
    })
}

// Login User
export const login = ({ email, password }, history) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ email, password })
  axios
    .post(loginURL, body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      dispatch(getDiaries())
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      )
      dispatch({
        type: LOGIN_FAIL
      })
    })
}
// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const tokenHeader = getState => {
  // Get token from localstorage
  const token = getState().auth.token

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token
  }

  return config
}
