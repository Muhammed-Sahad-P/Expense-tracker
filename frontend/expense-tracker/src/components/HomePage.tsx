"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
            <motion.div
                className="max-w-4xl bg-white p-10 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl font-bold text-gray-800">
                    Track Your <span className="text-blue-500">Expenses</span> & <span className="text-green-500">Income</span> Easily!
                </h1>
                <p className="text-gray-600 mt-4">
                    Manage your finances effortlessly with insightful analytics and reports.
                </p>
                <div className="mt-6 flex gap-4 justify-center">
                    <Link href="/register">
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                            Get Started
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition">
                            Login
                        </button>
                    </Link>
                </div>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                    title="Track Expenses"
                    description="Easily log and categorize your expenses."
                    color="bg-red-500"
                />
                <FeatureCard
                    title="Monitor Income"
                    description="Keep an eye on your earnings and trends."
                    color="bg-green-500"
                />
                <FeatureCard
                    title="Visual Reports"
                    description="Interactive charts to analyze your financial health."
                    color="bg-blue-500"
                />
            </div>
        </div>
    );
}

const FeatureCard = ({ title, description, color }: { title: string; description: string; color: string }) => {
    return (
        <motion.div
            className={`p-6 rounded-lg text-white shadow-md ${color}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm mt-2">{description}</p>
        </motion.div>
    );
};
