import React, { useState } from "react";
import { Colors } from "../../../utilities/colors";
import classes from "./Options.module.css";
import { useSelector, useDispatch } from "react-redux";
import { explanation, explainTitle } from "../../../utilities/settingsHelper";
import ConfirmModal from "../../../components/UI/Modal/ConfirmModal/ConfirmModal";
import BackDrop from "../../../components/UI/Backdrop/BackDropClose";
import ModalConfirm from "../../../components/UI/Modal/ModalConfirm/ModalConfirm";
import { activationActions } from "../../../api/api";
import * as actionTypes from "../../../store/actionTypes";

// Option in YourPage.js

const DeactivatePage = ({ openExplain }) => {
  const [openModal, setOpenModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const { userInfo, appLang, token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { inactive } = userInfo;
  const langModal = appLang.profile.modal;
  const langBtn = appLang.profile.button;
  let title, bgColor, btnText, modalTitle, modalExplanation;

  if (inactive) {
    title = appLang.settings.activation;
    bgColor = Colors.blue;
    btnText = appLang.settings.activate;
    modalTitle = explainTitle("pageActivate", appLang);
    modalExplanation = explanation("pageActivate", appLang);
  } else {
    title = appLang.settings.deActivation;
    bgColor = Colors.red;
    btnText = appLang.settings.deActivate;
    modalTitle = explainTitle("pageDeactivate", appLang);
    modalExplanation = explanation("pageDeactivate", appLang);
  }

  const lockAccount = () => {
    activationActions("deactivate", token);
    setConfirmed(true);
    setOpenModal(false);
    dispatch({ type: actionTypes.DEACTIVATE_PAGE });
  };

  const unlockAccount = () => {
    activationActions("activate", token);
    setConfirmed(true);
    setOpenModal(false);
    dispatch({ type: actionTypes.ACTIVATE_PAGE });
  };

  const closeModal = () => {
    setOpenModal(false);
    setConfirmed(false);
  };

  return (
    <div className={classes.option}>
      <p
        className={classes.optionTitle}
        onClick={() => openExplain(modalTitle, modalExplanation)}
      >
        {title}
        <i style={{ cursor: "pointer" }} className="far fa-question-circle"></i>
      </p>
      <div className={classes.holder}></div>
      <div
        style={{ backgroundColor: bgColor, color: Colors.white }}
        className={classes.optionButton}
        onClick={() => setOpenModal(true)}
      >
        {btnText}
      </div>
      {openModal && (
        <ConfirmModal
          title={inactive ? langModal.unlockTitle : langModal.title}
          subtext={inactive ? langModal.unlockSub : langModal.subtext}
          confirmText={inactive ? langBtn.unlockShort : langBtn.lock}
          closeText={langBtn.close}
          close={closeModal}
          confirm={inactive ? unlockAccount : lockAccount}
          inactive={inactive}
        />
      )}
      {confirmed && (
        <ModalConfirm
          show
          editPage={true}
          confirm={inactive ? langModal.lockSuccess : langModal.unlockSuccess}
          buttonText={langBtn.close}
          close={closeModal}
        />
      )}
      {(confirmed || openModal) && <BackDrop show closeModal={closeModal} />}
    </div>
  );
};

export default DeactivatePage;
