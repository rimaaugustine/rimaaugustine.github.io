import { combineReducers } from 'redux'
import quizReducer from './quizReducer'


export default combineReducers({
  data: quizReducer
});
