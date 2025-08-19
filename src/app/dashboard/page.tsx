"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, List, Map } from "lucide-react";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { mockAugerData, type AugerData } from "@/lib/mock-data";

function ListView({ augers }: { augers: AugerData[] }) {
  const getStatusColor = (status: AugerData["status"]) => {
    switch (status) {
      case "optimal":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "error":
        return "text-red-400";
      default:
        return "text-gray-400";
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

  return (
    <div className="space-y-4">
      <Card className="bg-raptor-gray border-slate-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-4 text-slate-300 font-medium">
                    ID
                  </th>
                  <th className="text-left p-4 text-slate-300 font-medium">
                    Zone
                  </th>
                  <th className="text-left p-4 text-slate-300 font-medium">
                    Status
                  </th>
                  <th className="text-left p-4 text-slate-300 font-medium">
                    Position
                  </th>
                  <th className="text-left p-4 text-slate-300 font-medium">
                    Throughput
                  </th>
                  <th className="text-left p-4 text-slate-300 font-medium">
                    Target
                  </th>
                  <th className="text-left p-4 text-slate-300 font-medium">
                    Temperature
                  </th>
                  <th className="text-left p-4 text-slate-300 font-medium">
                    Humidity
                  </th>
                </tr>
              </thead>
              <tbody>
                {augers.map((auger) => (
                  <tr
                    key={auger.id}
                    className="border-b border-slate-700 hover:bg-raptor-lightgray cursor-pointer transition-colors"
                    onClick={() =>
                      (window.location.href = `/auger/${auger.id}`)
                    }
                  >
                    <td className="p-4">
                      <div className="text-white font-mono font-bold">
                        {auger.id}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-slate-300">{auger.zone}</div>
                    </td>
                    <td className="p-4">
                      <div
                        className={`font-medium ${getStatusColor(
                          auger.status
                        )}`}
                      >
                        {getStatusText(auger.status)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white font-mono">
                        {auger.position}°
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white font-mono">
                        {auger.throughput.toFixed(1)} t/hr
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white font-mono">
                        {auger.targetThroughput.toFixed(1)} t/hr
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white font-mono">
                        {auger.temperature.toFixed(1)}°F
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-white font-mono">
                        {auger.humidity.toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MapView({ augers }: { augers: AugerData[] }) {
  // Mock geographical locations for demonstration
  const locations = [
    {
      name: "Iowa Facility",
      lat: 42.0,
      lng: -93.5,
      augers: augers.slice(0, 8),
    },
    {
      name: "Nebraska Plant",
      lat: 41.5,
      lng: -99.9,
      augers: augers.slice(8, 16),
    },
    {
      name: "Kansas Site",
      lat: 38.5,
      lng: -98.0,
      augers: augers.slice(16, 24),
    },
  ];

  const getHotspotSize = (augerCount: number) => {
    if (augerCount >= 8) return "w-8 h-8";
    if (augerCount >= 4) return "w-6 h-6";
    return "w-4 h-4";
  };

  const getHotspotIntensity = (augers: AugerData[]) => {
    const runningCount = augers.filter((a) => a.isRunning).length;
    const percentage = runningCount / augers.length;
    if (percentage >= 0.8) return "bg-green-500";
    if (percentage >= 0.5) return "bg-raptor-yellow";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-raptor-gray border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Geographic Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Simulated Map Background */}
          <div className="relative bg-slate-900 rounded-lg h-96 overflow-hidden">
            {/* Grid lines to simulate map */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute w-full h-px bg-slate-600"
                  style={{ top: `${i * 10}%` }}
                />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute h-full w-px bg-slate-600"
                  style={{ left: `${i * 10}%` }}
                />
              ))}
            </div>

            {/* Location Hotspots */}
            {locations.map((location, index) => (
              <div
                key={location.name}
                className="absolute cursor-pointer group"
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${30 + index * 15}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Hotspot Circle */}
                <div
                  className={`${getHotspotSize(
                    location.augers.length
                  )} ${getHotspotIntensity(
                    location.augers
                  )} rounded-full opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}
                >
                  <span className="text-white text-xs font-bold">
                    {location.augers.length}
                  </span>
                </div>

                {/* Pulse Animation */}
                <div
                  className={`absolute inset-0 ${getHotspotIntensity(
                    location.augers
                  )} rounded-full animate-ping opacity-30`}
                ></div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-raptor-lightgray text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  <div className="font-semibold">{location.name}</div>
                  <div>{location.augers.length} Augers</div>
                  <div>
                    {location.augers.filter((a) => a.isRunning).length} Running
                  </div>
                </div>
              </div>
            ))}

            {/* Map Labels */}
            <div className="absolute top-4 left-4 text-slate-400 text-sm">
              <div>Midwest Region</div>
              <div className="text-xs">Grain Processing Facilities</div>
            </div>
          </div>

          {/* Location Details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {locations.map((location) => (
              <Card
                key={location.name}
                className="bg-raptor-gray border-slate-600"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg">
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Total Augers:</span>
                    <span className="text-white font-mono">
                      {location.augers.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Running:</span>
                    <span className="text-green-400 font-mono">
                      {location.augers.filter((a) => a.isRunning).length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Alerts:</span>
                    <span className="text-yellow-400 font-mono">
                      {
                        location.augers.filter(
                          (a) => a.status === "warning" || a.status === "error"
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Avg Throughput:</span>
                    <span className="text-white font-mono">
                      {(
                        location.augers.reduce(
                          (sum, a) => sum + a.throughput,
                          0
                        ) / location.augers.length
                      ).toFixed(1)}{" "}
                      t/hr
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-slate-300 text-sm">
                High Performance (80%+ Running)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-raptor-yellow"></div>
              <span className="text-slate-300 text-sm">
                Medium Performance (50-80% Running)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-slate-300 text-sm">
                Low Performance (&lt;50% Running)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function GridOverview({ augers }: { augers: AugerData[] }) {
  const getStatusColor = (status: AugerData["status"]) => {
    switch (status) {
      case "optimal":
        return "bg-green-500";
      case "warning":
        return "bg-raptor-yellow";
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
        <Card className="bg-raptor-gray border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {augers.length}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">
              Total Augers
            </div>
          </CardContent>
        </Card>
        <Card className="bg-raptor-gray border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-green-400">
              {runningCount}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Running</div>
          </CardContent>
        </Card>
        <Card className="bg-raptor-gray border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-yellow-400">
              {warningCount}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Alerts</div>
          </CardContent>
        </Card>
        <Card className="bg-raptor-gray border-slate-700">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-slate-300">
              {augers.length - runningCount}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Stopped</div>
          </CardContent>
        </Card>
      </div>

      {/* Auger Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {augers.map((auger) => (
          <Card
            key={auger.id}
            className="bg-raptor-gray border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors"
            onClick={() => (window.location.href = `/auger/${auger.id}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">{auger.id}</CardTitle>
                <Badge
                  className={`${getStatusColor(
                    auger.status
                  )} text-white border-0 text-xs`}
                >
                  {getStatusText(auger.status)}
                </Badge>
              </div>
              <p className="text-slate-400 text-sm">{auger.zone}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mini Position Display */}
              <div className="flex items-center justify-start">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-1 rounded-full border-2 border-slate-600 bg-slate-900"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="absolute w-0.5 bg-raptor-yellow"
                      style={{
                        height: "18px",
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -100%) rotate(${auger.position}deg)`,
                        transformOrigin: "50% 100%",
                      }}
                    />
                  </div>
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-raptor-yellow rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                </div>
                <div className="ml-3 text-center">
                  <div className="text-lg font-mono text-white">
                    {auger.position}°
                  </div>
                  <div className="text-xs text-slate-400">Position</div>
                </div>
              </div>
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3 text-sm">
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

export default function DashboardPage() {
  const [augers] = useState<AugerData[]>(mockAugerData);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{ color: "#FAD512" }}
            >
              Raptor Sweep Dashboard
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Sioux Steel Co.
            </p>
          </div>
          <div className="flex items-center gap-1 self-start sm:self-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors relative ${
                viewMode === "grid"
                  ? "bg-raptor-lightgray text-white"
                  : "bg-raptor-gray text-slate-400 hover:bg-raptor-lightgray hover:text-white"
              }`}
            >
              {viewMode === "grid" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-raptor-yellow rounded-l-md"></div>
              )}
              <Grid3X3 className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors relative ${
                viewMode === "list"
                  ? "bg-raptor-lightgray text-white"
                  : "bg-raptor-gray text-slate-400 hover:bg-raptor-lightgray hover:text-white"
              }`}
            >
              {viewMode === "list" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-raptor-yellow rounded-l-md"></div>
              )}
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors relative ${
                viewMode === "map"
                  ? "bg-raptor-lightgray text-white"
                  : "bg-raptor-gray text-slate-400 hover:bg-raptor-lightgray hover:text-white"
              }`}
            >
              {viewMode === "map" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-raptor-yellow rounded-l-md"></div>
              )}
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Map</span>
            </button>
          </div>
        </div>
        {viewMode === "grid" && <GridOverview augers={augers} />}
        {viewMode === "list" && <ListView augers={augers} />}
        {viewMode === "map" && <MapView augers={augers} />}
      </div>
    </LayoutWrapper>
  );
}
