import axios from 'axios'
import { GET_DIARIES, DELETE_DIARY, DIARIES_LOADING, GET_DIARY } from './types'
import { getDiariesURL, getDiaryURL, deleteDiariesURL } from '../constants'
import { tokenHeader } from './authActions'
import { returnErrors } from './errorActions'

export const getDiaries = () => (dispatch, getState) => {
  dispatch(setDiariesLoading())
  axios
    .get(getDiariesURL, tokenHeader(getState))
    .then(res =>
      dispatch({
        type: GET_DIARIES,
        payload: res.data
      })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const getDiary = id => (dispatch, getState) => {
  dispatch(setDiariesLoading())
  axios
    .get(getDiaryURL(id), tokenHeader(getState))
    .then(res =>
      dispatch({
        type: GET_DIARY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
}

export const deleteDiary = (id, history) => (dispatch, getState) => {
  axios.delete(deleteDiariesURL(id), tokenHeader(getState))
    .then(res => {
      dispatch({
        type: DELETE_DIARY,
        payload: id
      })
      history.push('/')
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setDiariesLoading = () => {
  return {
    type: DIARIES_LOADING
  }
}
