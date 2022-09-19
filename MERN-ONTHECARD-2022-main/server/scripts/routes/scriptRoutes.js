import {
  registerStoreAndCompany,
  registerBulkUsers,
  setUpPartnerSerialNo,
} from "../b2bScripts.js";
import express from "express";

const router = express.Router();

router.route("/setUpPartner").post(setUpPartnerSerialNo);
router.route("/b2bBulkRegister").post(registerBulkUsers);
router.route("/b2bStoreAndCompany").post(registerStoreAndCompany);

export default router;
