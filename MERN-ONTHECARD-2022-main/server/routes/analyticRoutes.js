import express from "express";
import {
  linkClicked,
  addAccounts,
  getAnalyticData,
  sendMessage,
  messageActions,
  lockActions,
} from "../controllers/analyticControllers.js";
import {
  protectLinkClicked,
  protectAnalyticData,
  protectSendData,
  protectMessage,
  protectLock,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/linkClicked").post(protectLinkClicked, linkClicked);
router.route("/add").post(addAccounts);
router.route("/getAnalytic").post(protectAnalyticData, getAnalyticData);
router.route("/sendMessage").post(protectSendData, sendMessage);
router.route("/messageActions").post(protectMessage, messageActions);
router.route("/activation").post(protectLock, lockActions);

export default router;
