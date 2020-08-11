import React, {Component} from 'react';
import makeRequest from "./Utils.js";
import * as Utils from "./Utils";


// = = = = = = = = = = = = =
// Chat Components
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
          <tbody>
          {props.content.map((text) => {
            return (
              <tr>
                <td>
                  <div className="text">{text}</div>
                </td>
              </tr>)
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * Renders a form in which a user can input
 */
class ChatForm extends Component {
  state = {
    name: "",
    names: [],
    text: ""
  };

  constructor(props) {
    super(props);
    Utils.makeRequest(this.props.url, "GET", "", (resultText) => {
      this.state.names.push(...JSON.parse(resultText));
      this.setState({
        name: this.state.names[0]
      });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
      name: this.state.name,
      text: this.state.text
    });
    this.setState({text: ""});
  };

  render() {
    return (
      <div className="chat-form">
        <form id="chat-form-form" onSubmit={this.handleSubmit}>
          <select
            value={this.state.name}
            onChange={(event) => {
              this.setState({name: event.target.value});
            }}
            required
          >
            {this.state.names.map((name) =>
              <option value={name}>
                {name}
              </option>
            )}
          </select>
          <input
            type="text"
            value={this.state.text}
            onChange={(event) => {
              this.setState({text: event.target.value});
            }}
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

/**
 * A React components that handles chat I/O with respect to the user.
 *
 * Provides a place for users to input and chat message and to see the output.
 */
export class ChatBox extends Component {
  state = {
    cards: [],
    names: [],
    key: "",
  };

  onFormSubmit = (data) => {
    this.state.cards.push({
      name: "User",
      type: "client",
      content: [data.text]
    });
    this.setState({text: ""});

    makeRequest(this.props.url, "POST", data, (responseText) => {
      let response = JSON.parse(responseText);
      this.state.cards.push({
        name: response.name,
        type: 'server',
        content: response.response
      });
      this.setState(this.state);
    });
  };

  render() {
    return (
      <div className="chat-box">
        <table style={{width: 100 + "%"}}>
          <tbody>
          {this.state.cards.slice(-6).map((card) =>
            <tr>
              <td>
                <TextCard {...card} />
              </td>
            </tr>
          )}
          </tbody>
        </table>
        <table style={{width: 100 + "%"}}>
          <tbody>
          <tr>
            <td>
              <ChatForm
                names={this.state.names}
                onSubmit={this.onFormSubmit}
                url={this.props.url}
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
