import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import authenticationToken from "../middleware/isAuthenticated.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout)
router.route("/profile/update").post(authenticationToken,updateProfile);  
export default router;