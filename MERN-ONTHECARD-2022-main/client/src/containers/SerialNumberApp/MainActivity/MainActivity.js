import React, { useState, useContext, useEffect } from "react";
import classes from "./MainActivity.module.css";
import TextBox from "../../../components/UI/TextBox/TextBox";
import BlackButton from "../../../components/UI/Button/BlackButton/BlackButton";
import { AuthContext } from "../../../context/auth-context";
import MaterialUIList from "../../../components/UI/MaterialUIList/MaterialUIList";
import * as api from "../../firebase/serialAPI";
import { generateSerialNo } from "../../../utilities/helper_functions";
import ModalLoad from "../../../components/UI/Modal/ModalLoad/ModalLoad";
import ModalConfirm from "../../../components/UI/Modal/ModalConfirm/ModalConfirm";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import ErrorBadge from "../../../components/UI/ErrorBadge/ErrorBadge";
import { useSelector } from "react-redux";

const MainActivity = React.memo((props) => {
  const authContext = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [codeAmount, setCodeAmount] = useState(0);
  const [listArray, setListArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState("");
  const { token } = useSelector((state) => state);

  useEffect(() => {
    if (!authContext.authApp) {
      window.location.replace("/admin/serialnumber/");
    }
  }, [authContext]);

  const buttonClicked = async () => {
    setLoading(true);
    if (codeAmount > 100 || codeAmount < 0) {
      setLoading(false);
      return setShowError(true);
    }
    const result = await api.fetchByAmount(codeAmount, token);
    if (result.success) {
      setListArray(result.serialArray);
    }
    setLoading(false);
  };

  const addSerialNo = async () => {
    setLoading(true);
    const serialArray = generateSerialNo();
    const result = await api.addSerialNo(serialArray, token);
    if (!result.success) {
      setLoading(false);
      return setErrors(result.error);
    }
    setLoading(false);
    setErrors("");
    setSuccessMsg(result.message);
  };

  return (
    <div
      className={authContext.authApp ? classes.pageStyling : classes.noDisplay}
    >
      {listArray.length > 0 ? (
        <MaterialUIList list={listArray} token={token} />
      ) : (
        <div className={classes.TextBox}>
          <h1>Đăng Nhập Thành Công !</h1>
          <TextBox
            iconClasses="fas fa-qrcode"
            inputType="number"
            textboxName="Nhập Số Lượng Code Muốn Lấy (0-100)"
            changed={(event) => setCodeAmount(event.target.value)}
          />
          <p
            className={
              showError ? classes.errorTextShow : classes.errorTextHide
            }
          >
            * Lượng Code Chỉ Được Là Số Từ 0 đến 100
          </p>
          <BlackButton
            content="Lấy Code"
            iconClass="fa fa-arrow-right"
            clicked={buttonClicked}
          />
          <br />
          {errors && <ErrorBadge message={errors} />}
          <BlackButton
            content="Thêm Mã Số Thẻ"
            iconClass="fa fa-arrow-right"
            clicked={addSerialNo}
          />
        </div>
      )}
      <ModalConfirm
        show={successMsg}
        confirm={"Thêm Mã Số Thẻ Thành Công"}
        subText={successMsg}
        buttonText={"Đóng"}
        editPage
        close={() => setSuccessMsg("")}
      />
      <ModalLoad h5text={"Đang Tải..."} show={loading} />
      <Backdrop show={loading || successMsg} />
    </div>
  );
});

export default MainActivity;

//authContext.authApp -> Check for login
