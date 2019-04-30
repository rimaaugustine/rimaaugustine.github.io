import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withRouter } from 'react-router-dom';
//redux
import compose from 'recompose/compose';
import { connect } from "react-redux";
import {resetScore} from "../../actions/quizAction";

import { NavLink } from 'react-router-dom';



const styles = {
  root: {
    flexGrow: 1
  },
  bar: {
    backgroundColor: '#7f0000'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 20,
    color: 'white'
  }
};
class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      openDialog: false,
    }
  }
  
  handleClose = () => {
    this.setState({ openDialog: false });
  };
  
  handleCloseYes = () => {
    this.setState({ openDialog: false });
    this.props.history.push("/")
    this.props.resetScore()
  };
  
  handleBackHome = () => {
    if(this.props.counter >0){
      this.setState({ openDialog: true})
    }else{
      this.props.history.push("/")
    }
  }
 
  render(){

 
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position='static'>
        <Toolbar variant='dense'>
            <IconButton
              className={classes.menuButton}
              color='inherit'
              aria-label='Menu'
              onClick={this.handleBackHome}
            >
              <MenuIcon  />
            </IconButton>
      
          <Typography variant='h6' color='inherit' className={classes.grow}>
            Nusantara-Quiz
          </Typography>
            <Button component={NavLink} to="/about" color='inherit'>About</Button>
        </Toolbar>
      </AppBar>
      <Dialog open={this.state.openDialog} 
        onClose={this.handleClose} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"  >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Your state of quiz will be restart.  Are you sure to quit?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseYes} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}
}


Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  resetScore: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  //from ../reducers/index
  counter: state.data.counter,
  
}); 


export default compose(
  withStyles(styles),
  connect(mapStateToProps, { resetScore }),(withRouter)
)(Navbar);

