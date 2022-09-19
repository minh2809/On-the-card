import express from "express";
import {
  fetchBySerial,
  fetchByUserName,
  updateUserInfo,
  linkedSerial,
} from "../controllers/fetchControllers.js";
import {
  protect,
  protectFetchSerialNo,
  protectFetchUserName,
  protectLinkedSerial,
  protectFetchPIN,
} from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protectFetchSerialNo, fetchBySerial);
router.route("/pin/serialNo").post(protectFetchPIN, fetchBySerial);
router.route("/pin/username").post(protectFetchPIN, fetchByUserName);
router.route("/username").post(protectFetchUserName, fetchByUserName);
router.route("/update").post(protect, updateUserInfo);
router.route("/linkedSerial").post(protectLinkedSerial, linkedSerial);

export default router;
