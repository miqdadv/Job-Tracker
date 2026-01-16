import express from "express";
import authenticationToken from "../middleware/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob, updateJob, deleteJob } from "../controllers/job.controller.js";
const router = express.Router();

router.route("/post").post(authenticationToken,postJob);
router.route("/get").get(authenticationToken,getAllJobs)
router.route("/getAdminJobs").get(authenticationToken,getAdminJobs)
router.route("/get/:id").get(authenticationToken,getJobById);
router.route("/update/:id").put(authenticationToken, updateJob);
router.route("/delete/:id").delete(authenticationToken, deleteJob);
export default router;