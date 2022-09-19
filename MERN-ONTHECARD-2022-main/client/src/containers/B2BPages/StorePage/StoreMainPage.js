import React from "react";
import classes from "./Store.module.css";
import StoreHeader from "../../../components/Boxes/StoreHeader/StoreHeader";
import { Vietnamese, English } from "../../../language/language";
import MainButton from "../../../components/UI/Button/MainButton/MainButton";
import ProductCard from "../../../components/UI/Cards/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const StoreMainPage = () => {
  const { storePage } = useSelector((state) => state);
  const { appLanguage } = useSelector((state) => state);
  const { avatarImg, avatarURL, company } = storePage;
  const avatarImage = avatarURL ? avatarURL : avatarImg;
  const languageChosen = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const history = useHistory();

  const editProfileHandler = () => {
    history.replace("/profile/edit");
  };

  if (!company) {
    history.push("/signin");
  }

  // const advancedProfileHandler = () => {
  //   history.replace("/profile/advanced/0");
  // };

  let listItems;
  if (storePage.products) {
    listItems = storePage.products.map((value, index) => {
      return <ProductCard productData={value} key={index} />;
    });
  }

  return (
    <div className={classes.MainPage}>
      <StoreHeader
        buttonShow={true}
        avatar={avatarImage}
        userFullName={storePage.name}
        userBio={storePage.bio}
        userInfo={storePage}
      />
      <div className={classes.buttonContainer}>
        <MainButton
          text={languageChosen.profile.button.edit}
          onClick={editProfileHandler}
          editPage={true}
        >
          <i className="fas fa-pen"></i>
          {"  "}
        </MainButton>
        <div className={classes.divider}></div>
        {/* <AdvancedButton onClick={advancedProfileHandler}>
          <i className="fas fa-chart-bar"></i>
          {"   " + languageChosen.profile.button.advanced}
        </AdvancedButton> */}
      </div>
      <div className={classes.productList}>{listItems}</div>
    </div>
  );
};

export default StoreMainPage;
