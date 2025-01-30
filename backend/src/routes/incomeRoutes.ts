import express from "express";
import {
  addIncome,
  getAllIncomes,
  updateIncome,
  deleteIncome,
} from "../controllers/incomeController";
import errorCatch from "../lib/utils/errorCatch";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", errorCatch(authMiddleware), errorCatch(addIncome));
router.get("/", errorCatch(authMiddleware), errorCatch(getAllIncomes));
router.put("/:id", errorCatch(authMiddleware), errorCatch(updateIncome));
router.delete("/:id", errorCatch(authMiddleware), errorCatch(deleteIncome));

export default router;
