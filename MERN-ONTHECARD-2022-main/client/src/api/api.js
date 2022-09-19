import axios from "axios";
import { Vietnamese } from "../language/language";
import { getDeviceData } from "../utilities/helper2";

// const baseURL = process.env.REACT_APP_DEV_URL;
// const baseURL = process.env.REACT_APP_PROD_URL;
const baseURL = process.env.REACT_APP_PROD_URL_CO;

const otcAPI = {
  validateSignUp: baseURL + "/accountOTC/validate",
  signUp: baseURL + "/accountOTC/signup",
  login: baseURL + "/accountOTC/login",
  forgotPw: baseURL + "/accountOTC/forgotPw",
  fetchBySerialNo: baseURL + "/fetchOTC",
  fetchBySerialNoPIN: baseURL + "/fetchOTC/pin/serialNo",
  fetchByUserName: baseURL + "/fetchOTC/username",
  fetchDataUserNamePIN: baseURL + "/fetchOTC/pin/username",
  updateInfo: baseURL + "/fetchOTC/update",
  getEmail: baseURL + "/accountOTC/getEmail",
  linkClickAnalytic: baseURL + "/analytic/linkClicked",
  getAnalyticData: baseURL + "/analytic/getAnalytic",
  sendMessage: baseURL + "/analytic/sendMessage",
  messageActions: baseURL + "/analytic/messageActions",
  activationActions: baseURL + "/analytic/activation",
};

export const validateSignUp = async (serialNo, userName, partnerName) => {
  try {
    const res = await axios.post(
      otcAPI.validateSignUp,
      {
        serialNo: serialNo,
        userName: userName,
        partnerName: partnerName || "",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SIGNUP_TOKEN}`,
        },
      }
    );
    return res;
  } catch (err) {
    alert("Lỗi xảy ra khi đăng ký (api validation error) !! Vui lòng thử lại.");
  }
};

export const registerUser = async (
  email,
  fullName,
  userName,
  serialNo,
  password,
  token,
  company,
  socialMediaList
) => {
  try {
    const res = await axios.post(
      otcAPI.signUp,
      {
        email,
        fullName,
        userName,
        serialNo,
        password,
        company: company || "",
        socialMediaList: socialMediaList !== undefined ? socialMediaList : [],
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data;
  } catch (err) {
    return {
      registered: false,
      error: "Lỗi khi đăng ký. Vui lòng thử lại (api sending error)",
    };
  }
};

export const login = async (email, password, loginToken) => {
  try {
    const res = await axios.post(
      otcAPI.login,
      {
        email: email,
        password: password,
        loginToken: loginToken,
      },
      { headers: { Authorization: process.env.REACT_APP_SIGNIN_TOKEN } }
    );
    return res.data;
  } catch (error) {
    return {
      loggedIn: false,
      error: Vietnamese.backendErrors.otherError + error.message,
      data: "",
      serialArray: [],
      analyticData: {},
      token: "",
      enterprisePage: {},
      storePage: {},
    };
  }
};

export const retrievePassword = async (email) => {
  const result = await axios.post(
    otcAPI.forgotPw,
    { email: email },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_FORGOTPW_TOKEN}`,
      },
    }
  );
  return result.data;
};

export const fetchDataBySerialNo = async (serialNo, fetchPage) => {
  const dataObject = await getDeviceData();
  const res = await axios.post(
    otcAPI.fetchBySerialNo,
    {
      serialNo: serialNo,
      fetchPage: fetchPage,
      dataObject: dataObject,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_FETCHSERIALNO_TOKEN}`,
      },
    }
  );
  return res;
};

export const adminFetchDataSerialNo = async (serialNo, token) => {
  const dataObject = await getDeviceData();
  const res = await axios.post(
    otcAPI.fetchBySerialNo,
    {
      serialNo: serialNo,
      fetchPage: false,
      dataObject: dataObject,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchBySerialNoPIN = async (serialNo, PIN, token) => {
  const dataObject = await getDeviceData();
  const res = await axios.post(
    otcAPI.fetchBySerialNoPIN,
    {
      serialNo: serialNo,
      fetchPage: true,
      PINProvided: PIN,
      dataObject: dataObject,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const fetchDataByUserName = async (userName, isProfile, tabId) => {
  const activeTab = tabId ? tabId : "1";
  const dataObject = await getDeviceData();
  const res = await axios.post(
    otcAPI.fetchByUserName,
    {
      userName: userName,
      isProfile: isProfile ? true : false,
      tabId: activeTab,
      dataObject: dataObject,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_FETCHUSERNAME_TOKEN}`,
      },
    }
  );
  return res;
};

export const fetchDataUserNamePIN = async (
  userName,
  isProfile,
  tabId,
  PIN,
  token
) => {
  const activeTab = tabId ? tabId : "1";
  const dataObject = await getDeviceData();

  const res = await axios.post(
    otcAPI.fetchDataUserNamePIN,
    {
      userName: userName,
      isProfile: isProfile ? true : false,
      tabId: activeTab,
      PINProvided: PIN,
      dataObject: dataObject,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const updateInfo = async (userInfo, token) => {
  const res = await axios.post(
    otcAPI.updateInfo,
    {
      userInfo: userInfo,
      token: token,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res;
};

export const getEmail = async (userName) => {
  const res = await axios.post(
    otcAPI.getEmail,
    {
      userName: userName,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GETEMAIL_TOKEN}`,
      },
    }
  );
  return res.data;
};

export const linkClicked = async (url, userName, token) => {
  try {
    const dataObject = await getDeviceData();
    const res = await axios.post(
      otcAPI.linkClickAnalytic,
      {
        url: url,
        userName: userName,
        dataObject: dataObject,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Lỗi xảy ra khi thêm link vào Analytic (api validation error)",
    };
  }
};

/*
  Used in ./components/Analytic/Analytic.js
*/
export const getAnalyticData = async (token) => {
  try {
    const res = await axios.post(
      otcAPI.getAnalyticData,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Lỗi xảy ra khi cập nhật thông tin (api validation error)",
    };
  }
};

/*
  Used in ./components/UI/Modal/MessageModal/MessageModal.js
*/
export const sendMessage = async (
  fullName,
  email,
  phoneNumber,
  message,
  sendEmail,
  token
) => {
  try {
    const res = await axios.post(
      otcAPI.sendMessage,
      {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        message: message,
        sendEmail: sendEmail,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Lỗi xảy ra khi cập nhật thông tin (api validation error)",
    };
  }
};

export const messageActions = async (type, id, token) => {
  const res = await axios.post(
    otcAPI.messageActions,
    {
      actionType: type,
      messageId: id,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const activationActions = async (type, token) => {
  const res = await axios.post(
    otcAPI.activationActions,
    {
      actionType: type,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
