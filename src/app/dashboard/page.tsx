"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Grid3X3 } from "lucide-react";
import { mockAugerData, type AugerData } from "@/lib/mock-data";
import { LayoutWrapper } from "@/components/layout-wrapper";

function GridOverview({ augers }: { augers: AugerData[] }) {
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
          <Link key={auger.id} href={`/auger/${auger.id}`}>
            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors">
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
                <p className="text-slate-400 text-xs sm:text-sm">
                  {auger.zone}
                </p>
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
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [augers] = useState<AugerData[]>(mockAugerData);

  return (
    <LayoutWrapper>
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
        <GridOverview augers={augers} />
      </div>
    </LayoutWrapper>
  );
}
