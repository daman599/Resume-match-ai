'use client';

import { motion } from "motion/react";

export const LoadingSkeleton = () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {items.map((index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, filter: "blur(3px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{
                            duration: 1,
                            ease: "easeOut"
                        }}
                        className="animate-pulse aspect-square bg-[#2c2c2e] rounded-lg sm:rounded-xl relative overflow-hidden"
                    >
                    </motion.div>
                ))}
            </div>
        </div>
    );
}