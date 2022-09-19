import express from "express";
import {
  b2bIsAdmin,
  updateStore,
  pageViewIncrement,
  updateEnterprise,
  linkClicked,
  createOrder,
  sendOrderNotes,
} from "../controllers/b2bControllers.js";
import {
  protectAdmin,
  protectUpdateEnterprise,
  protectUpdateStore,
  protectPageAnalytic,
  protectSendOrder,
  protectSendOrderNotes,
} from "../middleware/B2BAuth.js";
const router = express.Router();

router.route("/b2bIsAdmin").post(protectAdmin, b2bIsAdmin);
router
  .route("/updateEnterprise")
  .post(protectUpdateEnterprise, updateEnterprise);
router.route("/updateStore").post(protectUpdateStore, updateStore);
router.route("/b2bPageView").post(protectPageAnalytic, pageViewIncrement);
router.route("/b2bLinkClicked").post(protectPageAnalytic, linkClicked);
router.route("/sendOrder").post(protectSendOrder, createOrder);
router.route("/sendOrderNotes").post(protectSendOrderNotes, sendOrderNotes);

export default router;
