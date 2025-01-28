import express from "express";
import {
  addExpense,
  getAllExpenses,
  deleteExpense,
} from "../controllers/expenseController";
import errorCatch from "../lib/utils/errorCatch";

const router = express.Router();

router.post("/", errorCatch(addExpense));
router.get("/totals", errorCatch(getAllExpenses));
router.delete("/:id", errorCatch(deleteExpense));

export default router;
