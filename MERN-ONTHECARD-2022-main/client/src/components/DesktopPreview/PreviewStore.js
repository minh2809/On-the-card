import React from "react";
import classes from "./DesktopPreview.module.css";
import ProductCard from "../../components/UI/Cards/ProductCard/ProductCardPreview/ProductCardPreview";
import Footer from "../../containers/Footer/Footer";
import { useSelector } from "react-redux";
import StoreHeader from "./HeaderBox/StoreHeader/StoreHeader";
import DownloadButton from "../UI/Button/ViewPageButtons/DownloadButton";
import { Vietnamese, English } from "../../language/language";
import { isPandora } from "../../utilities/helper2";

const PreviewStore = () => {
  const { storePage, appLanguage, userInfo } = useSelector((state) => state);
  const { products, avatarURL, avatarImg } = storePage;
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;

  let listItems = null;

  if (products) {
    listItems = products.map((value, index) => {
      return <ProductCard productData={value} key={index} />;
    });
  }

  return (
    <div className={classes.SocialMediaList}>
      <div className={classes.desktopPreviewArea}>
        <div className={classes.previewPhoneArea}>
          <div id="desktop-preview" className={classes.desktopPreview}>
            <StoreHeader avatar={avatarURL || avatarImg} userInfo={storePage} />
            <div className={classes.downloadButtonWrapper}>
              <DownloadButton />
            </div>
            <h3 className={classes.productText}>
              {isPandora(userInfo.company)
                ? "Hệ Thống Kinh Doanh"
                : appLang.b2bText.ourProducts}
            </h3>
            <div className={classes.socialLinkBoxWrapper}>{listItems}</div>
            <div className={classes.footer}>
              <Footer preview b2bInfo={storePage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewStore;
