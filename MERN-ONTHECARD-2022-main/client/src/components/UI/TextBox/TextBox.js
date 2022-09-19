import React, { Component } from "react";
import classes from "./TextBox.module.css";

class TextBox extends Component {
  state = {
    divClasses: [classes.inputDiv],
    inputEntered: false,
    textHolderSet: false,
    inputValue: null,
    focused: false,
    error: false,
    textboxName: this.props.textboxName,
    showPwd: false,
    inputType: this.props.inputType,
  };

  componentDidMount() {
    if (this.props.textHolder) {
      this.setState({
        divClasses: [classes.inputDiv, classes.focus],
        focused: true,
        textHolderSet: true,
      });
    }
  }

  addcl = () => {
    this.setState({
      divClasses: [classes.inputDiv, classes.focus],
      focused: true,
    });
  };

  remcl = () => {
    if (!this.state.inputEntered && !this.state.textHolderSet) {
      this.setState({
        divClasses: [classes.inputDiv],
        focused: false,
        textHolderSet: false,
        inputEntered: false,
      });
    }
  };

  showPassword = () => {
    this.setState({ showPwd: !this.state.showPwd }, () => {
      if (this.state.showPwd) {
        this.setState({ inputType: "text" });
      } else {
        this.setState({ inputType: "password" });
      }
    });
  };

  render() {
    let eyeicon = null;
    if (this.props.inputType === "password") {
      eyeicon = <i className="far fa-eye"></i>;
    }

    if (this.state.showPwd) {
      eyeicon = <i className="fas fa-eye-slash"></i>;
    }
    return (
      <div className={this.state.divClasses.join(" ")}>
        <div className={classes.i}>
          <i className={this.props.iconClasses}></i>
        </div>
        <div className={classes.div}>
          <h5>{this.props.textboxName}</h5>
          <input
            required
            type={this.state.inputType}
            placeholder={this.props.textHolder}
            className={classes.input}
            onFocus={this.addcl}
            onBlur={this.remcl}
            onChange={(event) => {
              this.props.changed(event);
              if (event.target.value.length > 0) {
                this.setState({
                  inputEntered: true,
                  inputValue: event.target.value,
                });
              } else if (
                this.state.inputEntered &&
                event.target.value.length === 0
              ) {
                this.setState({ inputEntered: false });
              }
            }}
          />

          {this.props.error !== null && !this.state.focused ? (
            <span className={classes.errorSpan}>{this.props.error}</span>
          ) : null}

          {this.props.error !== null &&
          this.props.error !== "*Field Required !" ? (
            <span className={classes.errorSpan}>{this.props.error}</span>
          ) : null}

          <div className={classes.eyeIcon} onClick={this.showPassword}>
            {eyeicon}
          </div>
        </div>
      </div>
    );
  }
}

export default TextBox;

// {this.props.error}
