import React, { useState, useEffect } from "react";
import classes from "./ModalQR.module.css";
import QRCode from "qrcode.react";
import { useSelector } from "react-redux";
import { copyToClipboard } from "../../../../utilities/helper_functions";
import CloseModalButton from "../../Button/CloseModal/CloseModal";
import DisplayTextBox from "../../TextBox/DisplayTextBox/DisplayTextBox";
import { specialUsers } from "../../../../utilities/helper";

const ModalQR = ({ show, closeModal }) => {
  const [copied, setCopied] = useState(false);
  const { userInfo, appLang } = useSelector((state) => state);
  const { userName, fullName } = userInfo;
  const chosenLanguage = appLang;
  const condition = specialUsers(userName);

  const allowDownload = window.location.pathname.includes("profile");

  const fullLink = `${window.location.origin}/${userName}`;
  const shortLink = fullLink.slice(fullLink.indexOf("//") + 2, fullLink.length);

  useEffect(() => {
    !show && setCopied(false);
  }, [show]);

  const copyLink = () => {
    setCopied(true);
    return copyToClipboard(fullLink);
  };

  const downloadQR = () => {
    const canvas = document.getElementById("qrCodeOTC");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QR - ONTHECARD.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className={show ? classes.modalContainer : classes.modalClose}>
      <div className={classes.closeModalWrapper} onClick={closeModal}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </div>
      <h3 className={classes.titleStyle}>
        {chosenLanguage.viewPage.titleQRModal} <br />{" "}
        {chosenLanguage.viewPage.subQRModal}{" "}
        <span className={classes.nameStyle}>
          {condition ? "Chúng Tôi" : fullName}
        </span>
      </h3>
      <p className={classes.subtitleStyle}>
        {chosenLanguage.viewPage.subtitleQR}
      </p>
      <div className={classes.QRCodeContainer}>
        <QRCode
          value={fullLink}
          level="L"
          className={classes.QRCode}
          id="qrCodeOTC"
        />
      </div>

      <DisplayTextBox
        content={shortLink}
        copyClicked={copyLink}
        copied={copied}
        copiedText={chosenLanguage.editPage.button.copied}
        copyText={chosenLanguage.editPage.button.copy}
      />

      <div className={classes.btnContainer}>
        {allowDownload && (
          <CloseModalButton
            closeModal={downloadQR}
            buttonText={chosenLanguage.retrieve.downloadQR}
          />
        )}
        <CloseModalButton
          closeModal={closeModal}
          buttonText={chosenLanguage.retrieve.dismiss}
        />
      </div>
    </div>
  );
};

export default ModalQR;
