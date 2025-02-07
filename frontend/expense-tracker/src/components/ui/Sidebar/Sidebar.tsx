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
    <div className="h-[95vh] w-60 bg-[#1D2329] text-black shadow-lg fixed top-3 left-3 flex flex-col justify-between rounded-2xl p-4">
      <h1 className="text-xl font-bold text-[#FAD350] text-center mt-3">Expense Tracker</h1>
      <nav className="flex flex-col gap-3 text-[#FAD350]">
        <SidebarItem href="/dashboard" icon={<LayoutDashboard />} text="Dashboard" />
        <SidebarItem href="/transaction" icon={<LayoutDashboard />} text="Transactions" />

        <Dialog open={isExpenseModalOpen} onOpenChange={setIsExpenseModalOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-3 p-3 hover:bg-[#3A4046] rounded-lg transition-all">
              <PlusCircle />
              Add New Expense
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#1D2329] border border-gray-700 text-white shadow-xl rounded-lg max-w-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-[#FAD350] text-lg font-semibold flex items-center gap-2">
                <PlusCircle className="text-[#FAD350]" /> Add New Expense
              </DialogTitle>
            </DialogHeader>
            <AddExpenseForm onSuccess={() => setIsExpenseModalOpen(false)} />
          </DialogContent>
        </Dialog>

        <Dialog open={isIncomeModalOpen} onOpenChange={setIsIncomeModalOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-3 p-3 hover:bg-[#3A4046] rounded-lg transition-all">
              <PlusCircle />
              Add New Income
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#1D2329] border border-gray-700 text-white shadow-xl rounded-lg max-w-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-[#FAD350] text-lg font-semibold flex items-center gap-2">
                <PlusCircle className="text-[#FAD350]" /> Add New Income
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
