import express from "express";
import { authUser } from "../controllers/userController.js";
const router = express.Router();

// @description login (pass controller function)
router.post("/login",authUser)



export default router;
