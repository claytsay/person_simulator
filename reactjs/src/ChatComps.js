import React, {Component} from 'react';
import makeRequest from "./Utils.js";
import * as Utils from "./Utils";
import forge from 'node-forge';


// = = = = = = = = = = = = =
// Constants
// = = = = = = = = = = = = =

const algorithm = "AES-CBC";


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
    this.state.text = "";
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
 * Also gives a place
 *
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

    let dataEncrypt = Utils.encryptData(data, this.state.key);

    makeRequest(this.props.url, "POST", dataEncrypt, (responseText) => {
      let response = JSON.parse(responseText);

      this.state.cards.push(Utils.decryptData(
        response,
        this.state.key,
        response.encryption.iv
      ));
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
          <tr>
            <td>
              <label>Symmetric Key: </label>
              <input
                type={"text"}
                onChange={(event) => {
                  this.setState({key: event.target.value});
                }}
                required
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
//<AuthForm onChange={(keys) => this.setState(keys)}/>


// = = = = = = = = = = = = =
// Authentication Components
// = = = = = = = = = = = = =

/**
 * A React component representing two boxes in which keys go in.
 *
 * TODO: Get this to work. It likely does not update its state correctly.
 * Has space for a public and private key.
 *
 * Props:
 *  - **onChange**: The "callback" function to be executed every time the text
 *  inside the input changes. The function should take one argument: an object
 *  with the public and private keys as string attributes.
*/
class AuthForm extends Component {
  state = {
    publicKey: "",
    privateKey: ""
  };

  handleChange = () => {
    this.props.onChange({
      publicKey: this.state.publicKey,
      privateKey: this.state.privateKey
    });
  };

  updatePk = (key) => {
    this.setState({
      publicKey: key
    });
    this.handleChange();
  };

  updateSk = (key) => {
    this.setState({
      privateKey: key
    });
    this.handleChange();
  };

  render() {
    let pkId = "outgoing-pk", skId = "incoming-sk";

    return (
      <div className={"auth-form"}>
        <table style={{width: 100 + "%"}}>
          <tbody>
          <tr>
            <td>
              <label>Outgoing encryption public key: </label>
              <input
                type={"text"}
                onChange={(event) => {
                  this.setState({publicKey: event.target.value});
                  this.handleChange()
                }}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Incoming decryption private key: </label>
              <input
                type={"text"}
                onChange={(event) => {
                this.setState({privateKey: event.target.value});
                this.handleChange()
              }}
                required
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


// = = = = = = = = = = = = =
// Miscellaneous
// = = = = = = = = = = = = =

/**
 * A React component representing a box in which to type stuff in.
 *
 * TODO: Update this to work. It may not update its state correctly.
 * Has the "required" tag on.
 *
 * Props:
 *  - **onChange**: The "callback" function to be executed every time the text
 *  inside the input changes. The function should take one argument: what is
 *  inside the input box.
 *  - **description**: The description that should be displayed as a label to
 *  the input box.
 */
class TextForm extends Component {
  state = {
    text: ""
  };

  handleChange = (event) => {
    this.setState({text: event.target.value});
    this.props.onChange(this.state.text);
  };

  render() {
    return (
      <div className={this.props.className}>
        <label>{this.props.description}</label>
        <input
          type={"text"}
          onChange={this.handleChange}
          onPaste={() => setTimeout(this.handleChange)}
          required
        />
      </div>
    );
  }

}
