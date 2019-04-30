
import * as contentful from 'contentful'

var client = contentful.createClient({
  space: '381el0fe1wnr',
  accessToken: '79049fa3e3330fdad5efc9cfaa8108947ba665833011e56217e3d9c44882bf74' })

export const ADD_USERNAME = 'ADD_USERNAME';
export const ADD_SCORE = 'ADD_SCORE';
export const RESET_SCORE = 'RESET_SCORE';
export const GET_NEXT_QUESTION = 'GET_NEXT_QUESTION';
export const GET_OLD_QUESTIONS = 'GET_OLD_QUESTIONS';
export const FETCH_QUIZ_REQUEST = 'FETCH_QUIZ_REQUEST';
export const FETCH_QUIZ_SUCCESS = 'FETCH_QUIZ_SUCCESS';
export const FETCH_QUIZ_FAILURE = 'FETCH_QUIZ_FAILURE';
export const ANSWER_STATUS = 'ANSWER_STATUS'

export const addUsername = (username) => (dispatch) => {
  dispatch({
    type: ADD_USERNAME,
    username
  });
};

export const addScore = (score) => (dispatch) => {
  dispatch({
    type: ADD_SCORE,
    score
  });
};


export const resetScore = () => (dispatch) => {
  dispatch({
    type: RESET_SCORE,
  });
};

export const getPrevQuestions = (questions) => (dispatch) => {
  dispatch({
    type: GET_OLD_QUESTIONS,
    payload: questions
  })
} 

export const getNextQuestion = (object) => (dispatch) => {
  let random
  if(object.length !== 0){
     random = object[Math.floor(Math.random() * object.length)];
  }else{
    random = {}
  }
  dispatch({
    type: GET_NEXT_QUESTION,
    payload: object,
    payload1: random

  });
}

export const fetchQuiz = () =>  (dispatch) => {
  dispatch({type: FETCH_QUIZ_REQUEST});
  return  client.getEntries().then(entries => {
      const entriesItems = entries.items
      const random = entriesItems[Math.floor(Math.random() * entriesItems.length)];
      const randomId = random.sys.id
      const entryFiltered = entriesItems.filter(entry => entry.sys.id !== randomId)
     
      dispatch({
              type: FETCH_QUIZ_SUCCESS,
              payload: entryFiltered,
              payload1: random
            })
    })
    .catch(error => {
      dispatch({type: FETCH_QUIZ_FAILURE, payload: error})
    console.error('error fetch the content', error)
  })
};


export const answerStatus = () => (dispatch) => {
  dispatch({
    type: ANSWER_STATUS,
  });
};
