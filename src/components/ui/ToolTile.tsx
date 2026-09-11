"use client";

import { motion } from 'framer-motion';
import {
  Monitor, Terminal, Laptop, FileText, MessageSquare,
  Kanban, Headphones, LifeBuoy, MonitorCheck, Share2,
  Activity, BarChart2, Users, Cloud, Box, Layers,
  Wifi, Network, Database, PieChart,
  ShoppingCart, Globe, Shield, Camera, Printer,
  BookOpen, Phone, Briefcase, LucideIcon,
} from 'lucide-react';
import { Tool } from '@/data/portfolio';

const iconMap: Record<string, LucideIcon> = {
  Monitor, Terminal, Laptop, FileText, MessageSquare,
  Kanban, Headphones, LifeBuoy, MonitorCheck, Share2,
  Activity, BarChart2, Users, Cloud, Box, Layers,
  Wifi, Network, Database, PieChart,
  ShoppingCart, Globe, Shield, Camera, Printer,
  BookOpen, Phone, Briefcase,
};

interface ToolTileProps {
  tool: Tool;
}

export function ToolTile({ tool }: ToolTileProps) {
  const Icon = iconMap[tool.icon] ?? Monitor;

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-[#1e1e2e] bg-[#1a1a24] cursor-default hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/20 transition-colors duration-300">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <span className="text-xs font-medium text-slate-400 group-hover:text-slate-300 text-center transition-colors leading-tight">
        {tool.name}
      </span>
    </motion.div>
  );
}
