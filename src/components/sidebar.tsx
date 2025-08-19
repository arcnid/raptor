"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  RotateCw,
  Wrench,
  BarChart3,
  Bell,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const COOKIE_KEY = "sidebar-collapsed";
const COOKIE_MAX_AGE_DAYS = 180;

function setCookie(name: string, value: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const pairs = document.cookie.split(";").map((s) => s.trim());
  for (const p of pairs) {
    if (p.startsWith(name + "="))
      return decodeURIComponent(p.slice(name.length + 1));
  }
  return null;
}

// Synchronous initial read so there's no flash/mismatch
function getInitialCollapsed(): boolean {
  if (typeof document === "undefined") return false;
  const v = getCookie(COOKIE_KEY);
  if (v === "1") return true;
  if (v === "0") return false;
  return false;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  // Persisted state used in uncontrolled mode
  const [persistedCollapsed, setPersistedCollapsed] = useState<boolean>(
    getInitialCollapsed()
  );

  const isControlled = !!onToggle;
  const isCollapsed = isControlled ? collapsed : persistedCollapsed;

  const handleToggle = useCallback(() => {
    const next = !isCollapsed;

    // Always persist the user's intent (even in controlled mode)
    if (typeof document !== "undefined") {
      setCookie(COOKIE_KEY, next ? "1" : "0", COOKIE_MAX_AGE_DAYS);
    }

    if (onToggle) {
      onToggle(); // parent updates its own state
    } else {
      setPersistedCollapsed(next); // uncontrolled path
    }
  }, [isCollapsed, onToggle]);

  const navItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      label: "Maintenance",
      href: "/maintenance",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Analytics",
      href: "/analytics",
    },
    { icon: <Bell className="w-5 h-5" />, label: "Alerts", href: "/alerts" },
    { icon: <Users className="w-5 h-5" />, label: "Users", href: "/users" },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      href: "/settings",
    },
  ];

  return (
    <div
      className={`
        bg-raptor-gray border-r border-slate-700 h-screen fixed top-0 left-0
        transition-all duration-300 flex flex-col z-50
        ${isCollapsed ? "w-20 md:w-20" : "w-64 md:w-64"}
      `}
    >
      {/* Logo / Toggle */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {isCollapsed ? (
          // When collapsed, make the icon itself the toggle button
          <button
            onClick={handleToggle}
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-raptor-lightgray"
          >
            <img
              src="/raptor_icon_yellow.svg"
              alt="Expand sidebar"
              className="w-8 h-8"
            />
          </button>
        ) : (
          <>
            <Link href="/dashboard" className="flex items-center">
              <img
                src="/raptor_logo_yellow.svg"
                alt="Raptor Control System"
                className="w-15 h-10 object-contain origin-left transform scale-300 origin-center"
              />
            </Link>
            {onToggle && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggle}
                className="text-slate-400 hover:text-white hover:bg-raptor-lightgray"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6">
        <ul className="space-y-2">
          {navItems.map((item, idx) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/dashboard" && pathname.startsWith("/auger"));

            return (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={`
                    w-full flex items-center px-4 py-3 text-slate-300
                    hover:bg-raptor-lightgray hover:text-white transition-colors
                    ${
                      isActive
                        ? "bg-raptor-lightgray text-white border-l-4 border-yellow-400"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {!isCollapsed && <span className="ml-3">{item.label}</span>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom items */}
      <div className="p-4 border-t border-slate-700">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-slate-300 hover:bg-raptor-lightgray hover:text-white transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Help</span>}
            </a>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-slate-300 hover:bg-raptor-lightgray hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
