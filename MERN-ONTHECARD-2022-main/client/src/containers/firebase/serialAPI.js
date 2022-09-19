import axios from "axios";

// const baseURL = process.env.REACT_APP_DEV_URL;
// const baseURL = process.env.REACT_APP_PROD_URL;
const baseURL = process.env.REACT_APP_PROD_URL_CO;

const urlLink = {
  addSerialNo: baseURL + "/serialNo",
  fetchByAmount: baseURL + "/serialNo/fetchRegister",
  registerSerial: baseURL + "/serialNo/registerSerial",
};

export const addSerialNo = async (serialArray, token) => {
  try {
    const res = await axios.post(
      urlLink.addSerialNo,
      {
        serialArray: serialArray,
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
      message: "",
      error: "Lỗi xảy ra khi gửi request thêm số thẻ !! Vui lòng thử lại.",
    };
  }
};

export const fetchByAmount = async (amount, token) => {
  try {
    const res = await axios.post(
      urlLink.fetchByAmount,
      { amount: amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return {
      success: false,
      serialArray: "",
      error: "Lỗi xảy ra khi gửi request lấy số thẻ !! Vui lòng thử lại.",
    };
  }
};

export const registerSerial = async (chosenSerial, token) => {
  try {
    const res = await axios.post(
      urlLink.registerSerial,
      {
        serialArray: chosenSerial,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Lỗi xảy ra khi gửi request lấy số thẻ !! Vui lòng thử lại.",
    };
  }
};
