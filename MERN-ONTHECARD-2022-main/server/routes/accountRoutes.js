import express from "express";
import {
  validateSerialNoUserName,
  registerUser,
  fetchInfoLogin,
  getEmail,
  authGetSerial,
  forgotPassword,
  enableStore,
  activateGallery,
} from "../controllers/accountControllers.js";
import {
  protectValidateSignUp,
  protectSignUp,
  protectGetEmail,
  protectForgotPw,
  protectEnableStore,
} from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/validate").post(protectValidateSignUp, validateSerialNoUserName);
router.route("/signup").post(protectSignUp, registerUser);
router.route("/login").post(fetchInfoLogin);
router.route("/getEmail").post(protectGetEmail, getEmail);
router.route("/authGetSerialNo").post(authGetSerial);
router.route("/forgotPw").post(protectForgotPw, forgotPassword);
router.route("/enableStore").post(protectEnableStore, enableStore);
router.route("/enableGallery").post(protectEnableStore, activateGallery);

export default router;
