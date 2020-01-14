import { combineReducers } from 'redux'
import diaryReducer from './diaryReducer'

export default combineReducers({
    diary: diaryReducer
})