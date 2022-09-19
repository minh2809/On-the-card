import React, { useState } from "react";
import classes from "./SocialMediaList.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import ProductModal from "../UI/Modal/ProductModal/ProductModal";
import ProductModalEdit from "../UI/Modal/ProductModal/ProductModalEdit";

import ModalLoad from "../UI/Modal/ModalLoad/ModalLoad";
import ModalLoading from "../UI/Modal/ModalLoading/ModalLoading";
import MainButton from "../UI/Button/MainButton/MainButton";
import ModalConfirm from "../UI/Modal/ModalConfirm/ModalConfirm";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import { translate } from "../../language/backEndTranslate";
import { addObjectProduct } from "../../utilities/load_icons";
import * as api from "../../api/api2";
import List from "./List";

/*  ****************************************************************** */

const EnterpriseInfo = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imgModalShow, setImgModalShow] = useState(false);
  const [editData, setEditData] = useState({ updated: false });
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [modalRetrieveIsOpen, setModalRetrieveIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [subText, setSubText] = useState("");

  const { appLanguage, storePage, token } = useSelector((state) => state);
  const { appLang } = useSelector((state) => state);
  const renderLanguage = appLang;
  const { products: socialMediaList } = storePage;
  const dispatch = useDispatch();

  const openModal = () => setImgModalShow(true);
  const closeImgModal = () => setImgModalShow(false);

  const inLineBtnContainer =
    socialMediaList.length <= 1 ? { marginTop: "195px" } : {};

  const dispatchNewList = (socialMediaList) => {
    dispatch({
      type: actionTypes.UPDATESTOREPRODUCTS,
      socialMediaListValue: socialMediaList,
    });
  };

  const updateEditData = (data, index) => {
    setEditData({ ...data, updated: true, index: index });
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

  const addAccountImage = (productData) => {
    const addedObject = addObjectProduct(productData);
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
      <div className={classes.SocialMediaListHeaderProduct}>
        <div className={classes.AddLinkLabel}>
          {renderLanguage.editPage.text.addNewProduct}
        </div>

        <div className={classes.AddLinkButtonWrapper}>
          <div onClick={openModal} className={classes.AddLinkButton}>
            <i className="fas fa-plus"></i>
            {renderLanguage.editPage.button.addProduct}
          </div>
        </div>
      </div>
      <List
        socialMediaList={socialMediaList}
        updateEditData={updateEditData}
        storeList={true}
      />
      <div style={inLineBtnContainer} className={classes.UpdateButtonWrapper}>
        <MainButton
          type="button"
          onClick={updateButtonHandler}
          text={renderLanguage.editPage.button.updateButton}
        />
      </div>

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
        <ProductModal
          show={imgModalShow}
          closeModal={closeImgModal}
          setLoad={setImgLoading}
          addAccount={addAccountImage}
        />
      )}
      {editData.updated && (
        <ProductModalEdit
          show={editData.updated}
          data={editData}
          setLoad={setImgLoading}
          closeModal={closeModalEdit}
          onUpdate={(data) => onUpdate(data)}
        />
      )}

      <ModalLoad h5text={renderLanguage.modal.pleaseWait} show={loading} />
      <ModalLoading show={imgLoading} />
      <Backdrop
        show={
          modalIsOpen ||
          modalRetrieveIsOpen ||
          loading ||
          editData.updated ||
          imgModalShow ||
          imgLoading
        }
      />
    </div>
  );
};

export default EnterpriseInfo;
