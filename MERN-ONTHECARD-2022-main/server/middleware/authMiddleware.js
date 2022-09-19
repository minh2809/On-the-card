import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/usersModel.js";
// import SerialNumber from "../models/serialNoModel.js";
// import Message from "../models/messageModel.js";
import { Vietnamese } from "../language/language.js";
import mongoose from "mongoose";
import { decryptText } from "../util/helper.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const ObjectID = mongoose.Types.ObjectId;
      let userData;

      /*
        If true > request send from regular user
        (Token is User ID)
        If false > request sent from B2B user
        (Token is UserName)
      */
      if (ObjectID.isValid(decoded.id)) {
        userData = await User.findById(decoded.id);
      } else {
        userData = await User.findOne({ userName: decoded.id });
      }

      // console.log(userData);

      if (!userData) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidToken,
        });
      }

      req.user = userData;
      next();
    } catch (error) {
      res.json({
        success: false,
        error: Vietnamese.fetchData.invalidToken,
      });
    }
  }

  if (!token) {
    res.json({
      success: false,
      error: Vietnamese.fetchData.noTokenFound,
    });
  }
});

const protectValidateSignUp = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    if (token === process.env.SIGNUP_TOKEN) {
      next();
    } else {
      res.json({
        success: false,
        error: Vietnamese.fetchData.invalidToken,
      });
    }
  }

  if (!token) {
    res.json({
      success: false,
      error: Vietnamese.fetchData.noTokenFound,
    });
  }
});

const protectSignUp = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.serialNo = decoded.id;
    next();
  }

  if (!token) {
    res.json({
      registered: false,
      error: Vietnamese.fetchData.noTokenFound,
    });
  }
});

const protectFetchSerialNo = asyncHandler(async (req, res, next) => {
  let token;
  const { fetchPage, serialNo } = req.body;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      if (token === process.env.FETCHSERIALNO_TOKEN && fetchPage) {
        return next();
      }

      // Protect, only admin user can get the information by Serial Number
      // If we don't do this. If Hacker send a fetch by serial with fetchPage: false
      // and he has the serial number
      // He will have the token to update profile (see fetchController.js, helper4.js)
      if (!fetchPage) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminUser = await User.findById(decoded.id);
        const employeeUser = await User.findOne({
          serialNo: serialNo,
        });

        // Verified B2B 2.0
        if (adminUser.company === employeeUser.company && adminUser.isAdmin) {
          return next();
        }

        // Verified B2B 1.0
        if (adminUser.email === employeeUser.email) {
          return next();
        }
      }

      return res.json({
        success: false,
        error: Vietnamese.fetchData.invalidToken,
        data: {},
        fetched: true,
        analyticData: {},
        token: "",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      error: Vietnamese.fetchData.invalidToken,
      data: {},
      fetched: true,
      analyticData: {},
      token: "",
    });
  }

  if (!token) {
    return res.json({
      registered: false,
      error: Vietnamese.fetchData.noTokenFound,
    });
  }
});

const protectFetchUserName = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (token === process.env.FETCHUSERNAME_TOKEN) {
      next();
    } else {
      res.json({
        success: false,
        error: Vietnamese.fetchData.invalidToken,
        data: {},
        fetched: true,
        analyticData: {},
        enterprisePage: {},
        storePage: {},
        needPIN: false,
        token: "",
      });
    }
  }

  if (!token) {
    res.json({
      registered: false,
      error: Vietnamese.fetchData.noTokenFound,
      needPIN: false,
    });
  }
});

const protectGetEmail = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (token === process.env.GETEMAIL_TOKEN) {
      next();
    } else {
      return res.json({
        success: false,
        error: Vietnamese.fetchData.invalidToken,
        email: "",
      });
    }
  }

  if (!token) {
    res.json({
      registered: false,
      error: Vietnamese.fetchData.noTokenFound,
    });
  }
});

const protectLinkClicked = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decrypted = decryptText(decoded.id);
    req.userName = decrypted;

    next();
  }

  if (!token) {
    res.json({
      success: false,
      error: Vietnamese.fetchData.noTokenFound,
    });
  }
});

const protectAnalyticData = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const ObjectID = mongoose.Types.ObjectId;
      let userData;

      /*
        If true > request send from regular user
        (Token is User ID)
        If false > request sent from B2B user
        (Token is UserName)
      */
      if (ObjectID.isValid(decoded.id)) {
        userData = await User.findById(decoded.id);
      } else {
        userData = await User.findOne({ userName: decoded.id });
      }

      if (!userData) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidToken,
        });
      }

      req.user = userData.userName;
      next();
    } catch (error) {
      res.json({
        success: false,
        error: Vietnamese.fetchData.invalidToken,
      });
    }
  }

  if (!token) {
    res.json({
      success: false,
      error: Vietnamese.fetchData.noTokenFound,
    });
  }
});

const protectSendData = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const encryptKey = decryptText(decoded.id);
      const userData = await User.findOne({ userName: encryptKey });

      if (userData) {
        req.user = userData;
      } else {
        return res.json({
          success: false,
          message: Vietnamese.fetchData.invalidTokenMsg,
        });
      }

      next();
    } catch (error) {
      return res.json({
        success: false,
        message: Vietnamese.fetchData.invalidTokenMsg,
      });
    }
  }

  if (!token) {
    res.json({
      success: false,
      message: Vietnamese.fetchData.noTokenFoundMsg,
    });
  }
});

const protectFetchPIN = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const encryptKey = decryptText(decoded.id);
      const userData = await User.findOne({ userName: encryptKey });

      if (userData) {
        req.user = userData;
      } else {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidTokenMsg,
        });
      }

      next();
    } catch (error) {
      return res.json({
        success: false,
        error: Vietnamese.fetchData.invalidTokenMsg,
      });
    }
  }

  if (!token) {
    res.json({
      success: false,
      error: Vietnamese.fetchData.noTokenFoundMsg,
    });
  }
});

const protectMessage = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const ObjectID = mongoose.Types.ObjectId;
      let userData;

      /*
        If true > request send from regular user
        (Token is User ID)
        If false > request sent from B2B user
        (Token is UserName)
      */
      if (ObjectID.isValid(decoded.id)) {
        userData = await User.findById(decoded.id);
      } else {
        userData = await User.findOne({ userName: decoded.id });
      }

      if (!userData) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidToken,
        });
      }

      req.userName = userData.userName;
      next();
    } catch (error) {
      res.json({
        success: false,
        message: Vietnamese.fetchData.invalidTokenMsg,
      });
    }
  }

  if (!token) {
    res.json({
      success: false,
      message: Vietnamese.fetchData.noTokenFoundMsg,
    });
  }
});

const protectLock = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userData = await User.findById(decoded.id);

      req.userID = userData._id;
      next();
    } catch (error) {
      res.json({
        success: false,
        message: Vietnamese.fetchData.invalidTokenMsg,
      });
    }
  }

  if (!token) {
    res.json({
      success: false,
      message: Vietnamese.fetchData.noTokenFoundMsg,
    });
  }
});

const protectLinkedSerial = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (token === process.env.LINKEDSERIAL_TOKEN) {
      next();
    } else {
      res.json({
        linked: false,
        linkedTo: "",
        error: Vietnamese.fetchData.invalidToken,
      });
    }
  }

  if (!token) {
    res.json({
      linked: false,
      linkedTo: "",
      error: Vietnamese.fetchData.noTokenFound,
    });
  }
});

const protectForgotPw = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (token === process.env.FORGOTPW_TOKEN) {
      next();
    } else {
      res.json({
        linked: false,
        linkedTo: "",
        error: Vietnamese.fetchData.invalidToken,
      });
    }
  }

  if (!token) {
    res.json({
      linked: false,
      linkedTo: "",
      error: Vietnamese.fetchData.noTokenFound,
    });
  }
});

const protectEnableStore = asyncHandler(async (req, res, next) => {
  let token;
  const { userName } = req.body;
  const ObjectID = mongoose.Types.ObjectId;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let userData;

      if (ObjectID.isValid(decoded.id)) {
        userData = await User.findById(decoded.id);
      } else {
        userData = await User.findOne({ userName: decoded.id });
      }

      if (!userData) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidToken,
        });
      }

      if (userData.userName !== userName) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidToken,
        });
      }

      req.userData = userData;
      return next();
    } catch (error) {
      return res.json({
        success: false,
        error: Vietnamese.fetchData.invalidToken,
      });
    }
  }

  if (!token) {
    res.json({
      linked: false,
      linkedTo: "",
      error: Vietnamese.fetchData.noTokenFound,
    });
  }
});

export { protect, protectValidateSignUp, protectSignUp, protectFetchSerialNo };
export { protectFetchUserName, protectLinkClicked, protectAnalyticData };
export { protectSendData, protectMessage, protectLock, protectGetEmail };
export { protectLinkedSerial, protectForgotPw, protectEnableStore };
export { protectFetchPIN };
