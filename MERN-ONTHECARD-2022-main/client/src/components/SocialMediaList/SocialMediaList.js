import RedirectSwitch from "../UI/RedirectSwitch/Redirect";
import SaveContactSwitch from "../UI/RedirectSwitch/SaveContactSwitch";
import React, { useState } from "react";
import classes from "./SocialMediaList.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import Modal from "../UI/Modal/Modal";
import ImageModal from "../UI/Modal/ImageModal/ImageModal";
import UploadFile from "../UI/Modal/UploadFileModal/UploadFile";
import ModalEdit from "../UI/Modal/ModalEdit/ModalEdit";
import ModalLoad from "../UI/Modal/ModalLoad/ModalLoad";
import ModalLoading from "../UI/Modal/ModalLoading/ModalLoading";
import MainButton from "../UI/Button/MainButton/MainButton";
import ModalConfirm from "../UI/Modal/ModalConfirm/ModalConfirm";
import EmbeddedModal from "../UI/Modal/YoutubeEmbedded/EmbeddedModal";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import { translate } from "../../language/backEndTranslate";
import {
  addObject,
  addObjectImage,
  addEmbedYoutube,
  addObjectBank,
  addEmbedInsta,
  addEmbedTiktok,
  addFile,
} from "../../utilities/load_icons";
import * as api from "../../api/api";
import List from "./List";
import InstaModal from "../UI/Modal/Embedded/Instagram/InstaModal";
import TiktokModal from "../UI/Modal/Embedded/Tiktok/TiktokModal";
import { isBankAccount } from "../../utilities/helper2";

/*  ****************************************************************** */

const SocialMediaList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imgModalShow, setImgModalShow] = useState(false);
  const [embedYoutube, setEmbedYoutube] = useState(false);
  const [editData, setEditData] = useState({ updated: false });
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [modalRetrieveIsOpen, setModalRetrieveIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [subText, setSubText] = useState("");
  const [instaModal, setInstaModal] = useState(false);
  const [tiktokModal, setTiktokModal] = useState(false);
  const [uploadFileModal, setUploadFileModal] = useState(false);

  const { appLanguage, userInfo, token } = useSelector((state) => state);
  const { appLang } = useSelector((state) => state);
  const renderLanguage = appLang;
  const { socialMediaList } = userInfo;
  const dispatch = useDispatch();

  const openModal = () => setModalIsOpen(true);
  const closeImgModal = () => setImgModalShow(false);
  const openImgModal = () => setImgModalShow(true);
  const openEmbedYoutube = () => setEmbedYoutube(true);
  const closeEmbedYoutube = () => setEmbedYoutube(false);
  const openInstaModal = () => setInstaModal(true);
  const closeInstaModal = () => setInstaModal(false);
  const openTiktokModal = () => setTiktokModal(true);
  const closeTiktokModal = () => setTiktokModal(false);
  const openFileModal = () => setUploadFileModal(true);
  const closeFileModal = () => setUploadFileModal(false);

  const dispatchNewList = (socialMediaList) => {
    dispatch({
      type: actionTypes.UPDATESOCIALMEDIA,
      socialMediaListValue: socialMediaList,
    });
  };

  const updateEditData = (data, index) => {
    setEditData({ ...data, updated: true, index: index });
  };

  const updateButtonHandler = async () => {
    setLoading(true);
    const res = await api.updateInfo(userInfo, token);
    setTimeout(() => {
      setLoading(false);
      setModalRetrieveIsOpen(true);
      setError(translate(res.data.error, appLanguage));
    }, 1000);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalRetrieveIsOpen(false);
    setEditData({ updated: false });
  };

  const addAccountFile = (fileName, url, title) => {
    const addedObject = addFile(fileName, url, title);
    return dispatchNewAccount(addedObject);
  };

  const addAccountEmbed = (url, title) => {
    const addedObject = addEmbedYoutube(url, title);
    return dispatchNewAccount(addedObject);
  };

  const addInstaPost = (url, title) => {
    const addedObject = addEmbedInsta(url, title);
    return dispatchNewAccount(addedObject);
  };

  const addTiktokVideo = (url, title) => {
    const addedObject = addEmbedTiktok(url, title);
    return dispatchNewAccount(addedObject);
  };

  const addAccountImage = (icon, accountType, url) => {
    const addedObject = addObjectImage(icon, accountType, url);
    return dispatchNewAccount(addedObject);
  };

  const addAccount = (accountType, url, musicLinkName, artistName) => {
    const account = accountType.toLowerCase();
    // condition in which the chosen account is a bank account
    const condition = isBankAccount(account);

    const addedObject = condition
      ? addObjectBank(accountType, url)
      : addObject(accountType, url, musicLinkName, artistName);
    return dispatchNewAccount(addedObject);
  };

  const dispatchNewAccount = (addedObject) => {
    let socialMediaListCopied = socialMediaList;
    socialMediaListCopied.push(addedObject);
    dispatchNewList(socialMediaListCopied);
    setModalIsOpen(false);
  };

  const closeModalEdit = () => {
    setEditData({ ...editData, updated: false });
  };

  const onUpdate = (data) => {
    const socialList = socialMediaList;
    socialList[data.index] = { ...data, url: data.url };

    setModalIsOpen(false);
    setModalRetrieveIsOpen(true);
    setSubText(renderLanguage.editPage.modal.remind);
    setEditData({ updated: false });

    socialList[data.index] = {
      ...data,
      url: data.url,
      index: undefined,
      updated: undefined,
    };
    dispatchNewList(socialList);
  };

  const closeModalConfirm = () => {
    setModalIsOpen(false);
    setModalRetrieveIsOpen(false);
    setEditData({ updated: false });
    setSubText("");
  };

  /*  ****************************************************************** */

  return (
    <div className={classes.SocialMediaList}>
      <div className={classes.SocialMediaListHeader}>
        <div className={classes.AddLinkLabel}>
          {renderLanguage.editPage.text.addNew}
        </div>

        <div>
          <div onClick={openModal} className={classes.AddLinkButton}>
            <i className="fas fa-plus"></i>
            {renderLanguage.editPage.button.addLink}
          </div>
        </div>
      </div>
      <div className={classes.redirectContainer}>
        <RedirectSwitch />
        <SaveContactSwitch />
      </div>
      <List socialMediaList={socialMediaList} updateEditData={updateEditData} />
      <div className={classes.UpdateButtonWrapper}>
        <MainButton
          type="button"
          onClick={updateButtonHandler}
          text={renderLanguage.editPage.button.updateButton}
        />
      </div>

      <Modal
        show={modalIsOpen}
        closed={closeModal}
        buttonName={renderLanguage.editPage.button.addLink}
        clicked={addAccount}
        openImgModal={openImgModal}
        openEmbedYouTube={openEmbedYoutube}
        openEmbedInsta={openInstaModal}
        openTiktok={openTiktokModal}
        openUploadFile={openFileModal}
      />
      <ModalEdit
        show={editData.updated}
        data={editData}
        closed={closeModalEdit}
        onUpdate={(data) => onUpdate(data)}
      />
      <ModalConfirm
        show={modalRetrieveIsOpen}
        confirm={renderLanguage.editPage.modal.confirm}
        subText={subText}
        buttonText={renderLanguage.editPage.modal.gotIt}
        close={closeModalConfirm}
        error={error}
        editPage={true}
      />
      {imgModalShow && (
        <ImageModal
          show={imgModalShow}
          closeModal={closeImgModal}
          setLoad={setImgLoading}
          addAccount={addAccountImage}
        />
      )}
      {embedYoutube && (
        <EmbeddedModal
          closeModal={closeEmbedYoutube}
          addAccount={addAccountEmbed}
        />
      )}
      {instaModal && (
        <InstaModal closeModal={closeInstaModal} addAccount={addInstaPost} />
      )}
      {tiktokModal && (
        <TiktokModal
          closeModal={closeTiktokModal}
          addAccount={addTiktokVideo}
        />
      )}
      {uploadFileModal && (
        <UploadFile
          setLoad={setImgLoading}
          close={closeFileModal}
          addAccount={addAccountFile}
        />
      )}
      <ModalLoad h5text={renderLanguage.modal.pleaseWait} show={loading} />
      <ModalLoading show={imgLoading} />
      <Backdrop
        show={
          uploadFileModal ||
          modalIsOpen ||
          instaModal ||
          tiktokModal ||
          modalRetrieveIsOpen ||
          loading ||
          editData.updated ||
          imgModalShow ||
          imgLoading ||
          embedYoutube
        }
      />
    </div>
  );
};

export default SocialMediaList;
