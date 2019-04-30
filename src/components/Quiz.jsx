import React, { Component } from 'react';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
import {
  fetchQuiz,
  getPrevQuestions,
  getNextQuestion
} from '../actions/quizAction';
//components
import QuizAnswer from './QuizAnswer';
import StatusQuiz from './StatusQuiz';
import FinalPage from './FinalPage';
import Loading from './others/loading';


class Quiz extends Component {

  componentDidMount() {
    //invoke the fetch API action 
    this.props.fetchQuiz();
  }
    //function for shuffling the choices
  shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  //after user answer, question move to prevQuestions
  oldQuestionsArray = () => {
    const { currentQuestion } = this.props;
    this.props.getPrevQuestions(currentQuestion);
  };

  render() {
    const { isFetching, currentQuestion, counter } = this.props;
    //mapping data from API object
    let mapQuestion;
    let mapChoices;
    let mapAnswer;
    let imageUrl;
    let imageTitle;
      if (currentQuestion.fields) {
          mapQuestion = currentQuestion.fields.question 
          mapAnswer = currentQuestion.fields.answer
          mapChoices =  this.shuffle(currentQuestion.fields.choices)
          imageUrl = currentQuestion.fields.imageQuestion.fields.file.url
          imageTitle = currentQuestion.fields.imageQuestion.fields.file.title
      } else {
      return <Loading/>
      }
   
    return (
      <div>
         {isFetching? (
          <Loading/>
          ) : (
          <React.Fragment>
            {counter <= 9  ? (
               <React.Fragment>
              <div style={{ margin: 20 }}>
                <QuizAnswer
                  question={mapQuestion}
                  choices={mapChoices}
                  answer={mapAnswer}
                  imageTitle={imageTitle}
                  imageUrl={imageUrl}
                />
            </div>
            <StatusQuiz  />
            </React.Fragment>
            ) : (
              <FinalPage/>
            )}
         </React.Fragment>
        )}
     
      </div>
    );
  }
}

Quiz.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  currentQuestion: PropTypes.object.isRequired,
  counter: PropTypes.number.isRequired,
};


const mapStateToProps = (state) => ({
  //from ../reducers/index
  isFetching: state.data.isFetching,
  currentQuestion: state.data.currentQuestion,
  counter: state.data.counter,
 
});

export default connect(
  mapStateToProps,
  { fetchQuiz, getPrevQuestions, getNextQuestion }
)(Quiz);
