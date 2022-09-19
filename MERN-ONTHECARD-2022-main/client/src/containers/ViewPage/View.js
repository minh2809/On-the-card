import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./View.module.css";
import HeaderBox from "../../components/Boxes/HeaderBox/HeaderBox";
import NewLinkBox from "../../components/Boxes/LinkBox/NewLinkBox/NewLinkBox";
import LinkBoxB2B from "../../components/Boxes/LinkBox/LinkBoxB2B/LinkBoxB2B";
import DownloadButton from "../../components/UI/Button/ViewPageButtons/DownloadButton";
import MessageButton from "../../components/UI/Button/ViewPageButtons/MessageButton";
import MessageModal from "../../components/UI/Modal/MessageModal/MessageModal";
import BackDropClose from "../../components/UI/Backdrop/BackDropClose";
import ModalLoad from "../../components/UI/Modal/ModalLoad/ModalLoad";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm/ModalConfirm";
import Footer from "../../containers/Footer/Footer";
import ViewPageNav from "../../components/UI/Navigation/ViewNavigation/ViewPageNav";
import CoverPhoto from "../../components/Boxes/StoreHeader/CoverPhoto";
import { translate } from "../../language/backEndTranslate";
import { ADDSOClient, isTanCan } from "../../utilities/helper2";

import { Helmet } from "react-helmet";
import { changeToEN } from "../../store/actionCreators";

const View = () => {
  const { userInfo, appLang, appLanguage } = useSelector((state) => state);
  const { avatarURL, avatarImg, socialMediaList, company } = userInfo;
  const { fullName, bio, backgroundImageUrl, inactive } = userInfo;
  const { backgroundColor, storeActivated } = userInfo;
  let languageChanged = false;
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [messageResult, setMessageResult] = useState({
    success: false,
    message: "",
  });
  const noBgImg = ADDSOClient(company);
  const changeLanguage = isTanCan(company);

  useEffect(() => {
    if (messageResult.success || messageResult.message) {
      setConfirm(true);
    }
    if (changeLanguage && !languageChanged) {
      dispatch(changeToEN());
    }
  }, [messageResult, dispatch, languageChanged, changeLanguage]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openLoading = () => setLoading(true);
  const closeLoading = () => setLoading(false);
  const closeConfirm = () => setConfirm(false);

  let listItems = null;
  const avatarImage = avatarURL === "" ? avatarImg : avatarURL;

  if (socialMediaList) {
    listItems = socialMediaList.map((value, index) => {
      if (ADDSOClient(company)) {
        return (
          <LinkBoxB2B
            iconType={value.icon}
            content={value.title}
            artistContent={value.artist ? value.artist : null}
            url={value.url}
            key={value.title}
          />
        );
      } else {
        return (
          <NewLinkBox
            iconType={value.icon}
            content={value.title}
            artistContent={value.artist ? value.artist : null}
            url={value.url}
            key={value.title}
          />
        );
      }
    });
  }

  if (inactive) {
    return (
      <div>
        <h3 className={classes.locked}>
          Trang của {fullName} đã được đặt ở chế độ Riêng Tư bởi chủ sở hữu
          trang. Vui lòng quay lại sau
        </h3>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={
          !backgroundImageUrl
            ? {
                backgroundColor: backgroundColor,
              }
            : null
        }
        className={classes.MainPage}
      >
        <Helmet>
          <title>
            {fullName} | {appLang.tabTile}
          </title>
          <meta name="description" content={bio} />
        </Helmet>
        {(company || storeActivated) && (
          <div className={classes.b2bTab}>
            <ViewPageNav />
          </div>
        )}
        {noBgImg && <CoverPhoto image={userInfo.backgroundImageUrl} />}
        <HeaderBox
          buttonShow={true}
          avatar={avatarImage}
          userFullName={fullName}
          userBio={bio}
          userInfo={userInfo}
        />
        <div className={classes.downloadButtonWrapper}>
          <DownloadButton />
          <MessageButton onClick={openModal} />
        </div>
        {listItems}

        {modalOpen && (
          <MessageModal
            closeModal={closeModal}
            openLoading={openLoading}
            closeLoading={closeLoading}
            setResult={setMessageResult}
          />
        )}
        {loading && <ModalLoad h5text={appLang.modal.sending} show />}
        {confirm && (
          <ModalConfirm
            show
            confirm={messageResult.success && appLang.modal.msgSent}
            error={
              !messageResult.success &&
              translate(messageResult.message, appLanguage)
            }
            buttonText={appLang.retrieve.dismiss}
            close={closeConfirm}
            editPage
          />
        )}
        {(modalOpen || loading || confirm) && (
          <BackDropClose show closeModal={closeModal} />
        )}
      </div>
    );
  }
};

export default View;
