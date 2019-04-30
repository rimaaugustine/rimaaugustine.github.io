import React, { Component } from 'react';
import PropTypes from 'prop-types';
//styles
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//redux
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { addScore, answerStatus } from '../actions/quizAction';
//component
import Choices from './others/Choices';
import {styles, ImageQuestion, textCounter} from '../styles/QuizAnswer.style'

class QuizAnswer extends Component {
constructor(props){
  super(props);
  this.state={
    userAnswer: ""
  }
}

//function to handle the answer after user click the choice
  onHandleAnswer = (e) => {
    if(!this.props.isAnswered){
        const answer = e.currentTarget.id;
        //to keep the answer in the state
        this.setState({
          userAnswer: e.currentTarget.id
        })
        //if correct
        if (answer === this.props.answer) {
          this.props.addScore(10);
          this.props.answerStatus();
        //if wrong
         } else {
          this.props.addScore(0);
          this.props.answerStatus();
      }
    }
  };
 

  render() {
    const { classes, choices, question, imageTitle, imageUrl, counter, isAnswered, answer } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            <p style={textCounter}>Question #{counter + 1}/10</p>
              <h2>{question}</h2>
              <ImageQuestion  src={imageUrl} alt={imageTitle} />
            </Paper>
          </Grid>
          {choices
            ? choices.map((choice, i) =>  {
              //different colors on choice button
              let styleChoice;
                if(isAnswered){
                  if(choice===answer){
                    styleChoice=classes.answeredColorCorr;
                  }else if(choice === this.state.userAnswer){
                    styleChoice=classes.answeredColorWrong;
                  }else{
                    styleChoice=classes.answeredColor;
                  }
                }else{
                  styleChoice=classes.paper;
                }
             return (
                <Grid key={i} item xs={12} sm={6}>
                  <Choices
                    onClick={this.onHandleAnswer}
                    paperclass={styleChoice}
                    paperclasshov={classes.paperHov}
                    id={choice}
                  >
                    {choice}
                  </Choices>
                </Grid>
              )
              })
            : []}
        </Grid>
        <br/>
      </div>
    );
  }
}

QuizAnswer.propTypes = {
  classes: PropTypes.object.isRequired,
  questionEntries: PropTypes.array.isRequired,
  currentQuestion: PropTypes.object.isRequired,
  prevQuestions: PropTypes.array.isRequired,
  counter: PropTypes.number.isRequired,
  isAnswered: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  //from ../reducers/index
  questionEntries: state.data.questionEntries,
  currentQuestion: state.data.currentQuestion,
  prevQuestions: state.data.prevQuestions,
  counter: state.data.counter,
  isAnswered: state.data.isAnswered
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addScore, answerStatus }
  )
)(QuizAnswer);
