import express from "express";
import {
  addExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController";
import errorCatch from "../utils/errorCatch";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", errorCatch(authMiddleware), errorCatch(addExpense));
router.get("/totals", errorCatch(authMiddleware), errorCatch(getAllExpenses));
router.put("/:id", errorCatch(authMiddleware), errorCatch(updateExpense));
router.delete("/:id", errorCatch(authMiddleware), errorCatch(deleteExpense));

export default router;
