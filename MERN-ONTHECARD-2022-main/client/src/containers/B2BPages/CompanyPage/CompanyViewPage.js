import React, { useState, useEffect } from "react";
import classes from "./Company.module.css";
import HeaderBox from "../../../components/Boxes/HeaderBox/HeaderBox";
import { useSelector } from "react-redux";
import ViewPageNav from "../../../components/UI/Navigation/ViewNavigation/ViewPageNav";
import LinkBoxB2B from "../../../components/Boxes/LinkBox/LinkBoxB2B/LinkBoxB2B";
import CoverPhoto from "../../../components/Boxes/StoreHeader/CoverPhoto";
import { ADDSOClient, isPandora } from "../../../utilities/helper2";
import ModalLoad from "../../../components/UI/Modal/ModalLoad/ModalLoad";
import BackDrop from "../../../components/UI/Backdrop/Backdrop";
import { useHistory, useParams } from "react-router-dom";
import PandoraDropDown from "../../../B2B_Components/Pandora/LinkBox/DropDown/DropDown";
import NewLinkBox from "../../../components/Boxes/LinkBox/NewLinkBox/NewLinkBox";

const CompanyViewPage = () => {
  const { enterprisePage, appLang } = useSelector((state) => state);
  const { avatarImg, avatarURL, company } = enterprisePage;
  const avatarImage = avatarURL ? avatarURL : avatarImg;
  let listItems;
  const noBgImg = ADDSOClient(company);
  const history = useHistory();
  const { id } = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (!company) {
      history.push(`/${id}`);
    }

    openModal();
    setTimeout(() => {
      closeModal();
    }, 1000);
  }, [company, history, id]);

  if (enterprisePage.info && !isPandora(company)) {
    listItems = enterprisePage.info.map((value, index) => {
      return (
        <LinkBoxB2B
          iconType={value.icon}
          content={value.title}
          artistContent={value.artist ? value.artist : null}
          url={value.url}
          key={value.title}
        />
      );
    });
  }

  if (isPandora(company) && enterprisePage.info) {
    listItems = enterprisePage.info.map((value, index) => {
      return (
        <NewLinkBox
          iconType={value.icon}
          content={value.title}
          artistContent={value.artist ? value.artist : null}
          url={value.url}
          key={value.title}
        />
      );
    });
  }

  return (
    <div className={classes.MainPage}>
      <div className={classes.b2bTab}>
        <ViewPageNav />
      </div>
      {noBgImg && <CoverPhoto image={enterprisePage.backgroundImageUrl} />}
      <HeaderBox
        buttonShow={true}
        avatar={avatarImage}
        userFullName={enterprisePage.name}
        userBio={enterprisePage.bio}
        userInfo={enterprisePage}
      />
      {isPandora(company) && (
        <NewLinkBox
          iconType={
            "https://firebasestorage.googleapis.com/v0/b/onthecardimage.appspot.com/o/images%2Fmai.pham%40norbreeze.com%2Fnor.png?alt=media&token=3ce24918-431e-4017-ae1b-7fb6625fb2fd"
          }
          content={"Về Tập Đoàn Norbreeze"}
          url={"https://pandora.norbreeze.vn/pages/ve-tap-doan-norbreeze"}
          key={"Về Tập Đoàn Norbreeze"}
        />
      )}
      {isPandora(company) && <PandoraDropDown />}
      {listItems}
      <ModalLoad show={modalOpen} h5text={appLang.modal.pleaseWait} />
      <BackDrop show={modalOpen} />
    </div>
  );
};

export default CompanyViewPage;
