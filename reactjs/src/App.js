import React, { Component } from 'react';
import logo from './logo.svg';
import * as ChatComps from './ChatComps.js';
import './App.css';

const url = "http://ct3m.asuscomm.com/person_simulator/api";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>person_simulator</h1>
          <p>An app designed to simulate people.</p>
        </header>
        <ChatComps.ChatBox url={url}/>
      </div>
    );
  }
}

export default App;
