import React, { useState } from "react";
import classes from "./SocialMediaList.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import Modal from "../UI/Modal/Modal";
import ImageModal from "../UI/Modal/ImageModal/ImageModal";
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
  addFile,
} from "../../utilities/load_icons";
import * as api from "../../api/api2";
import List from "./List";
import UploadFile from "../UI/Modal/UploadFileModal/UploadFile";

/*  ****************************************************************** */

const EnterpriseInfo = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imgModalShow, setImgModalShow] = useState(false);
  const [embedYoutube, setEmbedYoutube] = useState(false);
  const [editData, setEditData] = useState({ updated: false });
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [modalRetrieveIsOpen, setModalRetrieveIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [subText, setSubText] = useState("");
  const [uploadFileModal, setUploadFileModal] = useState(false);

  const { appLanguage, enterprisePage, token } = useSelector((state) => state);
  const { appLang } = useSelector((state) => state);
  const renderLanguage = appLang;
  const { info: socialMediaList } = enterprisePage;
  const dispatch = useDispatch();

  const openModal = () => setModalIsOpen(true);
  const closeImgModal = () => setImgModalShow(false);
  const openImgModal = () => setImgModalShow(true);
  const openEmbedYoutube = () => setEmbedYoutube(true);
  const closeEmbedYoutube = () => setEmbedYoutube(false);
  const openFileModal = () => setUploadFileModal(true);
  const closeFileModal = () => setUploadFileModal(false);

  const dispatchNewList = (socialMediaList) => {
    dispatch({
      type: actionTypes.UPDATEINFOENTERPRISE,
      socialMediaListValue: socialMediaList,
    });
  };

  const updateEditData = (data, index) => {
    setEditData({ ...data, updated: true, index: index });
  };

  const updateButtonHandler = async () => {
    setLoading(true);
    const res = await api.updateEnterprise(enterprisePage, token);
    setTimeout(() => {
      setModalRetrieveIsOpen(true);
      setError(translate(res.data.error, appLanguage));
      setLoading(false);
    }, 100);
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

  const addAccountImage = (icon, accountType, url) => {
    const addedObject = addObjectImage(icon, accountType, url);
    return dispatchNewAccount(addedObject);
  };

  const addAccount = (accountType, url, musicLinkName, artistName) => {
    const account = accountType.toLowerCase();
    const condition =
      account.includes("bank") ||
      accountType.length === 3 ||
      account.includes("bidv");

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
          {renderLanguage.editPage.text.addNewEnter}
        </div>

        <div className={classes.AddLinkButtonWrapper}>
          <div onClick={openModal} className={classes.AddLinkButton}>
            <i className="fas fa-plus"></i>
            {renderLanguage.editPage.button.addLink}
          </div>
        </div>
      </div>
      <List
        socialMediaList={socialMediaList}
        updateEditData={updateEditData}
        enterpriseList
      />
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

export default EnterpriseInfo;
