import express from "express";
import {
  getAllUsers,
  loginUser,
  register,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import errorCatch from "../utils/errorCatch";

const router = express.Router();

router.post("/login", errorCatch(loginUser));
router.post("/register", errorCatch(register));
router.get("/users", errorCatch(authMiddleware), errorCatch(getAllUsers));
export default router;
