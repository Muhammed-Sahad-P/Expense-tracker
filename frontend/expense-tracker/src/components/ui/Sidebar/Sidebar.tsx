"use client";

import { useState } from "react";
import { LayoutDashboard, PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SidebarItem } from "./SideBarItems";
import { AddExpenseForm } from "./AddExpenseForm";
import { AddIncomeForm } from "./AddIncomeForm";
import { UserSection } from "./UserSection";

export default function Sidebar() {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);

  return (
    <div className="h-[95vh] w-60 bg-white text-gray-600 shadow-lg fixed top-3 left-3 flex flex-col justify-between rounded-2xl p-4 border border-indigo-100">
      <h1 className="text-xl font-bold text-indigo-600 text-center mt-3">Expense Tracker</h1>
      <nav className="flex flex-col gap-3 text-indigo-600">
        <SidebarItem href="/dashboard" icon={<LayoutDashboard className="text-indigo-600 hover:bg-indigo-50" />} text="Dashboard" />
        <SidebarItem href="/transaction" icon={<LayoutDashboard className="text-indigo-600 hover:bg-indigo-50" />} text="Transactions" />

        <Dialog open={isExpenseModalOpen} onOpenChange={setIsExpenseModalOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-lg transition-all text-indigo-600">
              <PlusCircle />
              Add New Expense
            </button>
          </DialogTrigger>
          <DialogContent
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white border border-indigo-100 text-gray-600 shadow-xl rounded-lg p-6 overflow-y-auto max-h-[80vh]"
          >
            <DialogHeader>
              <DialogTitle className="text-indigo-600 text-lg font-semibold flex items-center gap-2">
                <PlusCircle className="text-indigo-600" /> Add New Expense
              </DialogTitle>
            </DialogHeader>
            <AddExpenseForm onSuccess={() => setIsExpenseModalOpen(false)} />
          </DialogContent>
        </Dialog>

        <Dialog open={isIncomeModalOpen} onOpenChange={setIsIncomeModalOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-lg transition-all text-indigo-600">
              <PlusCircle />
              Add New Income
            </button>
          </DialogTrigger>
          <DialogContent
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white border border-indigo-100 text-gray-600 shadow-xl rounded-lg p-6 overflow-y-auto max-h-[80vh]"
          >
            <DialogHeader>
              <DialogTitle className="text-indigo-600 text-lg font-semibold flex items-center gap-2">
                <PlusCircle className="text-indigo-600" /> Add New Income
              </DialogTitle>
            </DialogHeader>
            <AddIncomeForm onSuccess={() => setIsIncomeModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </nav>

      <UserSection />
    </div>
  );
}