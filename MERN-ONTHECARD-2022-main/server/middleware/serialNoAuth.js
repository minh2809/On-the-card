import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Vietnamese } from "../language/language.js";
import { authUser } from "../util/helper2.js";

const protectAddSerial = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (authUser(decoded.id)) {
      next();
    } else {
      return res.json({
        success: false,
        message: "",
        error: Vietnamese.fetchData.invalidToken,
      });
    }
  }

  if (!token) {
    return res.json({
      success: false,
      message: "",
      error: Vietnamese.fetchData.noTokenFound,
    });
  }
});

const protectFetchAmount = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (authUser(decoded.id)) {
      next();
    } else {
      return res.json({
        success: false,
        serialArray: [],
        error: Vietnamese.fetchData.invalidToken,
        token: "",
      });
    }
  }

  if (!token) {
    res.json({
      success: false,
      serialArray: [],
      token: "",
      error: Vietnamese.fetchData.noTokenFound,
    });
  }
});

const protectRegisterSerial = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (authUser(decoded.id)) {
      next();
    } else {
      return res.json({
        success: false,
        message: Vietnamese.invalidToken,
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

export { protectAddSerial, protectFetchAmount, protectRegisterSerial };
