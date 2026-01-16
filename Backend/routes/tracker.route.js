import express from "express";
import authenticationToken from "../middleware/isAuthenticated.js";
import {
  createTrackedApplication,
  getTrackedApplications,
  getTrackedApplicationById,
  updateTrackedApplication,
  deleteTrackedApplication,
} from "../controllers/tracker.controller.js";

const router = express.Router();

// POST /api/tracker - Create new tracked application
router.route("/").post(authenticationToken, createTrackedApplication);

// GET /api/tracker - Get all tracked applications (with optional filters)
router.route("/").get(authenticationToken, getTrackedApplications);

// GET /api/tracker/:id - Get single tracked application
router.route("/:id").get(authenticationToken, getTrackedApplicationById);

// PUT /api/tracker/:id - Update tracked application
router.route("/:id").put(authenticationToken, updateTrackedApplication);

// DELETE /api/tracker/:id - Delete tracked application
router.route("/:id").delete(authenticationToken, deleteTrackedApplication);

export default router;
