"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Play,
  Square,
  AlertTriangle,
  Thermometer,
  Droplets,
  Gauge,
  RotateCw,
  ArrowLeft,
  Grid3X3,
  LayoutDashboard,
  Settings,
  Bell,
  Users,
  BarChart3,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Wrench,
  SkipBack,
  SkipForward,
  Shield,
  FileText,
  Activity,
  Headphones,
  RefreshCw,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface AugerData {
  id: string;
  name: string;
  zone: string;
  position: number;
  isRunning: boolean;
  throughput: number;
  targetThroughput: number;
  temperature: number;
  humidity: number;
  status: "optimal" | "warning" | "stopped" | "error";
}

// Hardcoded mock data to prevent hydration issues
const mockAugerData: AugerData[] = [
  {
    id: "SA-001",
    name: "Sweep Auger 1",
    zone: "Zone A",
    position: 45,
    isRunning: true,
    throughput: 78.5,
    targetThroughput: 80.0,
    temperature: 72.3,
    humidity: 48.7,
    status: "optimal",
  },
  {
    id: "SA-002",
    name: "Sweep Auger 2",
    zone: "Zone A",
    position: 120,
    isRunning: true,
    throughput: 65.2,
    targetThroughput: 75.0,
    temperature: 69.8,
    humidity: 52.1,
    status: "warning",
  },
  {
    id: "SA-003",
    name: "Sweep Auger 3",
    zone: "Zone A",
    position: 200,
    isRunning: false,
    throughput: 0.0,
    targetThroughput: 70.0,
    temperature: 68.1,
    humidity: 45.3,
    status: "stopped",
  },
  {
    id: "SA-004",
    name: "Sweep Auger 4",
    zone: "Zone A",
    position: 315,
    isRunning: true,
    throughput: 92.1,
    targetThroughput: 90.0,
    temperature: 74.6,
    humidity: 49.8,
    status: "optimal",
  },
  {
    id: "SA-005",
    name: "Sweep Auger 5",
    zone: "Zone B",
    position: 30,
    isRunning: true,
    throughput: 55.7,
    targetThroughput: 65.0,
    temperature: 71.2,
    humidity: 46.9,
    status: "warning",
  },
  {
    id: "SA-006",
    name: "Sweep Auger 6",
    zone: "Zone B",
    position: 180,
    isRunning: true,
    throughput: 83.4,
    targetThroughput: 85.0,
    temperature: 73.5,
    humidity: 51.2,
    status: "optimal",
  },
  {
    id: "SA-007",
    name: "Sweep Auger 7",
    zone: "Zone B",
    position: 270,
    isRunning: false,
    throughput: 0.0,
    targetThroughput: 60.0,
    temperature: 67.8,
    humidity: 44.1,
    status: "stopped",
  },
  {
    id: "SA-008",
    name: "Sweep Auger 8",
    zone: "Zone B",
    position: 90,
    isRunning: true,
    throughput: 76.8,
    targetThroughput: 80.0,
    temperature: 70.9,
    humidity: 47.6,
    status: "optimal",
  },
  {
    id: "SA-009",
    name: "Sweep Auger 9",
    zone: "Zone C",
    position: 135,
    isRunning: true,
    throughput: 42.3,
    targetThroughput: 55.0,
    temperature: 82.1,
    humidity: 58.7,
    status: "error",
  },
  {
    id: "SA-010",
    name: "Sweep Auger 10",
    zone: "Zone C",
    position: 225,
    isRunning: true,
    throughput: 67.9,
    targetThroughput: 70.0,
    temperature: 69.4,
    humidity: 43.8,
    status: "optimal",
  },
  {
    id: "SA-011",
    name: "Sweep Auger 11",
    zone: "Zone C",
    position: 300,
    isRunning: false,
    throughput: 0.0,
    targetThroughput: 75.0,
    temperature: 66.7,
    humidity: 41.2,
    status: "stopped",
  },
  {
    id: "SA-012",
    name: "Sweep Auger 12",
    zone: "Zone C",
    position: 60,
    isRunning: true,
    throughput: 88.6,
    targetThroughput: 85.0,
    temperature: 75.3,
    humidity: 50.4,
    status: "optimal",
  },
  {
    id: "SA-013",
    name: "Sweep Auger 13",
    zone: "Zone D",
    position: 150,
    isRunning: true,
    throughput: 71.2,
    targetThroughput: 75.0,
    temperature: 68.9,
    humidity: 46.1,
    status: "optimal",
  },
  {
    id: "SA-014",
    name: "Sweep Auger 14",
    zone: "Zone D",
    position: 240,
    isRunning: true,
    throughput: 59.8,
    targetThroughput: 80.0,
    temperature: 77.6,
    humidity: 54.3,
    status: "warning",
  },
  {
    id: "SA-015",
    name: "Sweep Auger 15",
    zone: "Zone D",
    position: 330,
    isRunning: false,
    throughput: 0.0,
    targetThroughput: 65.0,
    temperature: 65.2,
    humidity: 42.7,
    status: "stopped",
  },
  {
    id: "SA-016",
    name: "Sweep Auger 16",
    zone: "Zone D",
    position: 75,
    isRunning: true,
    throughput: 94.7,
    targetThroughput: 95.0,
    temperature: 73.8,
    humidity: 48.9,
    status: "optimal",
  },
  {
    id: "SA-017",
    name: "Sweep Auger 17",
    zone: "Zone E",
    position: 165,
    isRunning: true,
    throughput: 52.4,
    targetThroughput: 70.0,
    temperature: 79.3,
    humidity: 56.8,
    status: "warning",
  },
  {
    id: "SA-018",
    name: "Sweep Auger 18",
    zone: "Zone E",
    position: 255,
    isRunning: true,
    throughput: 81.1,
    targetThroughput: 80.0,
    temperature: 71.7,
    humidity: 45.6,
    status: "optimal",
  },
  {
    id: "SA-019",
    name: "Sweep Auger 19",
    zone: "Zone E",
    position: 345,
    isRunning: false,
    throughput: 0.0,
    targetThroughput: 85.0,
    temperature: 64.9,
    humidity: 40.3,
    status: "stopped",
  },
  {
    id: "SA-020",
    name: "Sweep Auger 20",
    zone: "Zone E",
    position: 105,
    isRunning: true,
    throughput: 73.6,
    targetThroughput: 75.0,
    temperature: 70.1,
    humidity: 47.2,
    status: "optimal",
  },
  {
    id: "SA-021",
    name: "Sweep Auger 21",
    zone: "Zone F",
    position: 195,
    isRunning: true,
    throughput: 66.8,
    targetThroughput: 65.0,
    temperature: 72.4,
    humidity: 49.1,
    status: "optimal",
  },
  {
    id: "SA-022",
    name: "Sweep Auger 22",
    zone: "Zone F",
    position: 285,
    isRunning: true,
    throughput: 48.9,
    targetThroughput: 75.0,
    temperature: 84.2,
    humidity: 61.4,
    status: "error",
  },
  {
    id: "SA-023",
    name: "Sweep Auger 23",
    zone: "Zone F",
    position: 15,
    isRunning: false,
    throughput: 0.0,
    targetThroughput: 70.0,
    temperature: 63.8,
    humidity: 39.7,
    status: "stopped",
  },
  {
    id: "SA-024",
    name: "Sweep Auger 24",
    zone: "Zone F",
    position: 120,
    isRunning: true,
    throughput: 87.3,
    targetThroughput: 90.0,
    temperature: 74.1,
    humidity: 51.8,
    status: "optimal",
  },
];

function Sidebar({
  collapsed,
  toggleSidebar,
  currentView,
  onViewChange,
}: {
  collapsed: boolean;
  toggleSidebar: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}) {
  const navItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
      key: "grid",
    },
    { icon: <RotateCw className="w-5 h-5" />, label: "Augers", key: "grid" },
    {
      icon: <Wrench className="w-5 h-5" />,
      label: "Maintenance",
      key: "maintenance",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Analytics",
      key: "analytics",
    },
    { icon: <Bell className="w-5 h-5" />, label: "Alerts", key: "alerts" },
    { icon: <Users className="w-5 h-5" />, label: "Users", key: "users" },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      key: "settings",
    },
  ];

  return (
    <div
      className={`bg-slate-800 border-r border-slate-700 h-screen fixed top-0 left-0 transition-all duration-300 flex flex-col z-50 ${
        collapsed ? "w-20" : "w-64"
      } ${collapsed ? "md:w-20" : "md:w-64"}`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-orange-500 text-white w-10 h-10 rounded-md flex items-center justify-center font-bold text-xl">
            SA
          </div>
          {!collapsed && (
            <div className="ml-3 text-white font-bold text-lg">
              AugerControl
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-slate-400 hover:text-white hover:bg-slate-700"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => onViewChange(item.key)}
                className={`w-full flex items-center px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white ${
                  currentView === item.key
                    ? "bg-slate-700 text-white border-l-4 border-orange-500"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </div>
                {!collapsed && currentView === item.key && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom items */}
      <div className="p-4 border-t border-slate-700">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <HelpCircle className="w-5 h-5" />
              {!collapsed && <span className="ml-3">Help</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <LogOut className="w-5 h-5" />
              {!collapsed && <span className="ml-3">Logout</span>}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function MaintenanceView({ augerId }: { augerId: string }) {
  const [tractorJogState, setTractorJogState] = useState<
    "stopped" | "forward" | "reverse"
  >("stopped");
  const [trainJogState, setTrainJogState] = useState<
    "stopped" | "forward" | "reverse"
  >("stopped");
  const [isolateSwitch1, setIsolateSwitch1] = useState(false);
  const [isolateSwitch2, setIsolateSwitch2] = useState(false);
  const [isolateSwitch3, setIsolateSwitch3] = useState(false);

  const handleTractorJog = (direction: "forward" | "reverse" | "stop") => {
    if (direction === "stop") {
      setTractorJogState("stopped");
    } else {
      setTractorJogState(direction);
    }
  };

  const handleTrainJog = (direction: "forward" | "reverse" | "stop") => {
    if (direction === "stop") {
      setTrainJogState("stopped");
    } else {
      setTrainJogState(direction);
    }
  };

  const quickActions = [
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      label: "Clear Fault",
      color: "bg-red-600 hover:bg-red-700",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: "Preventative Maintenance",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Logs",
      color: "bg-slate-600 hover:bg-slate-700",
    },
    {
      icon: <Activity className="w-5 h-5" />,
      label: "Sensor Read",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      label: "Remote Support",
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Maintenance Mode
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            System ID: {augerId} | Manual Control Interface
          </p>
        </div>
        <Badge className="bg-yellow-600 text-white border-0 px-4 py-2 self-start sm:self-auto">
          MAINTENANCE MODE
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Jog Controls */}
        <div className="space-y-4 sm:space-y-6">
          {/* Tractor Jog */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                <RotateCw className="w-5 h-5" />
                Tractor Jog
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button
                  onClick={() => handleTractorJog("reverse")}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-3 ${
                    tractorJogState === "reverse"
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-slate-600 hover:bg-slate-700"
                  } text-white`}
                >
                  <SkipBack className="w-5 h-5 mr-2" />
                  Reverse
                </Button>
                <Button
                  onClick={() => handleTractorJog("stop")}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-red-600 hover:bg-red-700 text-white"
                >
                  <Square className="w-5 h-5 mr-2" />
                  Stop
                </Button>
                <Button
                  onClick={() => handleTractorJog("forward")}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-3 ${
                    tractorJogState === "forward"
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-slate-600 hover:bg-slate-700"
                  } text-white`}
                >
                  <SkipForward className="w-5 h-5 mr-2" />
                  Forward
                </Button>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400">Status</div>
                <div className="text-lg font-mono text-white capitalize">
                  {tractorJogState}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Train Jog */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                <RotateCw className="w-5 h-5" />
                Train Jog
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button
                  onClick={() => handleTrainJog("reverse")}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-3 ${
                    trainJogState === "reverse"
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-slate-600 hover:bg-slate-700"
                  } text-white`}
                >
                  <SkipBack className="w-5 h-5 mr-2" />
                  Reverse
                </Button>
                <Button
                  onClick={() => handleTrainJog("stop")}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-red-600 hover:bg-red-700 text-white"
                >
                  <Square className="w-5 h-5 mr-2" />
                  Stop
                </Button>
                <Button
                  onClick={() => handleTrainJog("forward")}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-3 ${
                    trainJogState === "forward"
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-slate-600 hover:bg-slate-700"
                  } text-white`}
                >
                  <SkipForward className="w-5 h-5 mr-2" />
                  Forward
                </Button>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400">Status</div>
                <div className="text-lg font-mono text-white capitalize">
                  {trainJogState}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Isolate Tractor & Quick Actions */}
        <div className="space-y-4 sm:space-y-6">
          {/* Isolate Tractor */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Isolate Tractor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-white font-medium">Switch 1</label>
                  <Switch
                    checked={isolateSwitch1}
                    onCheckedChange={setIsolateSwitch1}
                    className="data-[state=checked]:bg-orange-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-white font-medium">Switch 2</label>
                  <Switch
                    checked={isolateSwitch2}
                    onCheckedChange={setIsolateSwitch2}
                    className="data-[state=checked]:bg-orange-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-white font-medium">Switch 3</label>
                  <Switch
                    checked={isolateSwitch3}
                    onCheckedChange={setIsolateSwitch3}
                    className="data-[state=checked]:bg-orange-500"
                  />
                </div>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-2">
                  Isolation Status
                </div>
                <div className="text-lg font-mono text-white">
                  {isolateSwitch1 || isolateSwitch2 || isolateSwitch3
                    ? "ISOLATED"
                    : "CONNECTED"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  className={`w-full justify-start ${action.color} text-white`}
                >
                  {action.icon}
                  <span className="ml-3">{action.label}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Safety Warning */}
      <Card className="bg-red-900/20 border-red-700">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <div>
              <div className="text-red-400 font-semibold">Safety Warning</div>
              <div className="text-slate-300 text-sm">
                Maintenance mode disables normal safety interlocks. Ensure all
                personnel are clear of equipment before operating jog controls.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsView({ augers }: { augers: AugerData[] }) {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [selectedAuger, setSelectedAuger] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"overview" | "individual">(
    "overview"
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Generate mock historical data
  const generateHistoricalData = (hours: number) => {
    const data = [];
    const now = new Date();
    for (let i = hours; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hour = time.getHours();
      // Simulate realistic patterns
      const baseLoad = 60 + Math.sin((hour * Math.PI) / 12) * 20; // Daily cycle
      const throughputVariation = (Math.sin(i * 0.1) + Math.cos(i * 0.05)) * 5; // Deterministic variation
      const tempVariation = Math.sin(i * 0.08) * 2.5;

      data.push({
        time: time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        timestamp: time.getTime(),
        avgThroughput: Math.max(0, baseLoad + throughputVariation),
        avgTemperature: 68 + Math.sin((hour * Math.PI) / 8) * 8 + tempVariation,
        avgHumidity:
          45 + Math.cos((hour * Math.PI) / 6) * 15 + Math.sin(i * 0.1) * 2.5,
        avgMotorLoad: Math.max(0, baseLoad * 0.8 + Math.sin(i * 0.12) * 7.5),
        avgChainRpm: Math.max(
          0,
          (baseLoad + throughputVariation) * 0.6 + Math.cos(i * 0.09) * 5
        ),
        avgVibration: 1.5 + Math.sin(i * 0.15) * 0.75,
        runningCount: Math.floor(
          augers.length * (0.7 + Math.sin(i * 0.05) * 0.125)
        ),
        totalOperatingHours: 1200 + (hours - i) * 0.8,
      });
    }
    return data;
  };

  // Generate individual auger historical data
  const generateIndividualData = (hours: number, augerId: string) => {
    const auger = augers.find((a) => a.id === augerId);
    if (!auger) return [];

    const data = [];
    const now = new Date();
    for (let i = hours; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hour = time.getHours();
      // Simulate realistic patterns for individual auger
      const baseLoad = auger.targetThroughput;
      const throughputVariation = Math.sin(i * 0.1) * 5;
      const actualThroughput = Math.max(0, baseLoad + throughputVariation);

      data.push({
        time: time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        timestamp: time.getTime(),
        actualThroughput: actualThroughput,
        targetThroughput: auger.targetThroughput,
        temperature:
          auger.temperature +
          Math.sin((hour * Math.PI) / 8) * 3 +
          Math.cos(i * 0.08) * 1,
        humidity:
          auger.humidity +
          Math.cos((hour * Math.PI) / 6) * 5 +
          Math.sin(i * 0.1) * 1.5,
        motorLoad: Math.max(
          0,
          (actualThroughput / auger.targetThroughput) * 85 +
            Math.sin(i * 0.12) * 5
        ),
        chainRpm: Math.max(0, actualThroughput * 0.6 + Math.cos(i * 0.09) * 4),
        vibration: 1.5 + Math.sin(i * 0.15) * 0.6,
        position: (auger.position + (hours - i) * 2) % 360,
      });
    }
    return data;
  };

  const getTimeRangeHours = (range: string) => {
    switch (range) {
      case "1h":
        return 1;
      case "6h":
        return 6;
      case "24h":
        return 24;
      case "7d":
        return 168;
      case "30d":
        return 720;
      default:
        return 24;
    }
  };

  const historicalData = generateHistoricalData(
    getTimeRangeHours(selectedTimeRange)
  );
  const individualData =
    selectedAuger !== "all"
      ? generateIndividualData(
          getTimeRangeHours(selectedTimeRange),
          selectedAuger
        )
      : [];

  // Calculate summary statistics
  const summaryStats = {
    totalAugers: augers.length,
    runningAugers: augers.filter((a) => a.isRunning).length,
    avgThroughput:
      augers.reduce((sum, a) => sum + a.throughput, 0) / augers.length,
    totalThroughput: augers.reduce((sum, a) => sum + a.throughput, 0),
    avgTemperature:
      augers.reduce((sum, a) => sum + a.temperature, 0) / augers.length,
    avgHumidity: augers.reduce((sum, a) => sum + a.humidity, 0) / augers.length,
    alertCount: augers.filter(
      (a) => a.status === "warning" || a.status === "error"
    ).length,
    efficiency:
      (augers.filter((a) => a.isRunning).length / augers.length) * 100,
  };

  // Filter augers based on search term
  const filteredAugers = augers.filter(
    (auger) =>
      auger.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auger.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: AugerData["status"]) => {
    switch (status) {
      case "optimal":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Analytics Dashboard
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Performance metrics and trends analysis
          </p>
        </div>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={viewMode}
            onChange={(e) => {
              setViewMode(e.target.value as "overview" | "individual");
              if (e.target.value === "overview") {
                setSelectedAuger("all");
              }
            }}
            className="bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 text-sm"
          >
            <option value="overview">System Overview</option>
            <option value="individual">Individual Sweep</option>
          </select>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Individual Auger Selection */}
      {viewMode === "individual" && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-white">Select Sweep Auger</CardTitle>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search augers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 text-sm w-48"
                />
                {selectedAuger !== "all" && (
                  <Button
                    onClick={() => setSelectedAuger("all")}
                    variant="outline"
                    size="sm"
                    className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    Clear Selection
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {filteredAugers.map((auger) => (
                <button
                  key={auger.id}
                  onClick={() => setSelectedAuger(auger.id)}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    selectedAuger === auger.id
                      ? "bg-orange-600 border-orange-500 text-white"
                      : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:border-slate-500"
                  }`}
                >
                  <div className="text-center">
                    <div className="font-mono font-bold text-sm">
                      {auger.id}
                    </div>
                    <div className="text-xs opacity-75">{auger.zone}</div>
                    <div
                      className={`w-2 h-2 rounded-full mx-auto mt-1 ${getStatusColor(
                        auger.status
                      )}`}
                    ></div>
                  </div>
                </button>
              ))}
            </div>
            {selectedAuger !== "all" && (
              <div className="mt-4 p-4 bg-slate-700 rounded-lg">
                <div className="text-white font-semibold mb-2">
                  Selected: {augers.find((a) => a.id === selectedAuger)?.id}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-slate-400">Status</div>
                    <div className="text-white capitalize">
                      {augers.find((a) => a.id === selectedAuger)?.status}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400">Current Throughput</div>
                    <div className="text-white">
                      {augers
                        .find((a) => a.id === selectedAuger)
                        ?.throughput.toFixed(1)}{" "}
                      t/hr
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400">Target Throughput</div>
                    <div className="text-white">
                      {augers
                        .find((a) => a.id === selectedAuger)
                        ?.targetThroughput.toFixed(1)}{" "}
                      t/hr
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400">Position</div>
                    <div className="text-white">
                      {augers.find((a) => a.id === selectedAuger)?.position}°
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {summaryStats.totalAugers}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">
              Total Augers
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-green-400">
              {summaryStats.runningAugers}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Running</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-blue-400">
              {summaryStats.totalThroughput.toFixed(0)}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Total t/hr</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-orange-400">
              {summaryStats.avgThroughput.toFixed(1)}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Avg t/hr</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-red-400">
              {summaryStats.avgTemperature.toFixed(1)}°
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Avg Temp</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-cyan-400">
              {summaryStats.avgHumidity.toFixed(1)}%
            </div>
            <div className="text-xs sm:text-sm text-slate-400">
              Avg Humidity
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-yellow-400">
              {summaryStats.alertCount}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Alerts</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-purple-400">
              {summaryStats.efficiency.toFixed(1)}%
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Efficiency</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Charts */}
      {viewMode === "overview" ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Throughput & Performance Metrics */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Throughput & Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer
                config={{
                  avgThroughput: {
                    label: "Avg Throughput (t/hr)",
                    color: "hsl(var(--chart-1))",
                  },
                  avgMotorLoad: {
                    label: "Avg Motor Load (%)",
                    color: "hsl(var(--chart-2))",
                  },
                  avgChainRpm: {
                    label: "Avg Chain RPM",
                    color: "hsl(var(--chart-3))",
                  },
                  runningCount: {
                    label: "Running Augers",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="w-full h-[350px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={historicalData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="time"
                      stroke="#9CA3AF"
                      fontSize={12}
                      interval="preserveStartEnd"
                    />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="avgThroughput"
                      stroke="#f97316"
                      strokeWidth={2}
                      name="Avg Throughput (t/hr)"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgMotorLoad"
                      stroke="#f03aff"
                      strokeWidth={2}
                      name="Avg Motor Load (%)"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgChainRpm"
                      stroke="#aab886ff"
                      strokeWidth={2}
                      name="Avg Chain RPM"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="runningCount"
                      stroke="#655e66ff"
                      strokeWidth={2}
                      name="Running Augers"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Environmental Metrics */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Thermometer className="w-5 h-5" />
                Environmental Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer
                config={{
                  avgTemperature: {
                    label: "Avg Temperature (°F)",
                    color: "hsl(var(--chart-5))",
                  },
                  avgHumidity: {
                    label: "Avg Humidity (%)",
                    color: "hsl(var(--chart-6))",
                  },
                  avgVibration: {
                    label: "Avg Vibration (mm/s)",
                    color: "hsl(var(--chart-7))",
                  },
                }}
                className="w-full h-[350px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={historicalData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="time"
                      stroke="#9CA3AF"
                      fontSize={12}
                      interval="preserveStartEnd"
                    />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="avgTemperature"
                      stroke="#8eab9aff"
                      strokeWidth={2}
                      name="Avg Temperature (°F)"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgHumidity"
                      stroke="#928a93ff"
                      strokeWidth={2}
                      name="Avg Humidity (%)"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgVibration"
                      stroke="#f03aff"
                      strokeWidth={2}
                      name="Avg Vibration (mm/s)"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Individual Auger Charts */
        selectedAuger !== "all" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            {/* Target vs Actual Throughput */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Target vs Actual Throughput
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ChartContainer
                  config={{
                    actualThroughput: {
                      label: "Actual Throughput (t/hr)",
                      color: "hsl(var(--chart-1))",
                    },
                    targetThroughput: {
                      label: "Target Throughput (t/hr)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="w-full h-[350px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={individualData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="time"
                        stroke="#9CA3AF"
                        fontSize={12}
                        interval="preserveStartEnd"
                      />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actualThroughput"
                        stroke="var(--color-actualThroughput)"
                        strokeWidth={3}
                        name="Actual Throughput"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="targetThroughput"
                        stroke="var(--color-targetThroughput)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target Throughput"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Individual Performance Metrics */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ChartContainer
                  config={{
                    motorLoad: {
                      label: "Motor Load (%)",
                      color: "hsl(var(--chart-3))",
                    },
                    chainRpm: {
                      label: "Chain RPM",
                      color: "hsl(var(--chart-4))",
                    },
                    vibration: {
                      label: "Vibration (mm/s)",
                      color: "hsl(var(--chart-5))",
                    },
                  }}
                  className="w-full h-[350px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={individualData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="time"
                        stroke="#9CA3AF"
                        fontSize={12}
                        interval="preserveStartEnd"
                      />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="motorLoad"
                        stroke="var(--color-motorLoad)"
                        strokeWidth={2}
                        name="Motor Load (%)"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="chainRpm"
                        stroke="var(--color-chainRpm)"
                        strokeWidth={2}
                        name="Chain RPM"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="vibration"
                        stroke="var(--color-vibration)"
                        strokeWidth={2}
                        name="Vibration (mm/s)"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Environmental Conditions for Individual Auger */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Thermometer className="w-5 h-5" />
                  Environmental Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ChartContainer
                  config={{
                    temperature: {
                      label: "Temperature (°F)",
                      color: "hsl(var(--chart-6))",
                    },
                    humidity: {
                      label: "Humidity (%)",
                      color: "hsl(var(--chart-7))",
                    },
                  }}
                  className="w-full h-[350px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={individualData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="time"
                        stroke="#9CA3AF"
                        fontSize={12}
                        interval="preserveStartEnd"
                      />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="var(--color-temperature)"
                        strokeWidth={2}
                        name="Temperature (°F)"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="humidity"
                        stroke="var(--color-humidity)"
                        strokeWidth={2}
                        name="Humidity (%)"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Position Tracking */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <RotateCw className="w-5 h-5" />
                  Position Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ChartContainer
                  config={{
                    position: {
                      label: "Position (degrees)",
                      color: "hsl(var(--chart-8))",
                    },
                  }}
                  className="w-full h-[350px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={individualData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="time"
                        stroke="#9CA3AF"
                        fontSize={12}
                        interval="preserveStartEnd"
                      />
                      <YAxis stroke="#9CA3AF" fontSize={12} domain={[0, 360]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="position"
                        stroke="var(--color-position)"
                        strokeWidth={2}
                        name="Position (°)"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        )
      )}

      {/* Individual Auger Performance Comparison - Only show in overview mode */}
      {viewMode === "overview" && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Auger Performance Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Throughput Comparison */}
              <div>
                <h3 className="text-white font-semibold mb-4">
                  Throughput vs Target
                </h3>
                <ChartContainer
                  config={{
                    throughput: {
                      label: "Current Throughput",
                      color: "hsl(var(--chart-1))",
                    },
                    target: {
                      label: "Target Throughput",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="w-full h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={augers.slice(0, 8)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="id" stroke="#9CA3AF" fontSize={10} />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar
                        dataKey="throughput"
                        fill="var(--color-throughput)"
                        name="Current"
                      />
                      <Bar
                        dataKey="targetThroughput"
                        fill="var(--color-target)"
                        name="Target"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              {/* Status Distribution */}
              <div>
                <h3 className="text-white font-semibold mb-4">
                  Status Distribution
                </h3>
                <div className="space-y-3">
                  {["optimal", "warning", "error", "stopped"].map((status) => {
                    const count = augers.filter(
                      (a) => a.status === status
                    ).length;
                    const percentage = (count / augers.length) * 100;
                    const colors = {
                      optimal: "bg-green-500",
                      warning: "bg-yellow-500",
                      error: "bg-red-500",
                      stopped: "bg-gray-500",
                    };
                    return (
                      <div
                        key={status}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              colors[status as keyof typeof colors]
                            }`}
                          ></div>
                          <span className="text-slate-300 capitalize">
                            {status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white font-mono">{count}</span>
                          <div className="w-20 bg-slate-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                colors[status as keyof typeof colors]
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-slate-400 text-sm w-12">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Performance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-900/20 rounded-lg border border-yellow-700">
              <div>
                <div className="text-yellow-400 font-medium">
                  High Temperature
                </div>
                <div className="text-slate-400 text-sm">
                  3 augers above 80°F
                </div>
              </div>
              <Badge className="bg-yellow-600 text-white">3</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg border border-red-700">
              <div>
                <div className="text-red-400 font-medium">Low Efficiency</div>
                <div className="text-slate-400 text-sm">
                  2 augers below target
                </div>
              </div>
              <Badge className="bg-red-600 text-white">2</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg border border-blue-700">
              <div>
                <div className="text-blue-400 font-medium">Maintenance Due</div>
                <div className="text-slate-400 text-sm">5 augers scheduled</div>
              </div>
              <Badge className="bg-blue-600 text-white">5</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-400" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {augers
              .filter((a) => a.isRunning)
              .sort((a, b) => b.throughput - a.throughput)
              .slice(0, 3)
              .map((auger, index) => (
                <div
                  key={auger.id}
                  className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-green-400 font-medium">
                        {auger.id}
                      </div>
                      <div className="text-slate-400 text-sm">{auger.zone}</div>
                    </div>
                  </div>
                  <div className="text-white font-mono">
                    {auger.throughput.toFixed(1)} t/hr
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Overall Efficiency</span>
                <span className="text-white font-mono">
                  {summaryStats.efficiency.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${summaryStats.efficiency}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Avg Utilization</span>
                <span className="text-white font-mono">87.3%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-[87%]"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">System Uptime</span>
                <span className="text-white font-mono">99.2%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-[99%]"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SettingsView() {
  const colorPalette = {
    // Background Colors
    backgrounds: [
      {
        name: "Primary Background",
        class: "bg-slate-900",
        hex: "#0f172a",
        rgb: "rgb(15, 23, 42)",
      },
      {
        name: "Card Background",
        class: "bg-slate-800",
        hex: "#1e293b",
        rgb: "rgb(30, 41, 59)",
      },
      {
        name: "Secondary Background",
        class: "bg-slate-700",
        hex: "#334155",
        rgb: "rgb(51, 65, 85)",
      },
      {
        name: "Tertiary Background",
        class: "bg-slate-600",
        hex: "#475569",
        rgb: "rgb(71, 85, 105)",
      },
      {
        name: "Input Background",
        class: "bg-slate-750",
        hex: "#293548",
        rgb: "rgb(41, 53, 72)",
      },
    ],
    // Text Colors
    text: [
      {
        name: "Primary Text",
        class: "text-white",
        hex: "#ffffff",
        rgb: "rgb(255, 255, 255)",
      },
      {
        name: "Secondary Text",
        class: "text-slate-300",
        hex: "#cbd5e1",
        rgb: "rgb(203, 213, 225)",
      },
      {
        name: "Tertiary Text",
        class: "text-slate-400",
        hex: "#94a3b8",
        rgb: "rgb(148, 163, 184)",
      },
      {
        name: "Muted Text",
        class: "text-slate-500",
        hex: "#64748b",
        rgb: "rgb(100, 116, 139)",
      },
    ],
    // Brand Colors
    brand: [
      {
        name: "Primary Orange",
        class: "bg-orange-500",
        hex: "#f97316",
        rgb: "rgb(249, 115, 22)",
      },
      {
        name: "Orange Hover",
        class: "bg-orange-600",
        hex: "#ea580c",
        rgb: "rgb(234, 88, 12)",
      },
      {
        name: "Orange Light",
        class: "bg-orange-400",
        hex: "#fb923c",
        rgb: "rgb(251, 146, 60)",
      },
      {
        name: "Orange Text",
        class: "text-orange-400",
        hex: "#fb923c",
        rgb: "rgb(251, 146, 60)",
      },
      {
        name: "Orange Border",
        class: "border-orange-500",
        hex: "#f97316",
        rgb: "rgb(249, 115, 22)",
      },
    ],
    // Status Colors
    status: [
      {
        name: "Success/Optimal",
        class: "bg-green-500",
        hex: "#22c55e",
        rgb: "rgb(34, 197, 94)",
      },
      {
        name: "Success Hover",
        class: "bg-green-600",
        hex: "#16a34a",
        rgb: "rgb(22, 163, 74)",
      },
      {
        name: "Success Text",
        class: "text-green-400",
        hex: "#4ade80",
        rgb: "rgb(74, 222, 128)",
      },
      {
        name: "Warning",
        class: "bg-yellow-500",
        hex: "#eab308",
        rgb: "rgb(234, 179, 8)",
      },
      {
        name: "Warning Hover",
        class: "bg-yellow-600",
        hex: "#ca8a04",
        rgb: "rgb(202, 138, 4)",
      },
      {
        name: "Warning Text",
        class: "text-yellow-400",
        hex: "#facc15",
        rgb: "rgb(250, 204, 21)",
      },
      {
        name: "Error/Danger",
        class: "bg-red-500",
        hex: "#ef4444",
        rgb: "rgb(239, 68, 68)",
      },
      {
        name: "Error Hover",
        class: "bg-red-600",
        hex: "#dc2626",
        rgb: "rgb(220, 38, 38)",
      },
      {
        name: "Error Text",
        class: "text-red-400",
        hex: "#f87171",
        rgb: "rgb(248, 113, 113)",
      },
      {
        name: "Stopped/Inactive",
        class: "bg-gray-500",
        hex: "#6b7280",
        rgb: "rgb(107, 114, 128)",
      },
    ],
    // Functional Colors
    functional: [
      {
        name: "Blue Primary",
        class: "bg-blue-500",
        hex: "#3b82f6",
        rgb: "rgb(59, 130, 246)",
      },
      {
        name: "Blue Hover",
        class: "bg-blue-600",
        hex: "#2563eb",
        rgb: "rgb(37, 99, 235)",
      },
      {
        name: "Blue Text",
        class: "text-blue-400",
        hex: "#60a5fa",
        rgb: "rgb(96, 165, 250)",
      },
      {
        name: "Purple Primary",
        class: "bg-purple-500",
        hex: "#a855f7",
        rgb: "rgb(168, 85, 247)",
      },
      {
        name: "Purple Hover",
        class: "bg-purple-600",
        hex: "#9333ea",
        rgb: "rgb(147, 51, 234)",
      },
      {
        name: "Purple Text",
        class: "text-purple-400",
        hex: "#c084fc",
        rgb: "rgb(192, 132, 252)",
      },
      {
        name: "Cyan Primary",
        class: "bg-cyan-500",
        hex: "#06b6d4",
        rgb: "rgb(6, 182, 212)",
      },
      {
        name: "Cyan Text",
        class: "text-cyan-400",
        hex: "#22d3ee",
        rgb: "rgb(34, 211, 238)",
      },
    ],
    // Border Colors
    borders: [
      {
        name: "Primary Border",
        class: "border-slate-700",
        hex: "#334155",
        rgb: "rgb(51, 65, 85)",
      },
      {
        name: "Secondary Border",
        class: "border-slate-600",
        hex: "#475569",
        rgb: "rgb(71, 85, 105)",
      },
      {
        name: "Success Border",
        class: "border-green-700",
        hex: "#15803d",
        rgb: "rgb(21, 128, 61)",
      },
      {
        name: "Warning Border",
        class: "border-yellow-700",
        hex: "#a16207",
        rgb: "rgb(161, 98, 7)",
      },
      {
        name: "Error Border",
        class: "border-red-700",
        hex: "#b91c1c",
        rgb: "rgb(185, 28, 28)",
      },
      {
        name: "Blue Border",
        class: "border-blue-700",
        hex: "#1d4ed8",
        rgb: "rgb(29, 78, 216)",
      },
    ],
    // Chart Colors (Based on shadcn chart defaults)
    charts: [
      {
        name: "Chart Color 1",
        class: "chart-1",
        hex: "#e11d48",
        rgb: "rgb(225, 29, 72)",
      },
      {
        name: "Chart Color 2",
        class: "chart-2",
        hex: "#f97316",
        rgb: "rgb(249, 115, 22)",
      },
      {
        name: "Chart Color 3",
        class: "chart-3",
        hex: "#eab308",
        rgb: "rgb(234, 179, 8)",
      },
      {
        name: "Chart Color 4",
        class: "chart-4",
        hex: "#22c55e",
        rgb: "rgb(34, 197, 94)",
      },
      {
        name: "Chart Color 5",
        class: "chart-5",
        hex: "#3b82f6",
        rgb: "rgb(59, 130, 246)",
      },
      {
        name: "Chart Color 6",
        class: "chart-6",
        hex: "#a855f7",
        rgb: "rgb(168, 85, 247)",
      },
      {
        name: "Chart Color 7",
        class: "chart-7",
        hex: "#06b6d4",
        rgb: "rgb(6, 182, 212)",
      },
      {
        name: "Chart Color 8",
        class: "chart-8",
        hex: "#84cc16",
        rgb: "rgb(132, 204, 22)",
      },
    ],
    // Semantic Alert Colors
    alerts: [
      {
        name: "Success Alert BG",
        class: "bg-green-900/20",
        hex: "#14532d33",
        rgb: "rgba(20, 83, 45, 0.2)",
      },
      {
        name: "Warning Alert BG",
        class: "bg-yellow-900/20",
        hex: "#78350f33",
        rgb: "rgba(120, 53, 15, 0.2)",
      },
      {
        name: "Error Alert BG",
        class: "bg-red-900/20",
        hex: "#7f1d1d33",
        rgb: "rgba(127, 29, 29, 0.2)",
      },
      {
        name: "Info Alert BG",
        class: "bg-blue-900/20",
        hex: "#1e3a8a33",
        rgb: "rgba(30, 58, 138, 0.2)",
      },
    ],
  };

  const ColorSwatch = ({
    color,
  }: {
    color: { name: string; class: string; hex: string; rgb: string };
  }) => (
    <div className="bg-slate-700 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-medium text-sm">{color.name}</h4>
        <div
          className={`w-8 h-8 rounded-md border-2 border-slate-600 ${
            color.class.includes("text-") ? "bg-slate-800" : color.class
          }`}
          style={
            color.class.includes("text-") ? { backgroundColor: color.hex } : {}
          }
        />
      </div>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">Class:</span>
          <code className="text-slate-300 bg-slate-800 px-2 py-1 rounded">
            {color.class}
          </code>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Hex:</span>
          <code className="text-slate-300 bg-slate-800 px-2 py-1 rounded font-mono">
            {color.hex}
          </code>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">RGB:</span>
          <code className="text-slate-300 bg-slate-800 px-2 py-1 rounded font-mono text-xs">
            {color.rgb}
          </code>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          System Settings
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Color palette and system configuration
        </p>
      </div>

      {/* Color Palette Section */}
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
            Color Palette
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Complete color system used throughout the Industrial Sweep Auger
            Control interface
          </p>
        </div>

        {/* Background Colors */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-700 rounded"></div>
              Background Colors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {colorPalette.backgrounds.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Text Colors */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-4 h-4 bg-white rounded"></div>
              Text Colors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {colorPalette.text.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Brand Colors */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              Brand Colors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {colorPalette.brand.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Colors */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded"></div>
              Status Colors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {colorPalette.status.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Functional Colors */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded"></div>
              Functional Colors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {colorPalette.functional.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Border Colors */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-slate-400 rounded bg-transparent"></div>
              Border Colors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {colorPalette.borders.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chart Colors */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Chart Colors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
              {colorPalette.charts.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alert Colors */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Alert Background Colors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {colorPalette.alerts.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Color Usage Guidelines */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" />
              Color Usage Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-white font-semibold">Status Indicators</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-slate-300">
                      Green: Optimal operation, success states
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-slate-300">
                      Yellow: Warnings, adjusting states
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-slate-300">
                      Red: Errors, critical alerts
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-slate-300">
                      Gray: Stopped, inactive states
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-white font-semibold">Brand Usage</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-slate-300">
                      Orange: Primary brand color, CTAs
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-300">
                      Blue: Secondary actions, info states
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-300">
                      Purple: Analytics, performance metrics
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-slate-300">
                      Cyan: Environmental data, sensors
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function GridOverview({
  augers,
  onSelectAuger,
}: {
  augers: AugerData[];
  onSelectAuger: (id: string) => void;
}) {
  const getStatusColor = (status: AugerData["status"]) => {
    switch (status) {
      case "optimal":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: AugerData["status"]) => {
    switch (status) {
      case "optimal":
        return "OPTIMAL";
      case "warning":
        return "WARNING";
      case "error":
        return "ERROR";
      default:
        return "STOPPED";
    }
  };

  const runningCount = augers.filter((a) => a.isRunning).length;
  const warningCount = augers.filter(
    (a) => a.status === "warning" || a.status === "error"
  ).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {augers.length}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">
              Total Augers
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-green-400">
              {runningCount}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Running</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-yellow-400">
              {warningCount}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Alerts</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-slate-300">
              {augers.length - runningCount}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Stopped</div>
          </CardContent>
        </Card>
      </div>

      {/* Auger Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {augers.map((auger) => (
          <Card
            key={auger.id}
            className="bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors"
            onClick={() => onSelectAuger(auger.id)}
          >
            <CardHeader className="pb-2 sm:pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-base sm:text-lg">
                  {auger.id}
                </CardTitle>
                <Badge
                  className={`${getStatusColor(
                    auger.status
                  )} text-white border-0 text-xs`}
                >
                  {getStatusText(auger.status)}
                </Badge>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm">{auger.zone}</p>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {/* Mini Position Display */}
              <div className="flex items-center justify-start">
                <div className="relative w-12 sm:w-16 h-12 sm:h-16">
                  <div className="absolute inset-1 rounded-full border-2 border-slate-600 bg-slate-900"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="absolute w-0.5 bg-orange-500"
                      style={{
                        height: "18px",
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -100%) rotate(${auger.position}deg)`,
                        transformOrigin: "50% 100%",
                      }}
                    />
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-orange-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                </div>
                <div className="ml-2 sm:ml-3 text-center">
                  <div className="text-base sm:text-lg font-mono text-white">
                    {auger.position}°
                  </div>
                  <div className="text-xs text-slate-400">Position</div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                <div>
                  <div className="text-slate-400">Throughput</div>
                  <div className="text-white font-mono">
                    {auger.throughput.toFixed(0)} t/hr
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Target</div>
                  <div className="text-white font-mono">
                    {auger.targetThroughput.toFixed(0)} t/hr
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Temp</div>
                  <div className="text-white font-mono">
                    {auger.temperature.toFixed(1)}°F
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Humidity</div>
                  <div className="text-white font-mono">
                    {auger.humidity.toFixed(1)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DetailedView({
  augerId,
  onBack,
}: {
  augerId: string;
  onBack: () => void;
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [augerPosition, setAugerPosition] = useState(0);
  const [targetThroughput, setTargetThroughput] = useState([75]);
  const [currentThroughput, setCurrentThroughput] = useState(0);
  const [temperature, setTemperature] = useState(68.5);
  const [humidity, setHumidity] = useState(45.2);
  const [operatingHours, setOperatingHours] = useState(1247.5);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [chainRpm, setChainRpm] = useState(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setAugerPosition((prev) => (prev + 2) % 360);
        setCurrentThroughput((prev) => {
          const target = targetThroughput[0];
          const diff = target - prev;
          return prev + diff * 0.1 + (Math.random() - 0.5) * 2;
        });
        setTemperature((prev) => prev + (Math.random() - 0.5) * 0.5);
        setHumidity((prev) =>
          Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 1))
        );
        setOperatingHours((prev) => prev + 0.001);
        setChainRpm((prev) => {
          if (!isRunning) return 0;
          const baseRpm = 45 + (currentThroughput / 150) * 30; // RPM based on throughput
          return baseRpm + (Math.random() - 0.5) * 2; // Add some variation
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setCurrentThroughput(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, targetThroughput]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  const getStatusColor = () => {
    if (!isRunning) return "bg-gray-500";
    if (Math.abs(currentThroughput - targetThroughput[0]) > 10)
      return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStatusText = () => {
    if (!isRunning) return "STOPPED";
    if (Math.abs(currentThroughput - targetThroughput[0]) > 10)
      return "ADJUSTING";
    return "OPTIMAL";
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600 self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Overview
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Industrial Sweep Auger Control
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              System ID: {augerId} | Zone: Grain Processing Unit A
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Badge
            variant="outline"
            className={`${getStatusColor()} text-white border-0 px-4 py-2 self-start sm:self-auto`}
          >
            {getStatusText()}
          </Badge>
          <div className="text-left sm:text-right text-slate-300">
            <div className="text-sm">Operating Hours</div>
            <div className="text-xl font-mono">{operatingHours.toFixed(1)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Auger Position Display */}
        <Card className="bg-slate-800 border-slate-700 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
              <RotateCw className="w-5 h-5" />
              Auger Position
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-6 sm:py-8">
            <div className="relative w-48 sm:w-56 h-48 sm:h-56 mb-4 sm:mb-6">
              {/* Outer ring */}
              <div className="absolute inset-4 rounded-full border-4 border-slate-600 bg-slate-900"></div>
              {/* Degree markers */}
              <div className="absolute inset-0">
                {/* 0° (top) */}
                <div className="absolute w-0.5 h-6 sm:h-8 bg-slate-400 left-1/2 top-0 transform -translate-x-1/2"></div>
                <div className="absolute text-slate-400 text-xs sm:text-sm font-mono top-1 sm:top-2 left-1/2 transform -translate-x-1/2">
                  0°
                </div>
                {/* 90° (right) */}
                <div className="absolute w-6 sm:w-8 h-0.5 bg-slate-400 right-0 top-1/2 transform -translate-y-1/2"></div>
                <div className="absolute text-slate-400 text-xs sm:text-sm font-mono right-1 sm:right-2 top-1/2 transform -translate-y-1/2">
                  90°
                </div>
                {/* 180° (bottom) */}
                <div className="absolute w-0.5 h-6 sm:h-8 bg-slate-400 left-1/2 bottom-0 transform -translate-x-1/2"></div>
                <div className="absolute text-slate-400 text-xs sm:text-sm font-mono bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2">
                  180°
                </div>
                {/* 270° (left) */}
                <div className="absolute w-6 sm:w-8 h-0.5 bg-slate-400 left-0 top-1/2 transform -translate-y-1/2"></div>
                <div className="absolute text-slate-400 text-xs sm:text-sm font-mono left-1 sm:left-2 top-1/2 transform -translate-y-1/2">
                  270°
                </div>
              </div>
              {/* Position indicator arm */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="absolute w-1 bg-orange-500 transition-transform duration-100 rounded-full"
                  style={{
                    height: "75px",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -100%) rotate(${augerPosition}deg)`,
                    transformOrigin: "50% 100%",
                  }}
                />
              </div>
              {/* Center hub */}
              <div className="absolute top-1/2 left-1/2 w-5 sm:w-6 h-5 sm:h-6 bg-orange-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-orange-400 z-10"></div>
            </div>
            {/* Position readout */}
            <div className="bg-slate-700 rounded-lg px-4 sm:px-6 py-3 sm:py-4 w-full max-w-xs">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1">
                  {augerPosition.toFixed(0)}°
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mb-2 sm:mb-3">
                  CURRENT POSITION
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <div className="text-slate-300">
                    <div>Sweep Rate</div>
                    <div className="font-mono text-orange-400">
                      {isRunning ? "2.0" : "0.0"} °/sec
                    </div>
                  </div>
                  <div className="text-slate-300">
                    <div>Direction</div>
                    <div className="font-mono text-orange-400">CW</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls and Throughput */}
        <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
              <Gauge className="w-5 h-5" />
              System Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {/* Control Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                onClick={handleStart}
                disabled={isRunning}
                className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                START
              </Button>
              <Button
                onClick={handleStop}
                disabled={!isRunning}
                className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg"
              >
                <Square className="w-5 h-5 mr-2" />
                STOP
              </Button>
            </div>

            {/* Throughput Control */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <label className="text-white font-medium">
                  Target Throughput
                </label>
                <span className="text-orange-400 font-mono text-lg">
                  {targetThroughput[0]} t/hr
                </span>
              </div>
              <Slider
                value={targetThroughput}
                onValueChange={setTargetThroughput}
                max={150}
                min={0}
                step={5}
                className="[&>span:first-child]:h-3 [&>span:first-child]:bg-slate-600 [&_[role=slider]]:bg-orange-500 [&_[role=slider]]:w-6 [&_[role=slider]]:h-6 [&_[role=slider]]:border-2 [&_[role=slider]]:border-orange-400 [&>span:first-child_span]:bg-orange-500"
              />
              <div className="flex justify-between text-xs sm:text-sm text-slate-400">
                <span>0 t/hr</span>
                <span>75 t/hr</span>
                <span>150 t/hr</span>
              </div>
            </div>

            {/* Current Throughput Display */}
            <div className="bg-slate-700 rounded-lg p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                <span className="text-slate-300">Current Throughput</span>
                <span className="text-xl sm:text-2xl font-mono text-white">
                  {currentThroughput.toFixed(1)} t/hr
                </span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (currentThroughput / 150) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Chain RPM Display */}
            <div className="bg-slate-700 rounded-lg p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                <span className="text-slate-300">Chain RPM</span>
                <span className="text-xl sm:text-2xl font-mono text-white">
                  {chainRpm.toFixed(0)} RPM
                </span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (chainRpm / 100) * 100)}%` }}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm text-slate-400 mt-1 gap-1">
                <span>Optimal Range: 40-80 RPM</span>
                {chainRpm > 80 && (
                  <span className="text-yellow-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    High RPM
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Monitoring */}
        <Card className="bg-slate-800 border-slate-700 xl:col-span-3">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-white text-lg sm:text-xl">
              Environmental Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Temperature */}
              <div className="bg-slate-700 rounded-lg p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Thermometer className="w-5 sm:w-6 h-5 sm:h-6 text-red-400" />
                  <span className="text-slate-300 font-medium text-sm sm:text-base">
                    Temperature
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-mono text-white mb-1">
                  {temperature.toFixed(1)}°F
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mb-2">
                  Commodity Temp
                </div>
                {temperature > 80 && (
                  <div className="flex items-center gap-2 text-yellow-400">
                    <AlertTriangle className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span className="text-xs font-medium">HIGH TEMP</span>
                  </div>
                )}
              </div>

              {/* Humidity */}
              <div className="bg-slate-700 rounded-lg p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Droplets className="w-5 sm:w-6 h-5 sm:h-6 text-blue-400" />
                  <span className="text-slate-300 font-medium text-sm sm:text-base">
                    Humidity
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-mono text-white mb-1">
                  {humidity.toFixed(1)}%
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mb-2">
                  Relative Humidity
                </div>
                {humidity > 60 && (
                  <div className="flex items-center gap-2 text-yellow-400">
                    <AlertTriangle className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span className="text-xs font-medium">HIGH HUMIDITY</span>
                  </div>
                )}
              </div>

              {/* Motor Load */}
              <div className="bg-slate-700 rounded-lg p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Gauge className="w-5 sm:w-6 h-5 sm:h-6 text-green-400" />
                  <span className="text-slate-300 font-medium text-sm sm:text-base">
                    Motor Load
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-mono text-white mb-1">
                  {isRunning ? "87.3" : "0.0"}%
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mb-2">
                  Current Load
                </div>
              </div>

              {/* Vibration */}
              <div className="bg-slate-700 rounded-lg p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-5 sm:w-6 h-5 sm:h-6 bg-purple-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-slate-300 font-medium text-sm sm:text-base">
                    Vibration
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-mono text-white mb-1">
                  {isRunning ? "2.1" : "0.0"} mm/s
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mb-2">
                  RMS Velocity
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Component() {
  const [currentView, setCurrentView] = useState<
    "grid" | "detail" | "maintenance" | "analytics" | "settings"
  >("grid");
  const [selectedAugerId, setSelectedAugerId] = useState<string>("");
  const [augers] = useState<AugerData[]>(mockAugerData);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSelectAuger = (id: string) => {
    setSelectedAugerId(id);
    setCurrentView("detail");
  };

  const handleBackToGrid = () => {
    setCurrentView("grid");
    setSelectedAugerId("");
  };

  const handleViewChange = (view: string) => {
    setCurrentView(
      view as "grid" | "detail" | "maintenance" | "analytics" | "settings"
    );
    if (view === "maintenance" && !selectedAugerId) {
      setSelectedAugerId("SA-001"); // Default to first auger for maintenance
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        } ${sidebarCollapsed ? "md:ml-20" : "md:ml-64"}`}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {currentView === "grid" ? (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                      Sweep Auger Control Center
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base">
                      Industrial Grain Processing Facility
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Grid3X3 className="w-4 sm:w-5 h-4 sm:h-5 text-slate-400" />
                    <span className="text-slate-400 text-sm sm:text-base">
                      Grid View
                    </span>
                  </div>
                </div>
                <GridOverview
                  augers={augers}
                  onSelectAuger={handleSelectAuger}
                />
              </div>
            ) : currentView === "detail" ? (
              <DetailedView
                augerId={selectedAugerId}
                onBack={handleBackToGrid}
              />
            ) : currentView === "maintenance" ? (
              <MaintenanceView augerId={selectedAugerId} />
            ) : currentView === "analytics" ? (
              <AnalyticsView augers={augers} />
            ) : currentView === "settings" ? (
              <SettingsView />
            ) : (
              <div className="text-white text-center py-16 sm:py-20">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                  Coming Soon
                </h2>
                <p className="text-slate-400">
                  This section is under development.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
