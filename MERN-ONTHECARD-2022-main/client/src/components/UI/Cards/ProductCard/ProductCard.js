import React, { useState, useEffect } from "react";
import classes from "./ProductCard.module.css";
import { translate } from "../../../../language/backEndTranslate";
import { useSelector } from "react-redux";
import * as api2 from "../../../../api/api2";
import PurchaseForm from "../../Modal/MessageModal/PurchaseForm";
import BackDrop from "../../../UI/Backdrop/BackDropClose";
import ModalLoad from "../../../UI/Modal/ModalLoad/ModalLoad";
import PurchaseConfirm from "../../../UI/Modal/ConfirmModal/PurchaseConfirm";
import { findNewLine } from "../../../../utilities/string_manipulation";
import { isPandora } from "../../../../utilities/helper2";

const ProductCard = (props) => {
  const { productData } = props;
  const { icon, title, description, price, url } = productData;
  var nf = new Intl.NumberFormat();
  const formattedPrice = nf.format(price);
  const { appLanguage, userInfo, token } = useSelector((state) => state);
  const { appLang } = useSelector((state) => state);
  const stringArray = findNewLine(description);
  const renderDescription = [];
  let buttonSection;
  const pandoraUser = isPandora(userInfo.company);

  stringArray.forEach((value, index) =>
    renderDescription.push(
      <p key={index} className={classes.description}>
        {value === "Thông tin của bạn" ? "" : value}
      </p>
    )
  );

  const [openPurchase, setOpenPurchase] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    success: false,
    error: "",
    orderDetails: { purchaserEmail: "", orderNo: "" },
  });
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (result.success || result.error) {
      setConfirm(true);
    }
  }, [result]);

  const openPurchaseModal = () => {
    const condition = !window.location.pathname.includes("/profile");
    condition && setOpenPurchase(true);
  };
  const closePurchaseModal = () => setOpenPurchase(false);
  const openLoad = () => setLoading(true);
  const closeLoad = () => setLoading(false);
  const closeConfirm = () => setConfirm(false);

  const data = {
    indicator: userInfo.userName,
    url: url,
    token: token,
    viewFrom: "storePage",
  };

  const findOutMore = () => {
    const condition = !window.location.pathname.includes("/profile");
    condition && api2.b2bLinkClicked(data);
    window.open(url);
  };

  const imageOnClick = () => {
    url ? findOutMore() : openPurchaseModal();
  };

  if (url) {
    buttonSection = (
      <div className={classes.buttonSection}>
        <div className={classes.btnInfo} onClick={findOutMore}>
          <h3>
            <i className="fas fa-angle-double-right"></i>{" "}
            {appLang.b2bText.findoutMore}
          </h3>
        </div>
        <div className={classes.btnPurchase} onClick={openPurchaseModal}>
          <h3>
            <i className="fas fa-shopping-cart"></i> {appLang.b2bText.purchase}
          </h3>
        </div>
      </div>
    );
  }

  if (!url) {
    buttonSection = (
      <div className={classes.buttonSection}>
        <div className={classes.btnInfo2} onClick={openPurchaseModal}>
          <h3>
            <i className="fas fa-shopping-cart"></i> {appLang.b2bText.purchase}
          </h3>
        </div>
      </div>
    );
  }

  if (pandoraUser) {
    buttonSection = (
      <div className={classes.buttonSection}>
        <div className={classes.btnInfoPandora} onClick={findOutMore}>
          <h3>
            <i className="fas fa-angle-double-right"></i>{" "}
            {appLang.b2bText.findoutMore}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img
          src={icon}
          alt=""
          onError={(event) => {
            event.target.src = icon;
          }}
          onClick={imageOnClick}
        />
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.productName}>
          <h3 className={classes.title}>{title}</h3>
          {!pandoraUser && (
            <h4 className={classes.price}>
              {formattedPrice} {appLang.b2bText.currency}
            </h4>
          )}
        </div>
        {renderDescription}
      </div>
      {buttonSection}
      {openPurchase && (
        <PurchaseForm
          closeModal={closePurchaseModal}
          productData={productData}
          openLoading={openLoad}
          closeLoading={closeLoad}
          setResult={setResult}
        />
      )}
      {loading && <ModalLoad h5text={appLang.modal.sending} show />}
      {confirm && (
        <PurchaseConfirm
          title={appLang.modal.purchaseSuccess}
          subtext={
            result.success
              ? `${appLang.modal.purchaseSubText} ${result.orderDetails.orderNo}${appLang.modal.purchaseSubText2} ${result.orderDetails.purchaserEmail}`
              : translate(result.error, appLanguage)
          }
          subtext2={appLang.modal.purchaseSubText3}
          closeText={appLang.retrieve.dismiss}
          error={!result.success}
          close={closeConfirm}
        />
      )}
      {(openPurchase || loading || confirm) && (
        <BackDrop closeModal={closePurchaseModal} show />
      )}
    </div>
  );
};

export default ProductCard;
