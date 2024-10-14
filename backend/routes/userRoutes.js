import express from "express";
import { authUser, registerUser, getUserProfile } from "../controllers/userController.js";
const router = express.Router();
import { protect } from "../middleware/authmiddleware.js";



router.route('/').post(registerUser)
// @description login (pass controller function)
router.post("/login",authUser)
router.route('/profile').get(protect, getUserProfile)


export default router;
