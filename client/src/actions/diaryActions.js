import axios from 'axios'
import { GET_DIARIES, DELETE_DIARY, DIARIES_LOADING } from './types'
import { getDiariesURL, deleteDiariesURL } from '../constants'
import { tokenHeader as tokenHeader } from './authActions'
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

export const deleteDiary = id => (dispatch, getState) => {
    axios.delete(deleteDiariesURL(id), tokenHeader(getState))
        .then(res => dispatch({
            type: DELETE_DIARY,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))

}

export const setDiariesLoading = () => {
    return {
        type: DIARIES_LOADING
    }
}