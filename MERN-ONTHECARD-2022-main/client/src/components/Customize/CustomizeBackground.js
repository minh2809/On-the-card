import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Flex, Box } from "reflexbox";
import classes from "./CustomizeBackground.module.css";

import * as api from "../../api/api";
import * as api2 from "../../api/api2";

import Backdrop from "../UI/Backdrop/Backdrop";
import ModalConfirm from "../UI/Modal/ModalConfirm/ModalConfirm";
import ModalLoad from "../UI/Modal/ModalLoad/ModalLoad";

import ColorOptions from "./ColorOptions";
import ColorOptionsEnterprise from "./Enterprise/ColorOptionsEnterprise";
import ColorOptionsStore from "./Store/ColorOptionsStore";

import StyleOptions from "./StyleOptions";
import StyleOptionsEnterPrise from "./Enterprise/StyleOptionEnterprise";
import StyleOptionStore from "./Store/StyleOptionStore";

import IconStyleOptions from "./IconStyleOptions";
import IconEnterprise from "./Enterprise/IconEnterprise";
import IconStore from "./Store/IconStore";

import BackgroundImage from "./BackgroundImage";
import BgImgEnterprise from "./Enterprise/BgImgEnterprise";
import BgImgStore from "./Store/BgImgStore";

import MainButton from "../UI/Button/MainButton/MainButton";
import { translate } from "../../language/backEndTranslate";
import { ADDSOClient } from "../../utilities/helper2";

export default function CustomizeBackground(props) {
  const { appLanguage, userInfo, token } = useSelector((state) => state);
  const { enterprisePage, storePage } = useSelector((state) => state);
  const { b2bActiveTab, appLang } = useSelector((state) => state);
  const appliedLanguage = appLang;
  const { customizePage } = appliedLanguage;

  const [loading, setLoading] = useState(false);
  const [modalRetrieveIsOpen, setModalRetrieveIsOpen] = useState(false);
  const [error, setError] = useState("");
  const noBgImg = ADDSOClient(userInfo.company);
  let flexConfigBgImg = [1, 1, 1 / 2];

  if (noBgImg) {
    flexConfigBgImg = [1];
  }

  const handleUpdateButton = async () => {
    setLoading(true);
    let res;
    switch (b2bActiveTab) {
      case 2:
        res = await api2.updateEnterprise(enterprisePage, token);
        break;
      case 3:
        res = await api2.updateStore(storePage, token);
        break;
      default:
        res = await api.updateInfo(userInfo, token);
        break;
    }
    setTimeout(() => {
      setModalRetrieveIsOpen(true);
      setLoading(false);
      setError(translate(res.data.error, appLanguage));
    }, 1000);
  };

  const closeModal = () => {
    setModalRetrieveIsOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.customizeArea}>
        <div className={classes.title}>
          <span>{customizePage.styleOptions}</span>
        </div>
        <Flex flexWrap="wrap">
          <Box width={1}>
            {b2bActiveTab === 1 && !noBgImg && (
              <ColorOptions Vietnamese={appLang} English={appLang} />
            )}
            {b2bActiveTab === 2 && !noBgImg && (
              <ColorOptionsEnterprise Vietnamese={appLang} English={appLang} />
            )}
            {b2bActiveTab === 3 && !noBgImg && (
              <ColorOptionsStore Vietnamese={appLang} English={appLang} />
            )}
          </Box>
          <Box width={flexConfigBgImg} py={[10, 20, 30]} pr={[10, 20, 30]}>
            {b2bActiveTab === 1 && (
              <BackgroundImage
                Vietnamese={appLang}
                English={appLang}
                noBgImg={noBgImg}
              />
            )}
            {b2bActiveTab === 2 && (
              <BgImgEnterprise
                Vietnamese={appLang}
                English={appLang}
                noBgImg={noBgImg}
              />
            )}
            {b2bActiveTab === 3 && (
              <BgImgStore Vietnamese={appLang} English={appLang} />
            )}
          </Box>
          <Box width={flexConfigBgImg} py={[10, 20, 30]}>
            <Flex flexWrap="wrap">
              <Box width={1} pb={30}>
                {b2bActiveTab === 1 && !noBgImg && (
                  <StyleOptions Vietnamese={appLang} English={appLang} />
                )}
                {b2bActiveTab === 2 && !noBgImg && (
                  <StyleOptionsEnterPrise
                    Vietnamese={appLang}
                    English={appLang}
                  />
                )}
                {b2bActiveTab === 3 && !noBgImg && (
                  <StyleOptionStore Vietnamese={appLang} English={appLang} />
                )}
              </Box>
              <Box width={1}>
                {b2bActiveTab === 1 && (
                  <IconStyleOptions Vietnamese={appLang} English={appLang} />
                )}
                {b2bActiveTab === 2 && (
                  <IconEnterprise Vietnamese={appLang} English={appLang} />
                )}
                {b2bActiveTab === 3 && (
                  <IconStore Vietnamese={appLang} English={appLang} />
                )}
              </Box>
            </Flex>
          </Box>
        </Flex>
        <div className={classes.saveButtonArea}>
          <MainButton
            type="button"
            onClick={handleUpdateButton}
            text={customizePage.updateButton}
          />
        </div>
      </div>
      <ModalConfirm
        show={modalRetrieveIsOpen}
        confirm={appliedLanguage.editPage.modal.confirm}
        subText={""}
        buttonText={appliedLanguage.editPage.modal.gotIt}
        close={closeModal}
        editPage={true}
        error={error}
      />
      <ModalLoad h5text={appliedLanguage.modal.pleaseWait} show={loading} />
      <Backdrop show={modalRetrieveIsOpen || loading} />
    </div>
  );
}
