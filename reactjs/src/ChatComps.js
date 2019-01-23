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
 * TODO: Write this.
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
    event.target.reset();
  };

  render() {
    return (
      <div className="chat-form">
        <form onSubmit={this.handleSubmit}>
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
    key: "",
  };

  onFormSubmit = (data) => {

    this.state.cards.push({
      name: "User",
      type: "client",
      content: [data.text]
    });
    this.setState({text: ""});

    let key = forge.util.hexToBytes(this.state.key);
    let iv = forge.random.getBytesSync(32);
    let cipher = forge.cipher.createCipher(algorithm, key);
    let cipherUtf8 = (plaintext) => {
      cipher.start({iv: iv});
      cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(plaintext)));
      cipher.finish();
      return cipher.output;
    };
    let dataEncrypt = {
      name: cipherUtf8(data.name),
      text: cipherUtf8(data.text),
      encryption: {
        algorithm: algorithm,
        iv: iv
      }
    };

    makeRequest(this.props.url, "POST", dataEncrypt, (responseText) => {
      let response = JSON.parse(responseText);

      let key = forge.util.hexToBytes(this.state.key);
      let iv = forge.random.getBytesSync(32);
      let decipher = forge.cipher.createDecipher(algorithm, key);
      let decipherUtf8 = (ciphertext) => {
        decipher.start({iv: iv});
        decipher.update(forge.util.createBuffer(ciphertext));
        decipher.finish();
        return forge.util.decodeUtf8(decipher.output);
      };

      this.state.cards.push({
        name: decipherUtf8(response.name),
        type: "server",
        content: decipherUtf8(response.response)
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
          <tr>
            <td>
              <label>Symmetric Key: </label>
              <input
                type={"text"}
                onChange={(event) => {
                  this.setState({privateKey: event.target.value});
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
