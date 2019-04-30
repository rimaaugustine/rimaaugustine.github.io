import {
  ADD_USERNAME,
  GET_OLD_QUESTIONS,
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ_FAILURE,
  ADD_SCORE,
  RESET_SCORE,
  GET_NEXT_QUESTION,
  ANSWER_STATUS,
} from '../actions/quizAction';

const initialState = {
  username: '',
  questionEntries: [],
  prevQuestions: [],
  currentQuestion: {},
  isAnswered: false,
  score: 0,
  counter: 0,
  isFetching: false,
  error: false,
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USERNAME:
      return {
        ...state,
        username: action.username
      };
    case FETCH_QUIZ_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        isFetching: false, 
        questionEntries: action.payload,
        currentQuestion: action.payload1,
        prevQuestions:  [...state.prevQuestions, action.payload1]
      }; 
    case FETCH_QUIZ_FAILURE:
      return {
        ...state,
        isFetching: false, 
        error: true
      }; 
    case GET_NEXT_QUESTION:
      return {
        ...state,
        questionEntries:  action.payload,
        currentQuestion: action.payload1,
        counter: state.counter + 1, 
        isAnswered: false
      };   
    case GET_OLD_QUESTIONS:
      return {
        ...state,
        prevQuestions:   [...state.prevQuestions, action.payload]
      }; 
    case ADD_SCORE:
      return {
        ...state,
        score: state.score + action.score,

      }; 
    case RESET_SCORE:
      return {
        ...state,
        score: 0,
        counter: 0,
        questionEntries: [],
        currentQuestion: {},
        prevQuestions: [],
        username: '',
      }; 
    case ANSWER_STATUS:
    return {
      ...state, 
      isAnswered :true
    }
    default:
      return state;
  }
}
