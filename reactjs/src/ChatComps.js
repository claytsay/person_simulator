import React, { Component } from 'react';
import makeRequest from "./Utils.js";

// = = = = = = = = = = = = =
// Constants
// = = = = = = = = = = = = =

// java.lang.NullPointerException;


// = = = = = = = = = = = = =
// React Components
// = = = = = = = = = = = = =

export const TextCard = (props) => {
  return (
    <div className={"TextCard " + props.type}>
      <div className="Name">
        <b>{props.name}</b>
      </div>
      <div className="Content">
        {props.content.map((text) => {
          return (<p className="Text">{text}</p>)
        })}
      </div>
    </div>
  );
}

export class ChatBox extends Component {
  state = {
    cards: [],
    names: [],
    name: "",
    text: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.state.cards.push({
      name: "User",
      type: "Client",
      content: [this.state.text]
    });
    //document.getElementById("ChatForm").reset(); // TODO: This doesn't work.
    this.setState({
      text: ""
    });
    let data = {
      "name": this.state.name,
      "text": this.state.text
    };

    makeRequest(this.props.url, "POST", data, (responseText) => {
      let response = JSON.parse(responseText);
      this.state.cards.push({
        name: response.name,
        type: "Server",
        content: response.result
      });
      this.setState(this.state);
    });
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value
    });
  }

  render() {
    return (
      <div className="ChatBox">
        <div className="TextCardList">
          {this.state.cards.slice(-6).map((card) => <TextCard {...card} />)}
        </div>
        <form id="ChatForm" onSubmit={this.handleSubmit}>
          <select
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
            required
          >
            {this.props.names.map((name) =>
              <option value={name}>
                {name}
              </option>
            )}
          </select>
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleTextChange}
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}



