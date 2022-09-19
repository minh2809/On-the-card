import React, { useState, useEffect } from "react";
import classes from "./LinkBoxEdit.module.css";
import {
  loadDisplayIcon,
  loadBankIcon,
} from "../../../../utilities/helper_functions";
import IconUpOutline from "../../../../assets/icons/icon-up-outline.png";
import IconDownOutline from "../../../../assets/icons/icon-down-outline.png";
import IconEdit from "../../../../assets/icons/icon-edit-blue.png";
import IconTrash from "../../../../assets/icons/icon-trash_red.png";
import { Vietnamese, English } from "../../../../language/language";
import { useSelector, useDispatch } from "react-redux";
import { setRedirectLink } from "../../../../store/actionCreators";
import ON from "../../../../assets/other/ON.png";
import OFF from "../../../../assets/other/OFF.png";
import { isCABank } from "../../../../utilities/helper";

const LinkBoxEdit = (props) => {
  const { iconType, content, link, artistContent, desktopPreview } = props;
  const { btnUpClicked, deleteClicked, onEdit } = props;
  const { btnDownClicked, storeLB, styling, LBKey } = props;
  const { setThreeDotActive, threeDotActive } = props;

  const dispatch = useDispatch();
  const condition = iconType !== "url";
  const redirectOff =
    iconType === "mail" || iconType === "phoneNumber" || iconType === "bank";
  const iconBg = condition ? "#F6F6F6" : "";
  const LinkBoxStyle = [classes.LinkBox, styling && styling];
  const pStyle = [classes.p];
  const { appLanguage, userInfo } = useSelector((state) => state);
  const { iconStyle, redirectMode, redirectLink } = userInfo;
  const appLang = appLanguage === "VIETNAMESE" ? Vietnamese : English;
  const customImage = iconType.includes("http");
  const bankLink = iconType === "bank";
  const iconLoaded = bankLink
    ? loadBankIcon(iconStyle, content)
    : loadDisplayIcon(iconStyle, iconType);

  const [settingClicked, setSettingClicked] = useState(false);
  const [redirectOn, setRedirectOn] = useState(false);
  const [iconContainer, setIconContainer] = useState([classes.directIcon]);

  const customImg = [classes.customImage];
  const caBank = isCABank(content.toLowerCase().split(" ")[0]);

  if (storeLB) {
    customImg.push(classes.objectFit);
  }

  const toggleLBSetting = () => {
    settingClicked ? setThreeDotActive(0) : setThreeDotActive(LBKey);
  };

  const editing = () => {
    onEdit();
    setThreeDotActive(0);
  };

  const deleteLink = () => {
    deleteClicked();
    setThreeDotActive(0);
    dispatch(setRedirectLink(""));
  };

  if (desktopPreview) {
    LinkBoxStyle.push(classes.LinkBoxPreview);
    pStyle.push(classes.pPreview);
  }

  useEffect(() => {
    setSettingClicked(threeDotActive === LBKey);
    setRedirectOn(link === redirectLink);
    redirectMode &&
      !redirectOff &&
      setIconContainer([classes.directIcon, classes.directIconRedirect]);
    (!redirectMode || redirectOff) && setIconContainer([classes.directIcon]);
  }, [redirectLink, link, redirectOff, redirectMode, threeDotActive, LBKey]);

  const setRedirectUrl = () => {
    return dispatch(setRedirectLink(link));
  };

  /* *********************************************************** */

  return (
    <div className={LinkBoxStyle.join(" ")}>
      <div className={classes.socialIconWrapper}>
        {customImage && (
          <div className={customImg.join(" ")}>
            <img
              src={iconType}
              alt="url"
              onError={(event) => {
                event.target.src = iconType;
              }}
            />
          </div>
        )}
        {!customImage && (
          <div
            className={bankLink ? classes.iconPlateBanking : classes.iconPlate}
            style={{ backgroundColor: bankLink ? "white" : iconBg }}
          >
            {condition && (
              <img
                src={iconLoaded}
                className={
                  caBank
                    ? classes.caBankIcon
                    : bankLink
                    ? classes.socialIconBanking
                    : classes.socialIcon
                }
                alt="url"
              />
            )}
          </div>
        )}
      </div>

      <h2 className={classes.content}>
        <p className={pStyle.join(" ")}>{content}</p>
        <p className={pStyle.join(" ")}>{artistContent}</p>
      </h2>

      <div className={iconContainer.join(" ")}>
        <div onClick={btnUpClicked}>
          <img src={IconUpOutline} alt="" />
        </div>
        {redirectMode && !redirectOff && (
          <div onClick={setRedirectUrl}>
            <img src={redirectOn ? ON : OFF} alt="" />
          </div>
        )}
        <div onClick={btnDownClicked}>
          <img src={IconDownOutline} alt="" />
        </div>
      </div>
      <div className={classes.settingWrapper} onClick={toggleLBSetting}>
        {settingClicked ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
        )}
      </div>
      {settingClicked && (
        <div className={classes.settingListWrapper}>
          <div className={classes.settingListItem} onClick={editing}>
            <img src={IconEdit} className={classes.settingIcon} alt="" />
            <span className={classes.settingText}>
              {appLang.editPage.button.editLink}
            </span>
          </div>
          <div className={classes.settingListItem} onClick={deleteLink}>
            <img src={IconTrash} className={classes.settingIcon} alt="" />
            <span className={classes.settingText}>
              {appLang.editPage.button.delete}
            </span>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default LinkBoxEdit;
