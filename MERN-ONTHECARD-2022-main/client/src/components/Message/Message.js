import React, { useState } from "react";
import classes from "./Message.module.css";
import { useSelector } from "react-redux";
import Box from "./Box";
import { Vietnamese, English } from "../../language/language";
import BackDropClose from "../UI/Backdrop/BackDropClose";
import Modal from "./Modal";
import ModalLoad from "../UI/Modal/ModalLoad/ModalLoad";
import SearchModal from "./SearchModal";
import Button from "./Button";
import {
  setIsRead,
  deleteMessage,
  searchMessage,
} from "../../utilities/analytic_helper";
import { setMessageData } from "../../store/actionCreators";
import { useDispatch } from "react-redux";
import * as api from "../../api/api";

const Message = () => {
  const { messageData, appLanguage } = useSelector((state) => state);
  const { userInfo, token } = useSelector((state) => state);

  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const { title, of, noMessage: noMsgText } = appLang.messageModal;
  const { search, update, fullList } = appLang.messageModal;
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [modalData, setModalData] = useState({});
  const [messages, setMessages] = useState(messageData);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const messageList = [];
  const noMessage = messageData ? messageData.length === 0 : true;

  const fullMessage = () => {
    setMessages(messageData);
    setSearched(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSearchModal(false);
  };

  const openSearch = () => {
    setSearchModal(true);
    setSearched(false);
  };

  const openModal = async (data) => {
    const id = data._id;
    const isRead = data.isRead;
    setModalOpen(true);
    setModalData(data);
    const newMsgArray = setIsRead(messageData, id);
    dispatch(setMessageData(newMsgArray));
    !isRead && api.messageActions("read", id, token);
  };

  const deleteMesssage = (data) => {
    const id = data._id;
    const newMsgArray = deleteMessage(messageData, id);
    dispatch(setMessageData(newMsgArray));
    api.messageActions("delete", id, token);
  };

  const searchMsg = () => {
    const searchResult = searchMessage(messageData, searchTitle);
    setMessages(searchResult);
    setSearched(true);
    closeModal();
  };

  const updateMessage = async () => {
    setLoading(true);
    const res = await api.messageActions("update", token, token);
    dispatch(setMessageData(res.messageData));
    setMessages(res.messageData);
    setLoading(false);
  };

  if (messages) {
    messages.forEach((value, index) => {
      if (!value.isOrder) {
        messageList.push(
          <Box
            key={index}
            messageData={value}
            appLang={appLang}
            onClick={openModal}
          />
        );
      }
    });
  }

  return (
    <div className={classes.container}>
      <h3 className={classes.pageTitle}>
        {title} <br /> {of} <span>{userInfo.fullName} </span>
      </h3>
      <div className={classes.buttonContain}>
        <Button black onClick={openSearch}>
          <i className="fas fa-search"></i> {search}
        </Button>
        <Button black onClick={searched ? fullMessage : updateMessage}>
          {searched ? (
            <i className="fas fa-list"></i>
          ) : (
            <i className="fas fa-sync-alt"></i>
          )}{" "}
          {searched ? fullList : update}
        </Button>
      </div>
      {noMessage && <h4 className={classes.noMsg}>{noMsgText}</h4>}
      {messageList}
      <ModalLoad h5text={appLang.modal.pleaseWait} show={loading} />
      {modalOpen && (
        <Modal
          data={modalData}
          appLang={appLang}
          close={closeModal}
          deleteProp={deleteMesssage}
        />
      )}
      {searchModal && (
        <SearchModal
          setTitle={setSearchTitle}
          close={closeModal}
          appLang={appLang}
          search={searchMsg}
          value={searchTitle}
        />
      )}
      {(modalOpen || searchModal || loading) && (
        <BackDropClose show closeModal={closeModal} />
      )}
    </div>
  );
};

export default Message;
