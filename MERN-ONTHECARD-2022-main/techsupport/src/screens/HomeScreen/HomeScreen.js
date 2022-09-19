import React, { useState } from "react";
import classes from "./HomeScreen.module.css";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Backdrop from "../../components/Backdrop/Backdrop";
import Modal from "../../components/Modal/Modal";

import { useDispatch } from "react-redux";
import { authenticate, setToken } from "../../redux/appActions";

import * as api from "../../api/api";

const HomeScreen = ({ history }) => {
  const { homeScreenStyle, buttonStyle, errorStyle, errorStyleHide } = classes;
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleLogin = async () => {
    setOpenModal(true);
    const result = await api.authUser(password);
    const checker = result.success;
    if (checker) {
      setInvalid(false);
      dispatch(authenticate(password));
      dispatch(setToken(result.token));
      setOpenModal(false);
      return history.push("/mainscreen");
    } else {
      setOpenModal(false);
      return setInvalid(true);
    }
  };

  return (
    <div className={homeScreenStyle}>
      <h3>App Hỗ Trợ Kỹ Thuật On The Card</h3>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Mật Khẩu</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={!show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShow(!show)}
                edge="end"
              >
                {show ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
      <br />
      <h5 className={invalid ? errorStyle : errorStyleHide}>* Sai Mật Khẩu</h5>
      <Button
        color="primary"
        variant="contained"
        className={buttonStyle}
        onClick={handleLogin}
      >
        Đăng Nhập
      </Button>
      <Modal show={openModal} />
      <Backdrop show={openModal} />
    </div>
  );
};

export default HomeScreen;
