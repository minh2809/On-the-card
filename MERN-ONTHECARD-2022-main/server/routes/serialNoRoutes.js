import express from "express";
import {
  addSerialNo,
  fetchByAmount,
  registerSerial,
  fetchSerialData,
} from "../controllers/serialNoControllers.js";
import {
  protectAddSerial,
  protectFetchAmount,
  protectRegisterSerial,
} from "../middleware/serialNoAuth.js";
const router = express.Router();

router.route("/").post(protectAddSerial, addSerialNo);
router.route("/fetchRegister").post(protectFetchAmount, fetchByAmount);
router.route("/registerSerial").post(protectRegisterSerial, registerSerial);
router.route("/getData").get(fetchSerialData);

export default router;
