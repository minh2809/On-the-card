import React, { useState } from "react";
import classes from "./Message.module.css";
import { useSelector } from "react-redux";
import Box from "./Box";
import BackDropClose from "../UI/Backdrop/BackDropClose";
import Modal from "./Modal";
import ModalLoad from "../UI/Modal/ModalLoad/ModalLoad";
import SearchModal from "./SearchModal";
import Button from "./Button";
import {
  setIsRead,
  deleteMessage,
  searchOrderFunc,
} from "../../utilities/analytic_helper";
import { orderToExcelAdmin } from "../../utilities/excelHelper";
import { setMessageData } from "../../store/actionCreators";
import { useDispatch } from "react-redux";
import * as api from "../../api/api";

const Orders = () => {
  const { messageData, appLanguage, appLang } = useSelector((state) => state);
  const { userInfo, token, client } = useSelector((state) => state);

  const { orderTitle, of, noOrder: noMsgText } = appLang.messageModal;
  const { searchOrder, updateOrder } = appLang.messageModal;
  const { fullOrder, exportExcel: excelText } = appLang.messageModal;
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [modalData, setModalData] = useState({});
  const [messages, setMessages] = useState(messageData);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const messageList = [];
  let orderCount = 0;

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
    console.log(isRead);
    !isRead && api.messageActions("read", id, token);
  };

  const deleteMesssage = (data) => {
    const id = data._id;
    const newMsgArray = deleteMessage(messageData, id);
    dispatch(setMessageData(newMsgArray));
    api.messageActions("delete", id, token);
  };

  const searchMsg = () => {
    const searchResult = searchOrderFunc(messageData, searchTitle);
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

  const exportToExcel = () => {
    const { dayInWeek } = appLang;
    orderToExcelAdmin(messages, client.serialArray, appLanguage, dayInWeek);
  };

  if (messages) {
    messages.forEach((value, index) => {
      if (value.isOrder) {
        orderCount++;
        messageList.push(
          <Box
            image={value.orderData.productImage}
            key={index}
            messageData={value}
            appLang={appLang}
            onClick={openModal}
            order
          />
        );
      }
    });
  }

  return (
    <div className={classes.container}>
      <h3 className={classes.pageTitle}>
        {orderTitle} <br /> {of} <span>{userInfo.fullName} </span>
      </h3>

      <div className={classes.buttonContain}>
        <Button black onClick={openSearch}>
          <i className="fas fa-search"></i> {searchOrder}
        </Button>
        <Button black onClick={searched ? fullMessage : updateMessage}>
          {searched ? (
            <i className="fas fa-list"></i>
          ) : (
            <i className="fas fa-sync-alt"></i>
          )}{" "}
          {searched ? fullOrder : updateOrder}
        </Button>
      </div>

      {messageList.length > 0 && (
        <div className={classes.excelButton}>
          <Button black onClick={exportToExcel}>
            <i className="fas fa-file-excel"></i> {excelText}
          </Button>
          <div className={classes.buttonHolder}></div>
        </div>
      )}

      {!orderCount && <h4 className={classes.noMsg}>{noMsgText}</h4>}
      {messageList}
      <ModalLoad h5text={appLang.modal.pleaseWait} show={loading} />
      {modalOpen && (
        <Modal
          data={modalData}
          appLang={appLang}
          close={closeModal}
          deleteProp={deleteMesssage}
          order
        />
      )}
      {searchModal && (
        <SearchModal
          setTitle={setSearchTitle}
          close={closeModal}
          appLang={appLang}
          search={searchMsg}
          value={searchTitle}
          order
        />
      )}
      {(modalOpen || searchModal || loading) && (
        <BackDropClose show closeModal={closeModal} />
      )}
    </div>
  );
};

export default Orders;
