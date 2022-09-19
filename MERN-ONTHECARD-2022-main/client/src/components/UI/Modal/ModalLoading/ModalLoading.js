import React, { Component } from "react";
import classes from "./ModalLoading.module.css";

import { connect } from "react-redux";
import * as actionTypes from "../../../../store/actionTypes";

import Spinner from '../../Spinner/Spinner'; 

import {Vietnamese, English} from '../../../../language/language'; 

class Modal extends Component {
  state = {
    accountType: null,
    url: null,
    languageEN: English, 
    languageVN: Vietnamese, 
  };

  render() {
    const cssClasses = [
      classes.Modal,
      this.props.show ? classes.ModalOpen : classes.ModalClosed,
    ];

    const enterText = this.props.languageChosen === "ENGLISH" ? this.state.languageEN : this.state.languageVN;

    return (
      <div className={cssClasses.join(" ")}>
        <p className={classes.closeButton} onClick={this.props.closed}>
          x
        </p>
        <Spinner />
        <h3 className={classes.waitingText}>
          {enterText.editPage.modal.loading}
        </h3>
        <p className={classes.normalText}>
            <span className={classes.spanText}>
                {enterText.editPage.modal.hint}
            </span >: {enterText.editPage.modal.hintText1} 
            <span className={classes.spanText}>
                {enterText.editPage.button.updateButton}
            </span> {enterText.editPage.modal.hintText2}
        </p>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languageChosen: state.appLanguage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // This is unused
    logOutResetStore: () => dispatch({ type: actionTypes.LOGOUT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
