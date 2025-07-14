"use client";
import { useState, useEffect, useRef } from "react";
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

interface AugerDetailPageProps {
  params: {
    id: string;
  };
}

export default function AugerDetailPage({ params }: AugerDetailPageProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [augerPosition, setAugerPosition] = useState(0);
  const [targetThroughput, setTargetThroughput] = useState([75]);
  const [currentThroughput, setCurrentThroughput] = useState(0);
  const [temperature, setTemperature] = useState(68.5);
  const [humidity, setHumidity] = useState(45.2);
  const [operatingHours, setOperatingHours] = useState(1247.5);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [chainRpm, setChainRpm] = useState(0);

  const auger = mockAugerData.find((a) => a.id === params.id);

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
  }, [isRunning, targetThroughput, currentThroughput]);

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
        {/* Header with Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600 self-start sm:self-auto"
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
                System ID: {params.id} | {auger.zone}
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
              <div className="text-xl font-mono">
                {operatingHours.toFixed(1)}
              </div>
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
                      width: `${Math.min(
                        100,
                        (currentThroughput / 150) * 100
                      )}%`,
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
                    style={{
                      width: `${Math.min(100, (chainRpm / 100) * 100)}%`,
                    }}
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
    </LayoutWrapper>
  );
}
