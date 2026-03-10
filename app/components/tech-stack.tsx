"use client";
import {
  Database,
  Layers,
  BarChart3,
  Cloud,
  Zap,
  PieChart,
  Terminal,
  Table2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface Tool {
  name: string;
  iconName: string;
  color: string;
  icon?: any;
}

const iconMap = {
  BarChart3,
  Layers,
  Table2,
  Cloud,
  Zap,
  PieChart,
  Terminal,
  Database,
};

export const TechStack = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    const fetchToolsData = async () => {
      try {
        const response = await fetch("/tools.json");
        const data: Tool[] = await response.json();
        const toolsWithIcons = data.map((tool) => ({
          ...tool,
          icon: iconMap[tool.iconName as keyof typeof iconMap],
        }));
        setTools(toolsWithIcons);
      } catch (error) {
        console.error("Error fetching tools data:", error);
      }
    };

    fetchToolsData();
  }, []);
  return (
    <section className="max-w-5xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <h2 className="text-2xl font-bold tracking-tight">Tech Stack</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-8">
          {tools.map((tool) => (
            <div key={tool.name} className="flex flex-col items-center group">
              {/* Icon Container */}
              <div
                className={`mb-3 transition-transform duration-300 group-hover:scale-110 ${tool.color}`}
              >
                <tool.icon size={32} strokeWidth={1.5} />
              </div>

              {/* Vertical Badge */}
              <Badge
                variant="outline"
                className="font-medium text-[10px] uppercase tracking-wider px-2 py-0.5"
              >
                {tool.name}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
