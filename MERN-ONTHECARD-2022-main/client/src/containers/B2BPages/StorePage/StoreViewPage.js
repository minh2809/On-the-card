import React, { useState, useEffect } from "react";
import classes from "./Store.module.css";
import StoreHeader from "../../../components/Boxes/StoreHeader/StoreHeader";
import { useSelector } from "react-redux";
import ViewPageNav from "../../../components/UI/Navigation/ViewNavigation/ViewPageNav";
import ProductCard from "../../../components/UI/Cards/ProductCard/ProductCard";
import ModalLoad from "../../../components/UI/Modal/ModalLoad/ModalLoad";
import BackDrop from "../../../components/UI/Backdrop/Backdrop";

import { useHistory, useParams } from "react-router-dom";
import { isPandora, isTanCan } from "../../../utilities/helper2";

const StoreViewPage = () => {
  const { storePage, appLang } = useSelector((state) => state);
  const { avatarImg, avatarURL, company } = storePage;
  const avatarImage = avatarURL ? avatarURL : avatarImg;
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

  let listItems;
  if (storePage.products) {
    listItems = storePage.products.map((value, index) => {
      return <ProductCard productData={value} key={index} />;
    });
  }

  return (
    <div className={classes.MainPage}>
      <div className={classes.b2bTab}>
        <ViewPageNav />
      </div>
      <StoreHeader
        buttonShow={true}
        avatar={avatarImage}
        userFullName={storePage.name}
        userBio={storePage.bio}
        userInfo={storePage}
      />
      <h3 className={classes.productText}>
        {isPandora(company)
          ? "Hệ Thống Kinh Doanh"
          : isTanCan(company)
          ? "Our Services"
          : appLang.b2bText.ourProducts}
      </h3>
      <div className={classes.productList}>{listItems}</div>
      <ModalLoad show={modalOpen} h5text={appLang.modal.pleaseWait} />
      <BackDrop show={modalOpen} />
    </div>
  );
};

export default StoreViewPage;
