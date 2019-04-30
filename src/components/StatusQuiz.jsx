import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import Fab from '@material-ui/core/Fab';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';

//redux
import { connect } from "react-redux";
import {
  getNextQuestion,
} from '../actions/quizAction';
import compose from 'recompose/compose';


const styles = (theme) => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing.unit * 2
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor:'#b53d2a'
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    right: 0,
    margin: '0 auto',
    backgroundColor:'#4e0000'
  }
});

class StatusQuiz extends Component {


  //move it to QUIZ
  compare = () => {
    const { questionEntries, prevQuestions, currentQuestion } = this.props;
    const oldQuestionsId = prevQuestions.map((question) => question.sys.id);
    const questionId = currentQuestion.sys.id;

    let quizFiltered;
    if (questionEntries.length !== 0) {
      quizFiltered = questionEntries.filter(
        (entry) =>
          !oldQuestionsId.includes(entry.sys.id) && entry.sys.id !== questionId
      );
    }
    return quizFiltered;
  };

  handleOnClick = () => {
    this.props.getNextQuestion(this.compare());

  }


  render() {
    
    const { classes, username, score, isAnswered} = this.props;
    
    return (
      <div>
        <AppBar position='fixed' color='primary' className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton color='inherit' aria-label='Open drawer'>
              <AccountCircle />
              <Typography variant='h6' color='inherit'>
                {username} -
              </Typography>
              <Typography variant='h6' color='inherit' style={{marginLeft:5}}>
                 score: {score}
              </Typography>
            </IconButton>{
              isAnswered?
              <Fab color="primary"  aria-label="Add" className={classes.fabButton} onClick={this.handleOnClick}>
              <ArrowForward  />
              </Fab>:
               <Fab color="primary" disabled aria-label="Add" className={classes.fabButton} onClick={this.handleOnClick}>
               <ArrowForward  />
               </Fab>
              }
           
           
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

StatusQuiz.propTypes = {
  classes: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
};


const mapStateToProps = state => ({
  //from ../reducers/index
  username: state.data.username, 
  score: state.data.score,
  counter: state.data.counter,
  questionEntries: state.data.questionEntries,
  prevQuestions: state.data.prevQuestions,
  currentQuestion: state.data.currentQuestion,
  isAnswered: state.data.isAnswered
}); 


export default compose(
  withStyles(styles),
  connect(mapStateToProps, {getNextQuestion})
)(StatusQuiz);





