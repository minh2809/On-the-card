import SerialNumber from "../models/serialNoModel.js";
import User from "../models/usersModel.js";
import { Vietnamese } from "../language/language.js";
import Analytic from "../models/analyticModel.js";
import LinkedSerialNo from "../models/linkedSerialModel.js";
import Enterprise from "../models/enterpriseModel.js";
import Store from "../models/storeModel.js";
import { viewPageInc, fetchPageInc } from "../util/analyticHelper.js";
import { generateToken } from "../util/generateToken.js";
import { sortMessage, encryptText } from "../util/helper.js";
import Message from "../models/messageModel.js";

// Function to link a Serial No to another (within .me domain)
// Used in supportController.js
export const linkSerialNo = async (parameters) => {
  const { serialNo, newSerialNo } = parameters;
  const filter1 = { serialNo: serialNo };
  const filter2 = { serialNo: newSerialNo };

  try {
    const oldUser = await User.findOne(filter1);
    const newUser = await User.findOne(filter2);
    const newSerial = await SerialNumber.findOne(filter2);

    if (!oldUser) {
      return {
        success: false,
        message: `Mã Số Thẻ Cũ không có trong hệ thống hoặc chưa được đăng ký`,
      };
    }

    if (!newSerial) {
      return {
        success: false,
        message: `Mã Số Thẻ Mới không có trong hệ thống. Vui lòng thử lại`,
      };
    } else {
      if (!newSerial.cardRegistered) {
        return {
          success: false,
          message: `Mã Số Thẻ Mới chưa được cấp phép bởi ONTHECARD`,
        };
      }
    }

    if (newUser) {
      return {
        success: false,
        message: `Mã Số Thẻ Mới đã được đăng ký. Reset lại Mã Số Thẻ Mới để hoàn thành tác vụ này`,
      };
    }

    const newLinked = new LinkedSerialNo({
      serialNo: newSerialNo,
      linkTo: serialNo,
      createdAt: newSerial.createdAt,
      takenAt: newSerial.takenAt,
      linkedAt: Date.now(),
    });

    await newLinked.save();

    await SerialNumber.findOneAndDelete(filter2);

    return {
      success: true,
      message:
        "Mã Số Thẻ / POPON mới đã được liên kết với mã số thẻ cũ. Vui lòng báo lại với khách hàng",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Function to link a .me serial no to .co serial no
// Used in supportController.js
export const linkSerialNoToCo = async (parameters) => {
  const { serialNo, newSerialNo } = parameters;
  const filter1 = { serialNo: serialNo };

  try {
    const oldSerial = await SerialNumber.findOne(filter1);

    if (!oldSerial) {
      return {
        success: false,
        message: `Mã Số Thẻ Cũ không có trong hệ thống`,
      };
    } else {
      if (!oldSerial.cardRegistered) {
        return {
          success: false,
          message: `Mã Số Thẻ Cũ chưa được đăng ký bởi ONTHECARD`,
        };
      }
      if (oldSerial.userRegistered) {
        return {
          success: false,
          message: `Vui lòng reset thẻ này trước khi link đến mã số thẻ của onthecard.co`,
        };
      }
    }

    const newLinked = new LinkedSerialNo({
      serialNo: serialNo,
      linkTo: `https://onthecard.co/fetch/${newSerialNo}`,
      meToCo: true,
      createdAt: oldSerial.createdAt,
      takenAt: oldSerial.takenAt,
      linkedAt: Date.now(),
    });

    await newLinked.save();

    await SerialNumber.findOneAndDelete(filter1);

    return {
      success: true,
      message: `Mã Số Thẻ ${serialNo} đã được link đến đường link: https://onthecard.co/fetch/${newSerialNo}`,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Used in fetchControllers.js
export const fetchUserName = async (parameters) => {
  const { userName, isProfile, tabId, PINProvided } = parameters;
  const { dataObject } = parameters;
  try {
    const tokenKey = encryptText(userName);
    const result = await User.find({ userName: userName });
    const analyticData = await Analytic.find({ userName: userName });
    let storePage = {};
    let enterprisePage = {};

    if (result.length === 0) {
      return {
        success: false,
        needPIN: false,
        error: Vietnamese.fetchData.noUserName,
        data: {},
        fetched: true,
        analyticData: {},
        enterprisePage: {},
        storePage: {},
        token: "",
      };
    }

    if (result[0].PIN && !PINProvided) {
      return {
        success: false,
        error: "",
        needPIN: true,
        token: generateToken(tokenKey),
      };
    }

    if (result[0].PIN && PINProvided) {
      if (result[0].PIN !== PINProvided) {
        return {
          success: false,
          error: "Mật Mã Không Đúng. Vui Lòng Nhập Lại",
          needPIN: true,
          token: generateToken(tokenKey),
        };
      }
    }

    if (result[0].company) {
      enterprisePage = await Enterprise.findOne({
        company: result[0].company,
      });
      storePage = await Store.findOne({ company: result[0].company });
    }

    if (result[0].storeActivated) {
      storePage = await Store.findOne({ company: result[0].userName });
    }

    if (analyticData.length > 0 && !isProfile) {
      await viewPageInc(analyticData, tabId, dataObject);
    }

    return {
      success: true,
      needPIN: false,
      error: "",
      data: result[0],
      fetched: true,
      analyticData: analyticData[0],
      enterprisePage: enterprisePage,
      storePage: storePage,
      token: generateToken(tokenKey),
    };
  } catch (error) {
    return {
      success: false,
      needPIN: false,
      error: Vietnamese.fetchData.errorHappens + error.message,
      data: {},
      fetched: true,
      analyticData: {},
      enterprisePage: {},
      storePage: {},
      token: "",
    };
  }
};

// Use In fetchControllers.js
export const fetchSerialNo = async (parameters) => {
  const { serialNo, fetchPage, PINProvided } = parameters;
  const { dataObject } = parameters;

  try {
    let storePage = {};
    let enterprisePage = {};
    const result = await SerialNumber.find({ serialNo: serialNo });
    const analyticData = await Analytic.find({ serialNo: serialNo });
    const messageData = await Message.find({ serialNo: serialNo });

    if (result.length === 0) {
      return {
        success: false,
        needPIN: false,
        error: Vietnamese.fetchData.serialNotExist,
        data: {},
        fetched: true,
        analyticData: {},
        enterprisePage: {},
        storePage: {},
        messageData: [],
        token: "",
        partner: "",
      };
    } else if (!result[0].userName) {
      return {
        success: false,
        needPIN: false,
        error: Vietnamese.fetchData.notRegistered,
        data: {},
        fetched: true,
        analyticData: {},
        enterprisePage: {},
        storePage: {},
        messageData: [],
        token: "",
        partner: result[0].partner,
      };
    }

    const userData = await User.find({ userName: result[0].userName });
    if (userData.length === 0) {
      return {
        success: false,
        needPIN: false,
        error: Vietnamese.fetchData.systemError,
        data: {},
        fetched: true,
        analyticData: {},
        enterprisePage: {},
        storePage: {},
        messageData: [],
        token: "",
        partner: "",
      };
    }

    const tokenKey = fetchPage
      ? encryptText(result[0].userName)
      : result[0].userName;

    if (userData[0].PIN && !PINProvided && fetchPage) {
      return {
        success: false,
        error: "",
        needPIN: true,
        token: generateToken(tokenKey),
        partner: "",
      };
    }

    if (userData[0].PIN && PINProvided && fetchPage) {
      if (userData[0].PIN !== PINProvided) {
        return {
          success: false,
          error: "Mật Mã Không Đúng. Vui Lòng Nhập Lại",
          needPIN: true,
          token: generateToken(tokenKey),
          partner: "",
        };
      }
    }

    if (userData[0].company) {
      enterprisePage = await Enterprise.findOne({
        company: userData[0].company,
      });
      storePage = await Store.findOne({ company: userData[0].company });
    }

    if (userData[0].storeActivated) {
      storePage = await Store.findOne({ company: userData[0].userName });
    }

    if (analyticData.length > 0 && fetchPage) {
      await fetchPageInc(analyticData, dataObject);
    }

    return {
      success: true,
      needPIN: false,
      error: "",
      fetched: true,
      data: userData[0],
      analyticData: analyticData[0],
      enterprisePage: enterprisePage,
      storePage: storePage,
      messageData: !fetchPage ? sortMessage(messageData) : [],
      token: generateToken(tokenKey),
      partner: "",
    };
  } catch (error) {
    return {
      success: false,
      needPIN: false,
      error: Vietnamese.fetchData.errorHappens + error.message,
      data: {},
      fetched: true,
      analyticData: {},
      enterprisePage: {},
      storePage: {},
      messageData: [],
      token: "",
    };
  }
};
