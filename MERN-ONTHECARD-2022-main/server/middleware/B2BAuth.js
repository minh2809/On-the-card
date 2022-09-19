import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/usersModel.js";
import Enterprise from "../models/enterpriseModel.js";
import Message from "../models/messageModel.js";
import { Vietnamese } from "../language/language.js";
import Store from "../models/storeModel.js";
import { decryptText } from "../util/helper.js";
import CompanyAnalytic from "../models/companyAnalyticModel.js";
import StoreAnalytic from "../models/storeAnalyticModel.js";
import mongoose from "mongoose";

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;
  const { serialNo } = req.body;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let adminUserData, userData;

      adminUserData = await User.findById(decoded.id);
      userData = await User.findOne({ serialNo: serialNo });

      const condition =
        !adminUserData ||
        adminUserData.company !== userData.company ||
        !adminUserData.isSuperAdmin;

      if (condition) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidToken,
        });
      }

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

const protectUpdateEnterprise = asyncHandler(async (req, res, next) => {
  let token;
  const { enterpriseInfo } = req.body;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let adminUserData, enterpriseData;

      adminUserData = await User.findById(decoded.id);
      enterpriseData = await Enterprise.findById(enterpriseInfo._id);

      if (!adminUserData) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidToken,
        });
      }

      const condition =
        enterpriseData.company !== adminUserData.company ||
        !adminUserData.isAdmin;

      if (condition) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidToken,
        });
      }

      req.enterpriseData = enterpriseData;
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

const protectUpdateStore = asyncHandler(async (req, res, next) => {
  let token;
  const { storeInfo } = req.body;
  const ObjectID = mongoose.Types.ObjectId;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let adminUserData, storeData;

      if (ObjectID.isValid(decoded.id)) {
        adminUserData = await User.findById(decoded.id);
      } else {
        adminUserData = await User.findOne({ userName: decoded.id });
      }

      storeData = await Store.findById(storeInfo._id);

      if (!adminUserData) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidToken,
        });
      }

      const condition =
        storeData.company !== adminUserData.company || !adminUserData.isAdmin;
      const condition2 = storeData.company !== adminUserData.userName;
      const condition3 = condition && condition2;

      if (condition3) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidToken,
        });
      }

      req.storeData = storeData;
      return next();
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

const protectPageAnalytic = asyncHandler(async (req, res, next) => {
  let token;
  const { indicator, viewFrom } = req.body;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const decrypted = decryptText(decoded.id);
      let b2bPageData;

      if (decrypted !== indicator) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidToken,
        });
      }

      const userData = await User.findOne({ userName: decrypted });

      if (!userData) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidToken,
        });
      }

      if (viewFrom === "companyPage") {
        b2bPageData = await CompanyAnalytic.findOne({
          company: userData.company,
        });
      }

      if (viewFrom === "storePage") {
        b2bPageData = await StoreAnalytic.findOne({
          company: userData.company,
        });
      }

      if (userData.storeActivated) {
        b2bPageData = await StoreAnalytic.findOne({
          company: userData.userName,
        });
      }

      if (!b2bPageData) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidToken,
        });
      }

      req.userData = userData;
      req.b2bPageData = b2bPageData;
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

const protectSendOrder = asyncHandler(async (req, res, next) => {
  let token;
  const { orderData } = req.body;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const decrypted = decryptText(decoded.id);

      if (decrypted !== orderData.userName) {
        return res.json({
          success: false,
          error: Vietnamese.fetchData.invalidTokenView,
        });
      }

      next();
    } catch (error) {
      res.json({
        success: false,
        error: Vietnamese.fetchData.invalidTokenView,
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

const protectSendOrderNotes = asyncHandler(async (req, res, next) => {
  let token;
  const { messageID } = req.body;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const messageData = await Message.findById(messageID);
      const userData = await User.findById(decoded.id);

      if (messageData.userName === userData.userName) {
        return next();
      }

      if (messageData.serialNo === userData.serialNo) {
        return next();
      }

      if (
        messageData.company.length > 0 &&
        messageData.company === userData.company
      ) {
        return next();
      }

      return res.json({
        success: false,
        error: Vietnamese.fetchData.invalidToken,
      });
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

export { protectAdmin, protectUpdateEnterprise, protectUpdateStore };
export { protectPageAnalytic, protectSendOrder, protectSendOrderNotes };
