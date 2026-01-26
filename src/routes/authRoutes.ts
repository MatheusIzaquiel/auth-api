import { Router } from "express";
import { register, login, getUsers } from "../controllers/authController";
import { profile } from "../controllers/profileController";
import authMiddleware from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getUsers", getUsers);
router.get("/profile", authMiddleware, profile);

export default router;
