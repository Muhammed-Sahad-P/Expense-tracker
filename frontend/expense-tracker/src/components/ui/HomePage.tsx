"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1D2329] to-[#3A4046] flex flex-col items-center justify-center text-center px-6 text-white">
            {/* Hero Section */}
            <motion.div
                className="max-w-4xl bg-[#1D2329]/80 backdrop-blur-md p-10 rounded-xl shadow-2xl border border-[#3A4046]"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#FAD350] to-[#FF6B6B] bg-clip-text text-transparent">
                    Take Control of Your Finances
                </h1>
                <p className="text-gray-300 mt-4 text-lg">
                    Effortlessly track your expenses, monitor income, and gain insights into your financial health.
                </p>
                <div className="mt-8 flex gap-4 justify-center">
                    <Link href="/register">
                        <motion.button
                            className="bg-gradient-to-r from-[#FAD350] to-[#FF9F43] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.button>
                    </Link>
                    <Link href="/login">
                        <motion.button
                            className="bg-transparent border-2 border-[#FAD350] text-[#FAD350] px-8 py-3 rounded-full font-semibold hover:bg-[#FAD350] hover:text-black transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Login
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

            {/* Features Section */}
            <div className="mt-16 w-full max-w-6xl px-4">
                <h2 className="text-3xl font-bold text-[#FAD350] mb-8">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Expense Tracking"
                        description="Log and categorize your expenses with ease."
                        icon="💰"
                        color="from-[#FF6B6B] to-[#FF9F43]"
                    />
                    <FeatureCard
                        title="Income Monitoring"
                        description="Track your income sources and trends."
                        icon="💳"
                        color="from-[#6BFF6B] to-[#43FF9F]"
                    />
                    <FeatureCard
                        title="Visual Analytics"
                        description="Interactive charts for better financial insights."
                        icon="📊"
                        color="from-[#6B6BFF] to-[#9F43FF]"
                    />
                </div>
            </div>
        </div>
    );
}

const FeatureCard = ({ title, description, icon, color }: { title: string; description: string; icon: string; color: string }) => {
    return (
        <motion.div
            className={`p-8 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg hover:shadow-xl transition-all`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
        >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm mt-2 text-gray-100">{description}</p>
        </motion.div>
    );
};