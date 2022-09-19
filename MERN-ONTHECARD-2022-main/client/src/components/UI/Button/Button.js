import React, { Component } from "react";
import "./Button.css";

class Button extends Component {
  render() {
    return (
      <a
        href={this.props.path}
        className={this.props.styling}
        onClick={this.props.clicked}
      >
        {this.props.buttonText}
      </a>
    );
  }
}

export default Button;
