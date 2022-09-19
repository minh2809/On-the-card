import React from "react";
import classes from "./ProductCard.module.css";
import { Vietnamese, English } from "../../../../../language/language";
import { useSelector } from "react-redux";
import { findNewLine } from "../../../../../utilities/string_manipulation";
import { isPandora } from "../../../../../utilities/helper2";

const ProductCard = (props) => {
  const { productData } = props;
  const { icon, title, description, price, url } = productData;
  var nf = new Intl.NumberFormat();
  const formattedPrice = nf.format(price);
  const { appLanguage, userInfo } = useSelector((state) => state);
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
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

  const findOutMore = () => {
    url && window.open(url);
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
        <div className={classes.btnPurchase}>
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
        <div className={classes.btnInfo2}>
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
        {icon && (
          <img
            src={icon}
            alt=""
            onError={(event) => {
              event.target.src = icon;
            }}
            onClick={findOutMore}
          />
        )}
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
    </div>
  );
};

export default ProductCard;
