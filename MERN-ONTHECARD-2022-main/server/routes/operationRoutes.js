import express from "express";
import {
  getInactiveSerials,
  getEmailList,
  getOther,
  hackTapply,
  operations,
} from "../controllers/operationControllers.js";
const router = express.Router();

router.route("/getInactive").get(getInactiveSerials);
router.route("/getEmailList").get(getEmailList);
router.route("/getOther").get(getOther);
router.route("/hackTapply").get(hackTapply);
router.route("/operations").get(operations);

export default router;
