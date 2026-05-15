"use client";

import { motion } from "framer-motion";

type StatsCardProps = {
  title: string;
  value: string;
  color: string;
};

export default function StatsCard({
  title,
  value,
  color,
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        y: -5,
      }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl"
    >
      <div
        className={`absolute inset-0 opacity-20 bg-gradient-to-br ${color}`}
      />

      <div className="relative z-10">
        <p className="text-slate-300 text-sm">
          {title}
        </p>

        <h2 className="text-5xl font-bold mt-3">
          {value}
        </h2>
      </div>
    </motion.div>
  );
}