import React, { useState } from "react";
import { useParams } from "react-router";
import { getProblemById } from "../../utilities/helper_functions";
import { suggestedText } from "../../utilities/helper_functions";
import { needUserName } from "../../utilities/helper_functions";
import { validateSerialNo } from "../../utilities/helper_functions";
import { validateUserName } from "../../utilities/helper_functions";
import { verifyStickerProblem } from "../../utilities/helper_functions";
import { FEValidation, needPassword } from "../../utilities/helper_functions";
import TextField from "@material-ui/core/TextField";
import classes from "./ProblemScreen.module.css";
import Button from "@material-ui/core/Button";

import Backdrop from "../../components/Backdrop/Backdrop";
import Modal from "../../components/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { setSuccessMessage } from "../../redux/appActions";

import * as api from "../../api/api";

const ProblemScreen = ({ history }) => {
  const { id } = useParams();
  const problemContent = getProblemById(id);
  const suggestedQuestion = suggestedText(id);
  const { loggedIn, token } = useSelector((state) => state.appReducer);
  const usernameNeeded = needUserName(id);
  const needPw = needPassword(id);
  const dispatch = useDispatch();

  const [serialNo, setSerialNo] = useState("");
  const [newSerialNo, setNewSerialNo] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [issue, setIssue] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const stickerVerify = verifyStickerProblem(id);

  const {
    separateStyling,
    problemStyling,
    returnButtonStyling,
    textFieldStyling,
    suggestStyling,
    issueStyling,
  } = classes;

  const returnButton = () => {
    history.push("/mainscreen");
  };

  /* ***********************************  Execute Fixes   ********************************** */

  const executeFixOne = async () => {
    const data = await api.fixError1(serialNo, password, token);
    const { success, message } = data;
    if (success) {
      setOpenModal(false);
      dispatch(setSuccessMessage(message));
      return history.push("/success/1");
    } else {
      setOpenModal(false);
      return setIssue(message);
    }
  };

  const executeFixTwo = async () => {
    const data = await api.fixError2(serialNo, userName, token);
    const { success, message } = data;
    if (!success) {
      setIssue(message);
      return setOpenModal(false);
    }
    setOpenModal(false);
    dispatch(setSuccessMessage(message));
    return history.push("/success/2");
  };

  const executeFixThree = async (meToCo) => {
    const data = await api.fixError3(serialNo, newSerialNo, token, meToCo);
    const { success, message } = data;
    if (!success) {
      setIssue(message);
      return setOpenModal(false);
    }
    setOpenModal(false);
    dispatch(setSuccessMessage(message));
    return history.push("/success/3");
  };

  const execute5and6 = async (actionType) => {
    const data = await api.executee5and6(userName, actionType, token);
    const { success, message } = data;
    if (!success) {
      setIssue(message);
      return setOpenModal(false);
    }
    setOpenModal(false);
    dispatch(setSuccessMessage(message));
    return history.push("/success/5");
  };

  /* ********************************************************************* */

  const handleSubmit = (e) => {
    e.preventDefault();
    const validatedSerial = validateSerialNo(serialNo);
    const validatedUserName = validateUserName(userName);
    const validateNewSerial = validateSerialNo(newSerialNo);
    setOpenModal(true);
    setIssue("");
    switch (id.toString()) {
      case "1":
        const errorMsg = FEValidation(validatedSerial, true);
        setIssue(errorMsg);
        errorMsg ? setOpenModal(false) : executeFixOne();
        break;
      case "2":
        const errorMsg2 = FEValidation(validatedSerial, validatedUserName);
        setIssue(errorMsg2);
        errorMsg2 ? setOpenModal(false) : executeFixTwo();
        break;
      case "3":
        const errorMsg3 =
          FEValidation(validatedSerial, true) ||
          FEValidation(validateNewSerial, true);
        setIssue(errorMsg3);
        errorMsg3 ? setOpenModal(false) : executeFixThree(false);
        break;
      case "5":
        const errorMsg5 = FEValidation(true, validatedUserName);
        setIssue(errorMsg5);
        errorMsg5 ? setOpenModal(false) : execute5and6("grant");
        break;
      case "6":
        const errorMsg6 = FEValidation(true, validatedUserName);
        setIssue(errorMsg6);
        errorMsg6 ? setOpenModal(false) : execute5and6("remove");
        break;
      case "7":
        const errorMsg7 =
          FEValidation(validatedSerial, true) ||
          FEValidation(validateNewSerial, true);
        setIssue(errorMsg7);
        errorMsg7 ? setOpenModal(false) : executeFixThree(true);
        break;
      default:
        console.log("default");
        break;
    }
  };

  /* ********************************************************************* */

  const displayObj = (
    <div className={problemStyling}>
      <h3>
        {id}. {problemContent}
      </h3>
      <h3 className={suggestStyling}>
        Nên hỏi khách hàng: {suggestedQuestion}
      </h3>
      <h3>
        Chữa Lỗi / Hỗ Trợ Bằng Cách Điền Thông Tin Vào Các Ô Trống và Nhấn Nút
        (Hỗ Trợ / Reset Mã Số Thẻ) Dưới Đây
      </h3>
      <Button
        variant="outlined"
        className={returnButtonStyling}
        onClick={returnButton}
      >
        Quay Lại
      </Button>
      <form onSubmit={handleSubmit}>
        {!stickerVerify && (
          <TextField
            id="password"
            label={
              id === "3"
                ? "Nhập Mã Số Thẻ Cũ"
                : id === "7"
                ? "Nhập Mã Số Thẻ Cũ (.me)"
                : "Nhập Mã Số Thẻ"
            }
            variant="outlined"
            type="number"
            required
            value={serialNo}
            onChange={(e) => {
              setIssue("");
              return setSerialNo(e.target.value);
            }}
            className={textFieldStyling}
          />
        )}
        <div className={separateStyling} />
        {(id === "3" || id === "7") && (
          <TextField
            id="password"
            label={
              id === "7" ? "Nhập Mã Số Thẻ Mới (.co)" : "Nhập Mã Số Thẻ Mới"
            }
            variant="outlined"
            type="number"
            required
            value={newSerialNo}
            onChange={(e) => {
              setIssue("");
              return setNewSerialNo(e.target.value);
            }}
            className={textFieldStyling}
          />
        )}
        <div className={separateStyling} />
        {usernameNeeded && (
          <TextField
            id="username"
            label="Nhập Tên Truy Cập (Mới)"
            variant="outlined"
            type="text"
            required
            value={userName}
            onChange={(e) => {
              setIssue("");
              return setUserName(e.target.value);
            }}
            className={textFieldStyling}
          />
        )}
        <div className={separateStyling} />
        {stickerVerify && (
          <TextField
            id="username"
            label="Nhập Tên Truy Cập"
            variant="outlined"
            type="text"
            required
            value={userName}
            onChange={(e) => {
              setIssue("");
              return setUserName(e.target.value);
            }}
            className={textFieldStyling}
          />
        )}
        <div className={separateStyling} />
        {needPw && (
          <TextField
            id="password"
            label="Nhập Mật Khẩu"
            variant="outlined"
            type="text"
            value={password}
            onChange={(e) => {
              setIssue("");
              return setPassword(e.target.value);
            }}
            className={textFieldStyling}
          />
        )}
        {issue && <h4 className={issueStyling}>{issue}</h4>}
        <div className={separateStyling} />
        <Button
          style={{
            backgroundColor: "#0275d8",
            color: "white",
            fontWeight: "600",
          }}
          variant="contained"
          type="submit"
        >
          {id.toString() === "1" ? "Reset Mã Số Thẻ" : "Hỗ Trợ"}
        </Button>
      </form>
      <Modal show={openModal} />
      <Backdrop show={openModal} />
    </div>
  );

  /* ********************************************************************* */

  if (loggedIn) {
    return displayObj;
  } else if (id.toString() === "3") {
    history.push("/success/4");
  } else {
    history.push("/");
    return <div></div>;
  }
};

export default ProblemScreen;
