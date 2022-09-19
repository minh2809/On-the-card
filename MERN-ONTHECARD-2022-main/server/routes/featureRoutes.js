import express from "express";
import { setPIN, updatePW } from "../controllers/featureControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/setPIN").post(protect, setPIN);
router.route("/updatePW").post(protect, updatePW);

export default router;
