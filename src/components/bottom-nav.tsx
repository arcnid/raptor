"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  BarChart3,
  Bell,
  Users,
  Settings,
} from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,

      href: "/dashboard",
    },
    {
      icon: <Wrench className="w-5 h-5" />,

      href: "/maintenance",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,

      href: "/analytics",
    },

    {
      icon: <Settings className="w-5 h-5" />,

      href: "/settings",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-raptor-gray border-t border-slate-700 md:hidden z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, idx) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/dashboard" && pathname.startsWith("/auger"));

          return (
            <Link
              key={idx}
              href={item.href}
              className={`
                flex flex-col items-center justify-center px-3 py-2 min-w-0 flex-1
                text-slate-300 hover:text-white transition-colors
                ${isActive ? "text-yellow-400" : ""}
              `}
            >
              <div className="mb-1">{item.icon}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
