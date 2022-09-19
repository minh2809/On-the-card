import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Vietnamese } from "../language/language.js";
import { authUser } from "../util/helper2.js";

const protectAuthen = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (token === process.env.SUPPORT_APP_AUTHUSER) {
      next();
    } else {
      return res.json({
        success: false,
        message: Vietnamese.fetchData.invalidToken,
      });
    }
  }

  if (!token) {
    return res.json({
      success: false,
      message: Vietnamese.fetchData.noTokenFound,
    });
  }
});

const protectFixError = asyncHandler(async (req, res, next) => {
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
        message: Vietnamese.fetchData.invalidToken,
      });
    }
  }

  if (!token) {
    return res.json({
      success: false,
      message: Vietnamese.fetchData.noTokenFound,
    });
  }
});

export { protectAuthen, protectFixError };
