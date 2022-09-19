import axios from "axios";
import { getDeviceData } from "../utilities/helper2";

// const baseURL = process.env.REACT_APP_DEV_URL;
// const baseURL = process.env.REACT_APP_PROD_URL;
const baseURL = process.env.REACT_APP_PROD_URL_CO;

const otcAPI = {
  authGetSerial: baseURL + "/accountOTC/authGetSerialNo",
  getLinkedTo: baseURL + "/fetchOTC/linkedSerial",
  b2bIsAdmin: baseURL + "/b2b/b2bIsAdmin",
  updateEnterprise: baseURL + "/b2b/updateEnterprise",
  updateStore: baseURL + "/b2b/updateStore",
  b2BPageView: baseURL + "/b2b/b2bPageView",
  b2bLinkClicked: baseURL + "/b2b/b2bLinkClicked",
  enableStore: baseURL + "/accountOTC/enableStore",
  enableGallery: baseURL + "/accountOTC/enableGallery",
  sendOrder: baseURL + "/b2b/sendOrder",
  sendOrderNotes: baseURL + "/b2b/sendOrderNotes",
  setPIN: baseURL + "/features/setPIN",
  updatePW: baseURL + "/features/updatePW",
};

export const loginGetSerial = async (pass) => {
  const res = await axios.post(otcAPI.authGetSerial, {
    password: pass,
  });
  return res.data;
};

export const getLinkedSerial = async (serialNo, token) => {
  const res = await axios.post(
    otcAPI.getLinkedTo,
    {
      serialNo: serialNo,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// use in UI/Boxes/LinkBox/LinkBoxPermission/LBPermission.js
export const b2bIsAdmin = async (serialNo, isAdmin, token) => {
  const res = await axios.post(
    otcAPI.b2bIsAdmin,
    {
      serialNo: serialNo,
      isAdmin: isAdmin,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const updateEnterprise = async (enterpriseInfo, token) => {
  const res = await axios.post(
    otcAPI.updateEnterprise,
    {
      enterpriseInfo: enterpriseInfo,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res;
};

export const updateStore = async (storeInfo, token) => {
  const res = await axios.post(
    otcAPI.updateStore,
    {
      storeInfo: storeInfo,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res;
};

// run in ViewPage.js
export const b2BPageView = async (viewFrom, token, indicator) => {
  const dataObject = await getDeviceData();
  const res = await axios.post(
    otcAPI.b2BPageView,
    {
      viewFrom: viewFrom,
      indicator: indicator,
      dataObject: dataObject,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// run in ViewPage.js
export const b2bLinkClicked = async (data) => {
  const dataObject = await getDeviceData();
  const res = await axios.post(
    otcAPI.b2bLinkClicked,
    {
      viewFrom: data.viewFrom,
      indicator: data.indicator,
      url: data.url,
      dataObject: dataObject,
    },
    { headers: { Authorization: `Bearer ${data.token}` } }
  );
  return res.data;
};

// enableStore in AppBar
export const enableStore = async (token, userName) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const query = { userName: userName };
  const result = await axios.post(otcAPI.enableStore, query, config);
  return result.data;
};

// enableGallery in AppBar
export const enableGallery = async (token, userName) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const query = { userName: userName };
  const result = await axios.post(otcAPI.enableGallery, query, config);
  return result.data;
};

// used in ./components/UI/Modals/MessageModal/PurchaseForm
export const sendOrder = async (orderData, productData, token) => {
  const res = await axios.post(
    otcAPI.sendOrder,
    {
      orderData: orderData,
      productData: productData,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// used in ./component/Message/NoteOrder
export const sendOrderNotes = async (msgID, message, token) => {
  const res = await axios.post(
    otcAPI.sendOrderNotes,
    {
      messageID: msgID,
      message: message,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const setPIN = async (PIN, token) => {
  const res = await axios.post(
    otcAPI.setPIN,
    {
      PIN: PIN,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const updatePW = async (oldPW, newPW, token) => {
  const res = await axios.post(
    otcAPI.updatePW,
    {
      oldPW: oldPW,
      newPW: newPW,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
