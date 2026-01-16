import express from "express";
import authenticationToken from "../middleware/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(authenticationToken,applyJob);
router.route("/get").get(authenticationToken,getAppliedJobs)
router.route("/:id/applicants").get(authenticationToken,getApplicants)
router.route("/status/:id/update").post(authenticationToken,updateStatus);  
export default router;