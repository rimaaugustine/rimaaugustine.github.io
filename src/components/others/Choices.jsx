import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

class Choices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      userAnswered : this.props.isanswered
    };
  }

  onHover = (e) => {
    e.preventDefault();
    this.setState({ hover: true });
  };

  onLeave = (e) => {
    e.preventDefault();
    this.setState({ hover: false });
  
  };
  render() {
    const {isanswered} = this.props;
    return (
     
      <div>
        {isanswered === "false"?  <Paper
       {...this.props}
       onMouseOver={this.onHover}
       onMouseOut={this.onLeave}
       className={this.state.hover ? this.props.paperclasshov: this.props.paperclass} 
     >
       {this.props.children}
     </Paper>
     : <Paper
     {...this.props}
     onMouseOver={this.onHover}
     onMouseOut={this.onLeave}
     className={ this.props.paperclass} 
   >
     {this.props.children}
   </Paper>
    }
      
       
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  //from ../reducers/index
  isanswered: (state.data.isAnswered).toString()
});


export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {}
  )
)(Choices);


