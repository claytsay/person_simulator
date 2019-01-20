import React, { Component } from 'react';
import logo from './logo.svg';
import * as AuthComp from './AuthComps.js';
import * as ChatComps from './ChatComps.js';
import * as Utils from './Utils.js';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.props.names = [];
    this.props.url = "http://127.1.0.0";
    Utils.makeRequest(this.props.url, "GET", "", (resultText) => {
      this.props.names.push(...JSON.parse(resultText));
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>person_simulator</h1>
          <p>An app designed to simulate people.</p>
        </header>
        <ChatComps.ChatBox
          names={this.props.names}
          url={this.props.url}
        />
      </div>
    );
  }

}

export default App;
