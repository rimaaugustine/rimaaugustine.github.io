import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
//redux
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import {resetScore} from '../actions/quizAction'
import Emoji from 'react-emoji-render';

const styles = {
  root: {
    flexGrow: 1
  }
};

class FinalPage extends Component {
  render() {
    const { classes, score } = this.props;
    let finalScore;
    if(score < 50){
      finalScore = "bad";
    }else if(score >= 50){
      finalScore = "good"; 
    }else{
      finalScore = "best"; 
    }
    const NOTIFICATION_FINAL =
      {
      "bad": <h1><Emoji text="😢 Sorry! your score is not good" /></h1>,
      "good": <h1><Emoji text="Very good 😎! " /></h1>,
      "best": <h1><Emoji text="Bravo!! Best scores ever 🤩"/></h1>
    };
    
    return ( 
      <div>
        <header className='App-header'>
        {NOTIFICATION_FINAL[finalScore]}
          <code>you got the {score} scores</code>
          <br/>
          <Button
            variant='contained'
            color='secondary'
            className={classNames(classes.button)}
            size='large'
            component={NavLink}
            to='/nusantara-quiz'
            onClick={()=> this.props.resetScore()}
          >
            Try again?
          </Button>
        </header>
      </div>
    );
  }
}


FinalPage.propTypes = {
  score: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  //from ../reducers/index
  score: state.data.score
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {resetScore}
  )
)(FinalPage);
