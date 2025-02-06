"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SidebarItem } from "./SideBarItems";
import { AddExpenseForm } from "./AddExpenseForm";
import { AddIncomeForm } from "./AddIncomeForm";
import { UserSection } from "./UserSection";

export default function Sidebar() {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isLargeScreen) return null;

  return (
    <div className="h-[95vh] w-60 bg-[#1D2329] text-black shadow-lg fixed top-3 left-3 flex flex-col justify-between rounded-2xl p-4">
      <h1 className="text-xl font-bold text-[#FAD350] text-center mt-3">Expense Tracker</h1>
      <nav className="flex flex-col gap-3 text-[#FAD350]">
        <SidebarItem href="/dashboard" icon={<LayoutDashboard />} text="Dashboard" />
        <SidebarItem href="/transaction" icon={<LayoutDashboard />} text="Transactions" />

        <Dialog>
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
            <AddExpenseForm />
          </DialogContent>
        </Dialog>

        <Dialog>
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
            <AddIncomeForm />
          </DialogContent>
        </Dialog>
      </nav>

      <UserSection />
    </div>
  );
}