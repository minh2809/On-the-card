import React, { useState, useEffect } from "react";
import classes from "./DropDownList.module.css";
import { renderList, renderBankList } from "../../../utilities/render_list";
import { verifyPremiumFunctions } from "../../../utilities/premiumUser";
import { useSelector } from "react-redux";
import {
  isVietBank,
  isCABank,
  bankIconSquare,
  coBankChosen,
} from "../../../utilities/helper";
import { isBankAccount } from "../../../utilities/helper2";

const DropDownList = (props) => {
  const { appLang, userInfo, b2bActiveTab } = useSelector((state) => state);
  const { company, userName } = userInfo;
  const { bankList, modalShow } = props;

  const [selected, setSelected] = useState(
    appLang.editPage.dropDown.selectAccount
  );
  const [dropDownClicked, setDropDownClicked] = useState(false);
  const [optionChosen, setOptionChosen] = useState(false);
  const [selectedSocialIcon, setSelectedSocialIcon] = useState("");

  const renderlanguage = appLang;
  const optionsContainerClasses = [classes.optionsContainer];
  const selectedText = selected.toLowerCase();
  const condition = isBankAccount(selectedText);

  const premiumList = verifyPremiumFunctions(userName);

  const conditionn1 = coBankChosen(selected);

  if (dropDownClicked) {
    optionsContainerClasses.push(classes.active);
  }
  if (optionChosen && optionsContainerClasses.length === 2) {
    optionsContainerClasses.pop();
  }

  const itemList = bankList
    ? renderBankList()
    : renderList(renderlanguage, company, premiumList, b2bActiveTab);

  const optionClickHandler = (objectValue) => {
    const condition =
      objectValue.content === renderlanguage.editPage.dropDown.banking;

    props.optionChosen(objectValue.content);

    if (condition) {
      setSelected(objectValue.content);
      setSelectedSocialIcon("");
    } else {
      setSelected(objectValue.content);
      setSelectedSocialIcon(objectValue.icon);
      setOptionChosen(true);
      setDropDownClicked(true);
    }
  };

  const selectClicked = () => {
    setDropDownClicked(!dropDownClicked);
    setOptionChosen(false);
  };

  const list = itemList.map((objectValue, index) => {
    const { key } = objectValue;
    let newFeature = false;
    if (!company) {
      newFeature =
        key === "instagramembed" || key === "tiktokembed" || key === "file";
    }

    const condition1 = isVietBank(key) && bankList;
    const condition2 = isCABank(key) && bankList;
    const condition3 = bankIconSquare(key) && bankList;

    return (
      <div
        className={bankList ? classes.optionBank : classes.option}
        key={key}
        onClick={() => optionClickHandler(objectValue)}
      >
        {objectValue.icon && (
          <img
            src={objectValue.icon}
            className={
              condition1
                ? classes.bankIconME
                : condition2
                ? classes.bankIconCO
                : condition3
                ? classes.bankIconSquare
                : classes.socialIcon
            }
            alt="social-icon"
          />
        )}
        {!bankList && (
          <input
            type="radio"
            className={classes.radio}
            id={key}
            name="category"
          />
        )}
        {!bankList && <label htmlFor={key}>{objectValue.content}</label>}
        {newFeature && (
          <div className={classes.newFeature}>
            {renderlanguage.editPage.dropDown.new}
          </div>
        )}
      </div>
    );
  });

  useEffect(() => {
    if (!modalShow) {
      setSelected(appLang.editPage.dropDown.selectAccount);
      setDropDownClicked(false);
      setOptionChosen(false);
      setSelectedSocialIcon("");
    }
  }, [modalShow, appLang, props.optionChosen]);

  return (
    <div className={classes.container}>
      <div className={classes.selectBox}>
        <div className={optionsContainerClasses.join(" ")}>{list}</div>
        <div className={classes.selected} onClick={selectClicked}>
          {!condition && selected}
          {selectedSocialIcon && (
            <div
              className={
                bankList
                  ? classes.selectedBankWrapper
                  : classes.selectedSocialIconWrapper
              }
            >
              <img
                src={selectedSocialIcon}
                className={
                  conditionn1
                    ? classes.selectedBankCo
                    : bankList
                    ? classes.selectedBank
                    : classes.selectedSocialIcon
                }
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropDownList;
