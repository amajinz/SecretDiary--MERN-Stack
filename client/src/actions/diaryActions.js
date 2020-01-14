import axios from 'axios'
import { GET_DIARIES, DELETE_DIARY, DIARIES_LOADING } from './types'
import { getDiariesURL, deleteDiariesURL } from '../constants'

export const getDiaries = () => dispatch => {
    dispatch(setDiariesLoading())
    axios
        .get(getDiariesURL)
        .then(res =>
            dispatch({
                type: GET_DIARIES,
                payload: res.data
            })
        )
}

export const deleteDiary = id => dispatch => {
    axios.delete(deleteDiariesURL(id))
        .then(res => dispatch({
            type: DELETE_DIARY,
            payload: id
        }))
}

export const setDiariesLoading = () => {
    return {
        type: DIARIES_LOADING
    }
}