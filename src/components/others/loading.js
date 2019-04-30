import React from 'react';
import '../../styles/App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function Loading(props) {
  const { classes } = props;
  return (
    <header className="App-header">
      <CircularProgress className={classes.progress} color="secondary" />
     
    </header>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);