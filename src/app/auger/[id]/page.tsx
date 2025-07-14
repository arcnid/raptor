// src/app/auger/[id]/page.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Square,
  AlertTriangle,
  Thermometer,
  Droplets,
  Gauge,
  RotateCw,
  ArrowLeft,
} from "lucide-react";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { mockAugerData } from "@/lib/mock-data";

export default function AugerDetailPage() {
  // grab the dynamic route param
  const { id } = useParams() as { id: string };

  const [isRunning, setIsRunning] = useState(false);
  const [augerPosition, setAugerPosition] = useState(0);
  const [targetThroughput, setTargetThroughput] = useState([75]);
  const [currentThroughput, setCurrentThroughput] = useState(0);
  const [temperature, setTemperature] = useState(68.5);
  const [humidity, setHumidity] = useState(45.2);
  const [operatingHours, setOperatingHours] = useState(1247.5);
  const [chainRpm, setChainRpm] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const auger = mockAugerData.find((a) => a.id === id);

  useEffect(() => {
    if (auger) {
      setAugerPosition(auger.position);
      setCurrentThroughput(auger.throughput);
      setTargetThroughput([auger.targetThroughput]);
      setTemperature(auger.temperature);
      setHumidity(auger.humidity);
      setIsRunning(auger.isRunning);
    }
  }, [auger]);

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
          const baseRpm = 45 + (currentThroughput / 150) * 30;
          return baseRpm + (Math.random() - 0.5) * 2;
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentThroughput(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, targetThroughput, currentThroughput]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  const getStatusColor = () => {
    if (!isRunning) return "bg-gray-500";
    return Math.abs(currentThroughput - targetThroughput[0]) > 10
      ? "bg-yellow-500"
      : "bg-green-500";
  };

  const getStatusText = () => {
    if (!isRunning) return "STOPPED";
    return Math.abs(currentThroughput - targetThroughput[0]) > 10
      ? "ADJUSTING"
      : "OPTIMAL";
  };

  if (!auger) {
    return (
      <LayoutWrapper>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-white mb-4">
            Auger Not Found
          </h1>
          <p className="text-slate-400 mb-6">
            The requested auger could not be found.
          </p>
          <Link href="/dashboard">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {auger.name}
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">
                System ID: {id} | {auger.zone}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Badge
              variant="outline"
              className={`${getStatusColor()} text-white border-0 px-4 py-2`}
            >
              {getStatusText()}
            </Badge>
            <div className="text-left sm:text-right text-slate-300">
              <div className="text-sm">Operating Hours</div>
              <div className="text-xl font-mono">
                {operatingHours.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Auger Position */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <RotateCw className="w-5 h-5" />
                Auger Position
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-6">
              <div className="relative w-56 h-56 mb-6">
                <div className="absolute inset-4 rounded-full border-4 border-slate-600 bg-slate-900" />
                <div className="absolute inset-0">
                  {/* markers at 0, 90, 180, 270 */}
                  <div className="absolute w-0.5 h-8 bg-slate-400 left-1/2 top-0 transform -translate-x-1/2" />
                  <div className="absolute w-8 h-0.5 bg-slate-400 right-0 top-1/2 transform -translate-y-1/2" />
                  <div className="absolute w-0.5 h-8 bg-slate-400 left-1/2 bottom-0 transform -translate-x-1/2" />
                  <div className="absolute w-8 h-0.5 bg-slate-400 left-0 top-1/2 transform -translate-y-1/2" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="absolute w-1 bg-orange-500 rounded-full transition-transform duration-100"
                    style={{
                      height: "75px",
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -100%) rotate(${augerPosition}deg)`,
                      transformOrigin: "50% 100%",
                    }}
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-orange-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-orange-400 z-10" />
              </div>
              <div className="bg-slate-700 rounded-lg px-6 py-4 w-full max-w-xs">
                <div className="text-3xl font-mono font-bold text-white mb-1 text-center">
                  {augerPosition.toFixed(0)}°
                </div>
                <div className="text-center text-xs text-slate-400 mb-2">
                  CURRENT POSITION
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <div>
                    Sweep Rate
                    <div className="font-mono text-orange-400">
                      {isRunning ? "2.0" : "0.0"}°/sec
                    </div>
                  </div>
                  <div>
                    Direction
                    <div className="font-mono text-orange-400">CW</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls & Throughput */}
          <Card className="bg-slate-800 border-slate-700 xl:col-span-2">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <Gauge className="w-5 h-5" />
                System Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Button
                  onClick={handleStart}
                  disabled={isRunning}
                  className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg text-white"
                >
                  <Play className="w-5 h-5 mr-2" />
                  START
                </Button>
                <Button
                  onClick={handleStop}
                  disabled={!isRunning}
                  className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg text-white"
                >
                  <Square className="w-5 h-5 mr-2" />
                  STOP
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">
                    Target Throughput
                  </span>
                  <span className="text-orange-400 font-mono">
                    {targetThroughput[0]} t/hr
                  </span>
                </div>
                <Slider
                  value={targetThroughput}
                  onValueChange={setTargetThroughput}
                  min={0}
                  max={150}
                  step={5}
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>0</span>
                  <span>75</span>
                  <span>150</span>
                </div>
              </div>

              <div className="bg-slate-700 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Current Throughput</span>
                  <span className="text-2xl font-mono text-white">
                    {currentThroughput.toFixed(1)} t/hr
                  </span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (currentThroughput / 150) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-slate-700 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Chain RPM</span>
                  <span className="text-2xl font-mono text-white">
                    {chainRpm.toFixed(0)} RPM
                  </span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (chainRpm / 100) * 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Optimal Range: 40–80 RPM</span>
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
            <CardHeader>
              <CardTitle className="text-white text-lg">
                Environmental Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-700 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-6 h-6 text-red-400" />
                    <span className="text-slate-300 font-medium">
                      Temperature
                    </span>
                  </div>
                  <div className="text-3xl font-mono text-white">
                    {temperature.toFixed(1)}°F
                  </div>
                  {temperature > 80 && (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs font-medium">HIGH TEMP</span>
                    </div>
                  )}
                </div>

                <div className="bg-slate-700 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-6 h-6 text-blue-400" />
                    <span className="text-slate-300 font-medium">Humidity</span>
                  </div>
                  <div className="text-3xl font-mono text-white">
                    {humidity.toFixed(1)}%
                  </div>
                  {humidity > 60 && (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs font-medium">HIGH HUMIDITY</span>
                    </div>
                  )}
                </div>

                <div className="bg-slate-700 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-6 h-6 text-green-400" />
                    <span className="text-slate-300 font-medium">
                      Motor Load
                    </span>
                  </div>
                  <div className="text-3xl font-mono text-white">
                    {isRunning ? "87.3" : "0.0"}%
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span className="text-slate-300 font-medium">
                      Vibration
                    </span>
                  </div>
                  <div className="text-3xl font-mono text-white">
                    {isRunning ? "2.1" : "0.0"} mm/s
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  );
}
