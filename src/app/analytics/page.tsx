"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AlertTriangle, Thermometer, BarChart3, Activity } from "lucide-react";
import { mockAugerData, type AugerData } from "@/lib/mock-data";
import { LayoutWrapper } from "@/components/layout-wrapper";

export default function AnalyticsPage() {
  const [augers] = useState<AugerData[]>(mockAugerData);
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

  return (
    <LayoutWrapper>
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
              <div className="text-xs sm:text-sm text-slate-400">
                Total t/hr
              </div>
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
              <div className="text-xs sm:text-sm text-slate-400">
                Efficiency
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Charts */}
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
                  <div className="text-blue-400 font-medium">
                    Maintenance Due
                  </div>
                  <div className="text-slate-400 text-sm">
                    5 augers scheduled
                  </div>
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
                        <div className="text-slate-400 text-sm">
                          {auger.zone}
                        </div>
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
    </LayoutWrapper>
  );
}
