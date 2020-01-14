import { GET_DIARIES, ADD_DIARY, DELETE_DIARY, DIARIES_LOADING } from '../actions/types'

const initialState = {
    diaries: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DIARIES:
            return {
                ...state,
                diaries: action.payload,
                loading: false
            }
        case DELETE_DIARY:
            return {
                ...state,
                diaries: state.diaries.filter(diary => diary._id !== action.payload)
            }
        case ADD_DIARY:
            return {
                ...state,
                diaries: [action.payload, ...state.diaries]
            }
        case DIARIES_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return {
                ...state
            }
    }
}