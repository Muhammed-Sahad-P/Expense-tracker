import express from "express";
import {
  getAllUsers,
  loginUser,
  register,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import errorCatch from "../utils/errorCatch";
import { loginSchema, registerSchema } from "../utils/zodSchema";
import { validateData } from "../middleware/zodValidation";

const router = express.Router();

router.post("/login", validateData(loginSchema), errorCatch(loginUser));
router.post("/register", validateData(registerSchema), errorCatch(register));
router.get("/users", errorCatch(authMiddleware), errorCatch(getAllUsers));
export default router;
