import { combineReducers } from 'redux'
import diaryReducer from './diaryReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'

export default combineReducers({
  diary: diaryReducer,
  error: errorReducer,
  auth: authReducer
})
