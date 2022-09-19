import axios from "axios";

const baseURL = process.env.REACT_APP_DEV_URL;
// const baseURL = process.env.REACT_APP_PROD_URL;
const otcAPI = {
  authenticate: baseURL + "/techsupport/authUser",
  error1: baseURL + "/techsupport/error1",
  error2: baseURL + "/techsupport/error2",
  error3: baseURL + "/techsupport/error3",
  error5and6: baseURL + "/techsupport/error5and6",
};

export const authUser = async (password) => {
  try {
    const res = await axios.post(
      otcAPI.authenticate,
      {
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AUTHUSER}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    return {
      success: false,
      message:
        "Lỗi xảy ra khi gửi request (api validation error) !! Vui lòng thử lại.",
      token: "",
    };
  }
};

export const fixError1 = async (serialNo, password, token) => {
  try {
    const res = await axios.post(
      otcAPI.error1,
      {
        serialNo: serialNo,
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    return {
      success: false,
      message:
        "Lỗi xảy ra khi gửi request (api validation error) !! Vui lòng thử lại.",
    };
  }
};

export const fixError2 = async (serialNo, userName, token) => {
  try {
    const res = await axios.post(
      otcAPI.error2,
      {
        serialNo: serialNo,
        userName: userName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    return {
      success: false,
      message:
        "Lỗi xảy ra khi gửi request (api validation error) !! Vui lòng thử lại.",
    };
  }
};

export const fixError3 = async (serialNo, newSerialNo, token, meToCo) => {
  try {
    const res = await axios.post(
      otcAPI.error3,
      {
        serialNo: serialNo,
        newSerialNo: newSerialNo,
        meToCo: meToCo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    return {
      success: false,
      message:
        "Lỗi xảy ra khi gửi request (api validation error) !! Vui lòng thử lại.",
    };
  }
};

export const executee5and6 = async (userName, actionType, token) => {
  try {
    const res = await axios.post(
      otcAPI.error5and6,
      {
        userName: userName,
        actionType: actionType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    return {
      success: false,
      message:
        "Lỗi xảy ra khi gửi request (api validation error) !! Vui lòng thử lại.",
    };
  }
};
