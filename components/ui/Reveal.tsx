'use client';

import { motion } from "motion/react";
import React from "react";

interface RevealProps {
    children: React.ReactNode,
    duration?: number,
    delay?: number,
    y?: number,
}

export default function Reveal({
    children,
    duration = 0.8,
    delay = 0,
    y = 40
}: RevealProps) {

    return <motion.div
        initial={{ opacity: 0 , y }}
        whileInView={{ opacity: 1 , y: 0 }}
        transition={{ delay, duration , ease: "easeOut"}}
        viewport={{ once: true, amount: 0.1 }} 
    >
        {children}
    </motion.div>
}