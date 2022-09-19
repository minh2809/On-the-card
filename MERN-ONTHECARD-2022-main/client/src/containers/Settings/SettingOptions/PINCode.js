import React, { useState } from "react";
import { Colors } from "../../../utilities/colors";
import classes from "./Options.module.css";
import { useSelector, useDispatch } from "react-redux";
// import { explanation, explainTitle } from "../../../utilities/settingsHelper";
import PINModal from "../../../components/UI/Modal/ConfirmModal/PINModal";
import BackDrop from "../../../components/UI/Backdrop/BackDropClose";
import ModalConfirm from "../../../components/UI/Modal/ModalConfirm/ModalConfirm";
import { setPINRedux } from "../../../store/actionCreators";
import * as api from "../../../api/api2";
import Loader from "../../../components/UI/Spinner/Loading";
import { translate } from "../../../language/backEndTranslate";

const PINCode = ({ openExplain }) => {
  let modalTitle, modalExplanation, btnText, confirmText;
  const { userInfo, appLang, token, appLanguage } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [confirmed, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  if (userInfo.PIN) {
    modalTitle = appLang.settings.disablePIN;
    modalExplanation = appLang.settings.disablePINExplain;
    btnText = appLang.settings.disablePIN;
    confirmText = appLang.settings.PINConfirm;
  } else {
    modalTitle = appLang.settings.PINTitle;
    modalExplanation = appLang.settings.PINExplain;
    btnText = appLang.settings.createPIN;
    confirmText = appLang.settings.disablePINConfirm;
  }

  const openPINModal = () => setOpenModal(true);

  const closePINModal = () => {
    setOpenModal(false);
    setConfirm(false);
  };

  const confirmPIN = (PINCode) => {
    setOpenModal(false);
    setConfirm(true);
    dispatch(setPINRedux(PINCode));
  };

  const disablePIN = async () => {
    setLoading(true);
    const result = await api.setPIN("", token);
    if (result.success) {
      setConfirm(true);
      dispatch(setPINRedux(""));
    } else {
      alert(translate(result.error, appLanguage));
    }
    return setLoading(false);
  };

  return (
    <div className={classes.option}>
      <p
        className={classes.optionTitle}
        onClick={() => openExplain(modalTitle, modalExplanation)}
      >
        {appLang.settings.PINTitle}
        <i style={{ cursor: "pointer" }} className="far fa-question-circle"></i>
      </p>
      <div
        className={classes.optionButton}
        style={{
          backgroundColor: userInfo.PIN ? Colors.red : Colors.black,
          color: Colors.white,
        }}
        onClick={userInfo.PIN ? disablePIN : openPINModal}
      >
        {loading ? <Loader /> : btnText}
      </div>
      {openModal && (
        <PINModal
          close={closePINModal}
          confirm={confirmPIN}
          title={appLang.settings.PINTitle}
        />
      )}
      {confirmed && (
        <ModalConfirm
          show
          confirm={confirmText}
          editPage
          buttonText={appLang.profile.button.close}
          close={closePINModal}
        />
      )}
      {(confirmed || openModal) && <BackDrop show closeModal={closePINModal} />}
    </div>
  );
};

export default PINCode;
