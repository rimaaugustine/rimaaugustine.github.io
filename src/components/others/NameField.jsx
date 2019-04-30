import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import red from '@material-ui/core/colors/red';

import { withRouter } from 'react-router-dom';
//redux
import compose from 'recompose/compose';
import { connect } from "react-redux";
import { addUsername } from "../../actions/quizAction";

const styles = (theme) => ({
  container: {
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    color: '#fff'
  },
  button:{
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[700],
    '&:hover': {
      backgroundColor: red[500],
    },
  }
});

class NameField extends Component {
  constructor(props){
    super(props);
    this.state={
      name: ""
    }
  }

  handleChange = (event) => {
   const value = event.target.value
   this.setState({name: value})
 
  };

  handleSubmit=(event)=> {
    event.preventDefault();
    this.props.addUsername(this.state.name)
    this.props.history.push("/nusantara-quiz/quiz")
  }

  render() {
   const {name} = this.state
    const { classes } = this.props;
    return (
      <div>
        <form method="POST" onSubmit={this.handleSubmit}>
        <TextField
          id='outlined-textarea'
          label='Fill your name'
          placeholder='username'
          error
          className={classes.textField}
          margin='normal'
          variant='outlined'
          value={this.state.name}
          onChange={this.handleChange}
        />
        <div>
          {name.length === 0 ?
             <Button
             variant='contained'
             color='inherit'
             type="submit"
             value="submit"
             className={classNames(classes.button)}
             size="large"
             disabled
           >
             Ready for Quiz??
           </Button>:
            <Button
            variant='contained'
            color='inherit'
            type="submit"
            value="submit"
            className={classNames(classes.button)}
            size="large"
        
          >
            Ready for Quiz??
          </Button>
          }
         
        </div>
        </form>
      </div>
    );
  }
}

NameField.propTypes = {
  classes: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
};


const mapStateToProps = state => ({
  //from ../reducers/index
  username: state.data.username,
  
}); 


export default compose(
  withStyles(styles),
  connect(mapStateToProps, { addUsername }),(withRouter)
)(NameField);


