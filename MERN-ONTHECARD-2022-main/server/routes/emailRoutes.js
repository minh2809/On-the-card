import express from "express";
import {
  sendEmail,
  sendToAll,
  testGmail,
} from "../controllers/emailControllers.js";
const router = express.Router();

router.route("/").post(sendEmail);
router.route("/sendAll").post(sendToAll);
router.route("/test").post(testGmail);

export default router;
