import React, { useState, useEffect } from "react";
import classes from "./BasicInfo.module.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import UploadImage from "../UI/UploadImage/StoreImage";
import Backdrop from "../UI/Backdrop/Backdrop";
import ModalLoad from "../UI/Modal/ModalLoad/ModalLoad";
import ModalConfirm from "../UI/Modal/ModalConfirm/ModalConfirm";
import MainButton from "../UI/Button/MainButton/MainButton";
import TextField from "@material-ui/core/TextField";

import * as api from "../../api/api2";

import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import { translate } from "../../language/backEndTranslate";

const BasicInfoStore = () => {
  const dispatch = useDispatch();
  const { token, appLang } = useSelector((state) => state);
  const { appLanguage, storePage } = useSelector((state) => state);
  const { name: fullName, bio: bioVal } = storePage;

  const [fullname, setFullName] = useState(fullName);
  const [bio, setBio] = useState(bioVal);
  const [modalRetrieveIsOpen, setModalRetrieveIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const renderLanguage = appLang;
  const pleaseWait = renderLanguage.modal.pleaseWait;

  const handleChange = (event, boxType) => {
    switch (boxType) {
      case "fullname":
        setFullName(event.target.value);
        break;

      case "bio":
        setBio(event.target.value);
        break;

      default:
        console.log("No textbox type passed");
        break;
    }
  };

  const updateButtonHandler = async () => {
    setLoading(true);
    const res = await api.updateStore(storePage, token);
    setTimeout(() => {
      setModalRetrieveIsOpen(true);
      setError(translate(res.data.error, appLanguage));
      setLoading(false);
    }, 100);
  };

  const closeModal = () => {
    setModalRetrieveIsOpen(false);
  };

  useEffect(() => {
    dispatch({
      type: actionTypes.UPDATEFNANDBIOSTORE,
      valFullName: fullname,
      valBio: bio,
    });
  }, [fullname, bio, dispatch]);

  return (
    <div className={classes.Store}>
      <div className={classes.BasicInfoMain}>
        <UploadImage uploadAvatar={true} />
        <List component="nav">
          <ListItem>
            <div className={classes.inputWrapper}>
              <label className={classes.label}>
                {renderLanguage.editPage.text.pageName}
              </label>
              <TextField
                fullWidth
                id="outlined-name-small"
                placeholder={fullname}
                variant="outlined"
                size="small"
                className={classes.textField}
                onChange={(event) => handleChange(event, "fullname")}
              />
            </div>
          </ListItem>
          <ListItem>
            <label className={classes.label}>
              {renderLanguage.editPage.text.pageDescription}
            </label>
          </ListItem>
          <ListItem>
            <TextareaAutosize
              minRows={6}
              aria-label="maximum height"
              placeholder={bioVal}
              className={classes.textArea}
              onChange={(event) => handleChange(event, "bio")}
            />
          </ListItem>
          <div className={classes.buttonWrapper}>
            <MainButton
              type="button"
              onClick={updateButtonHandler}
              text={renderLanguage.editPage.button.updateButton}
            />
          </div>
        </List>
      </div>

      <ModalConfirm
        show={modalRetrieveIsOpen}
        confirm={renderLanguage.editPage.modal.confirm}
        subText={""}
        buttonText={renderLanguage.editPage.modal.gotIt}
        close={closeModal}
        editPage={true}
        error={error}
      />

      <ModalLoad h5text={pleaseWait} show={loading} />
      <Backdrop show={modalRetrieveIsOpen || loading} />
    </div>
  );
};

export default BasicInfoStore;
