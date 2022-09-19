import express from "express";
import {
  fixError1,
  fixError2,
  fixError3,
  getErrorUserName,
  execute5and6,
  getFirebaseData,
  backUpData,
  authenticate,
} from "../controllers/supportControllers.js";
import {
  protectAuthen,
  protectFixError,
} from "../middleware/authSupportApp.js";
const router = express.Router();

router.route("/authUser").post(protectAuthen, authenticate);
router.route("/error1").post(protectFixError, fixError1);
router.route("/error2").post(protectFixError, fixError2);
router.route("/error3").post(protectFixError, fixError3);
router.route("/error5and6").post(protectFixError, execute5and6);
router.route("/getUserName").post(getErrorUserName);

// router.route("/firebaseWork").post(getFirebaseData);
// router.route("/backUpData").post(backUpData);

export default router;
