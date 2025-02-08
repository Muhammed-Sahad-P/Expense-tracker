"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12">
            <motion.div
                className="w-full max-w-4xl p-6 sm:p-8 md:p-10 rounded-xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-600 leading-tight">
                    Take Control of Your Finances
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                    Effortlessly track your expenses, monitor income, and gain insights into your financial health.
                </p>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/register" className="w-full sm:w-auto">
                        <motion.button
                            className="w-full sm:w-auto bg-indigo-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all text-sm sm:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.button>
                    </Link>
                    <Link href="/login" className="w-full sm:w-auto">
                        <motion.button
                            className="w-full sm:w-auto bg-white border-2 border-indigo-600 text-indigo-600 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-all text-sm sm:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Login
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

            <div className="mt-12 sm:mt-16 w-full max-w-6xl px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-6 sm:mb-8">Why Choose Us?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    <FeatureCard
                        title="Expense Tracking"
                        description="Log and categorize your expenses with ease."
                        icon="💰"
                    />
                    <FeatureCard
                        title="Income Monitoring"
                        description="Track your income sources and trends."
                        icon="💳"
                    />
                    <FeatureCard
                        title="Visual Analytics"
                        description="Interactive charts for better financial insights."
                        icon="📊"
                    />
                </div>
            </div>
        </div>
    );
}

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
    return (
        <motion.div
            className="p-6 sm:p-8 rounded-xl bg-white border border-indigo-100 shadow-lg hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
        >
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{icon}</div>
            <h3 className="text-lg sm:text-xl font-semibold text-indigo-600">{title}</h3>
            <p className="text-xs sm:text-sm mt-2 text-gray-600">{description}</p>
        </motion.div>
    );
};