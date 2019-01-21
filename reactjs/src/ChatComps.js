import React, {Component} from 'react';
import makeRequest from "./Utils.js";


// = = = = = = = = = = = = =
// React Components
// = = = = = = = = = = = = =

/**
 * Renders a text message and who sent it (if necessary).
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const TextCard = (props) => {
  return (
    <div
      className={"text-card " + (props.type === "server" ? "server" : "client")}
    >
      {props.type === "server" && <div className="name">{props.name}</div>}
      <div className="content">
        <table style={{width: 100 + "%"}}>
          {props.content.map((text) => {
            return (<tr>
              <div className="text">{text}</div>
            </tr>)
          })}
        </table>
      </div>
    </div>
  );
};

/**
 * TODO: Write this.
 */
class ChatForm extends Component {
  state = {
    name: "",
    text: ""
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value
    });
  };

  render() {
    return (
      <div className="chat-form">
        <form onSubmit={this.handleSubmit}>
          <select
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

/**
 * TODO: Write this.
 */
export class ChatBox extends Component {
  state = {
    cards: [{
      name: "You",
      type: "client",
      content: [
        "I really like nitrogen.",
        "It's a cool element."
      ]
    },
      {
        name: "Someone Else",
        type: "server",
        content: [
          "Nitrogen is a really trash element."
        ]
      }],
    names: [],
    name: "",
    text: ""
  };

  onFormSubmit = (state) => {
    this.setState({
      name: state.name,
      text: state.text
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.state.cards.push({
      name: "User",
      type: "Client",
      content: [this.state.text]
    });
    this.setState({text: ""});

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
  };

  render() {
    return (
      <div className="chat-box">
        <table style={{width: 100 + "%"}}>
          {this.state.cards.slice(-6).map((card) =>
            <tr>
              <TextCard {...card} />
            </tr>
          )}
        </table>
        <ChatForm
          names={this.state.names}
          onSubmit={this.onFormSubmit}
        />
      </div>
    );
  }
}
