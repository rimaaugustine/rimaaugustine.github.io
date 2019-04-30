import React, { Component } from 'react';
import '../styles/App.css';
import IndonesiaFlag from './others/IndonesiaFlag'
import NameField from './others/NameField'

export default class OpeningPage extends Component {
  render() {
    return (
      <div>
        <header className='App-header'>
          <IndonesiaFlag/>
          <br/>
          <p>
           Welcome to Nusantara Quiz
          </p>
          <NameField/>
        </header>
      </div>
    );
  }
}
