import express from "express";
import { loginUser, register } from "../controllers/userController";
import errorCatch from "../lib/utils/errorCatch";

const router = express.Router();

router.post("/login", errorCatch(loginUser));
router.post("/register", errorCatch(register));

export default router;
