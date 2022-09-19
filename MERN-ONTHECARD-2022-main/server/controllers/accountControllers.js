import jwt from "jsonwebtoken";
import SerialNumber from "../models/serialNoModel.js";
import User from "../models/usersModel.js";
import Analytic from "../models/analyticModel.js";
import Message from "../models/messageModel.js";
import Store from "../models/storeModel.js";
import Enterprise from "../models/enterpriseModel.js";
import StoreAnalytic from "../models/storeAnalyticModel.js";
import CompanyAnalytic from "../models/companyAnalyticModel.js";

import { Vietnamese, English } from "../language/language.js";
import { generateToken } from "../util/generateToken.js";
import { getLoginToken } from "../util/generateToken.js";
import { sortMessage, firebaseLogin } from "../util/helper.js";
import { forgotPwFirebase } from "../util/helper.js";
import { authUser, getB2BEmployee } from "../util/helper2.js";
import { getAdminMessage } from "../util/helper2.js";
import { registerUserHelper } from "../util/helper3.js";

import { decrypt } from "../util/encrypt.js";
import Gallery from "../models/galleryModel.js";

const validateSerialNoUserName = async (req, res, next) => {
  const { serialNo, userName, partnerName } = req.body;
  const token = generateToken(serialNo);

  try {
    const serialRecord = await SerialNumber.find({
      serialNo: serialNo,
      cardRegistered: true,
    });
    const registeredSerialRecord = await SerialNumber.find({
      serialNo: serialNo,
      userRegistered: true,
    });
    const userRecord = await User.find({ userName: userName });

    if (serialRecord.length === 0) {
      const errorMessage = Vietnamese.validate.serialNotExist;
      return res.json({ error: errorMessage, token: "" });
    } else if (registeredSerialRecord.length > 0) {
      const errorMessage = Vietnamese.validate.serialRegistered;
      return res.json({ error: errorMessage, token: "" });
    } else if (userRecord.length > 0) {
      const errorMessage = Vietnamese.validate.userName;
      return res.json({ error: errorMessage, token: "" });
    } else if (partnerName) {
      const errorMessage = Vietnamese.validate.serialInvalid;
      if (serialRecord[0].partner !== partnerName)
        return res.json({ error: errorMessage, token: "" });
    }

    return res.json({ error: "", token: token });
  } catch (error) {
    res.json({ error: Vietnamese.validate.validatingError, token: "" });
  }
};

const registerUser = async (req, res, next) => {
  const { serialNo } = req.body;
  const decodedSerial = req.serialNo;

  if (decodedSerial !== serialNo) {
    return res.json({
      registered: false,
      error: Vietnamese.fetchData.invalidToken,
    });
  } else {
    const returnData = await registerUserHelper(req.body);
    return res.json(returnData);
  }
};

const fetchInfoLogin = async (req, res, next) => {
  let email, password;

  if (req.body.loginToken) {
    const oldLoginToken = req.body.loginToken;
    const decryptedToken = jwt.verify(oldLoginToken, process.env.JWT_SECRET);

    email = decrypt(decryptedToken.email);
    password = decrypt(decryptedToken.password);
  } else {
    email = req.body.email;
    password = req.body.password;
  }

  const token = req.headers.authorization;
  const result = await firebaseLogin(email, password);
  const loginToken = getLoginToken(email, password);

  if (!result.loggedIn) {
    return res.json(result);
  }

  if (token !== process.env.SIGNIN_TOKEN) {
    res.json({
      loggedIn: false,
      error: Vietnamese.fetchData.invalidToken,
      data: "",
      serialArray: [],
      messageData: [],
      analyticData: {},
      enterprisePage: {},
      storePage: {},
    });
  } else {
    try {
      const result = await User.find({ email: email });
      const serialNoArray = [];
      const analyticData = await Analytic.find({
        serialNo: result[0].serialNo,
      });
      const messages = await Message.find({
        serialNo: result[0].serialNo,
        isDeleted: false,
      });

      const messageData = await getAdminMessage(messages, result[0]);

      await User.findByIdAndUpdate(
        result[0]._id,
        { signInAt: Date.now() },
        { new: true, useFindAndModify: false }
      );

      if (result.length >= 3) {
        result.map((value) =>
          serialNoArray.push({
            serialNo: value.serialNo,
            fullName: value.fullName,
            userName: value.userName,
            avatar: value.avatarURL,
          })
        );
        return res.json({
          loggedIn: true,
          error: "",
          data: result[0],
          serialArray: serialNoArray,
          analyticData: {},
          messageData: sortMessage(messageData),
          token: generateToken(result[0]._id),
          loginToken: loginToken,
          enterprisePage: {},
          storePage: {},
        });
      }

      let galleryData = {};
      if (result[0].galleryActivated) {
        galleryData = await Gallery.findOne({ userName: result[0].userName });
      }

      if (result[0].isAdmin) {
        const query = { company: result[0].company };
        const employee = await User.find(query);
        const employeeData = getB2BEmployee(employee);
        const enterprisePage = await Enterprise.findOne({
          company: result[0].company,
        });
        const storePage = await Store.findOne(query);
        const storeAnalytic = await StoreAnalytic.findOne(query);
        const companyAnalytic = await CompanyAnalytic.findOne(query);

        return res.json({
          loggedIn: true,
          error: "",
          data: result[0],
          serialArray: employeeData,
          analyticData: analyticData[0],
          messageData: sortMessage(messageData),
          token: generateToken(result[0]._id),
          loginToken: loginToken,
          enterprisePage: enterprisePage,
          storePage: storePage,
          storeAnalytic: storeAnalytic,
          companyAnalytic: companyAnalytic,
          galleryData: galleryData,
        });
      }

      let storeData = {};
      if (result[0].storeActivated) {
        storeData = await Store.findOne({ company: result[0].userName });
      }

      res.json({
        loggedIn: true,
        error: "",
        data: result[0],
        serialArray: [],
        analyticData: analyticData[0],
        messageData: sortMessage(messageData),
        token: generateToken(result[0]._id),
        loginToken: loginToken,
        enterprisePage: {},
        storePage: storeData,
        galleryData: galleryData,
      });
    } catch (error) {
      if (error.message.includes(English.backendErrors.noRecord)) {
        res.json({
          loggedIn: false,
          error: English.backendErrors.noRecordAlert,
          data: "",
          serialArray: [],
          analyticData: {},
          messageData: [],
          enterprisePage: {},
          storePage: {},
        });
      } else {
        res.json({
          loggedIn: false,
          error: English.backendErrors.otherError + error.message,
          data: "",
          serialArray: [],
          analyticData: {},
          messageData: [],
          enterprisePage: {},
          storePage: {},
        });
      }
    }
  }
};

const getEmail = async (req, res, next) => {
  const { userName } = req.body;
  try {
    const result = await User.find({ userName: userName });
    let email = result[0].email;
    res.json({ success: true, error: "", email: email });
  } catch (error) {
    res.json({
      success: false,
      error: Vietnamese.login.userNameNotFound,
      email: "",
    });
  }
};

const authGetSerial = async (req, res, next) => {
  const { password } = req.body;
  const authenticated = authUser(password);
  const token = generateToken(password);
  authenticated
    ? res.json({ success: true, token: token })
    : res.json({ success: false, token: "" });
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const result = await forgotPwFirebase(email);
  res.json(result);
};

const enableStore = async (req, res, next) => {
  const { _id, storeActivated, userName } = req.userData;
  const newStore = new Store({
    company: userName,
    name: Vietnamese.other.storePageTitle,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  const storeAnalytic = new StoreAnalytic({
    company: userName,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  if (storeActivated) {
    return res.json({
      success: false,
      error: Vietnamese.other.alreadyActivated,
    });
  }

  try {
    await newStore.save();
    await storeAnalytic.save();
    await User.findByIdAndUpdate(
      _id,
      { storeActivated: true },
      { new: true, useFindAndModify: false }
    );

    return res.json({ success: true, error: "", storeData: newStore });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

const activateGallery = async (req, res, next) => {
  const { _id, userName, fullName, avatarURL, bio } = req.userData;
  const { galleryActivated } = req.userData;
  const currentTime = Date.now();

  if (galleryActivated) {
    return res.json({
      success: false,
      error: Vietnamese.other.galleryActivated,
    });
  }

  const newGallery = new Gallery({
    userName: userName,
    fullName: fullName,
    avatarURL: avatarURL,
    bio: bio,
    createdAt: currentTime,
    updatedAt: currentTime,
  });

  try {
    await newGallery.save();

    await User.findByIdAndUpdate(
      _id,
      { galleryActivated: true },
      { new: true, useFindAndModify: false }
    );

    return res.json({ success: true, error: "", galleryData: newGallery });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

export { validateSerialNoUserName, registerUser, forgotPassword };
export { fetchInfoLogin, getEmail, authGetSerial, enableStore };
export { activateGallery };
