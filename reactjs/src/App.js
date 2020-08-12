import React, { Component } from 'react';
import logo from './logo.svg';
import * as ChatComps from './ChatComps.js';
import './App.css';

const url = "https://clay.tsay.us:3000/api";

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
