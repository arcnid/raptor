"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  AlertTriangle,
  RotateCw,
  SkipBack,
  SkipForward,
  Square,
  Shield,
  FileText,
  Activity,
  Headphones,
  RefreshCw,
} from "lucide-react";
import { LayoutWrapper } from "@/components/layout-wrapper";

export default function MaintenancePage() {
  const augerId = "SA-001"; // Default auger for maintenance

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
      color: "bg-slate-600 hover:bg-raptor-lightgray",
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
    <LayoutWrapper>
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
            <Card className="bg-raptor-gray border-slate-700">
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
                        : "bg-slate-600 hover:bg-raptor-lightgray"
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
                        : "bg-slate-600 hover:bg-raptor-lightgray"
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
            <Card className="bg-raptor-gray border-slate-700">
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
                        : "bg-slate-600 hover:bg-raptor-lightgray"
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
                        : "bg-slate-600 hover:bg-raptor-lightgray"
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
            <Card className="bg-raptor-gray border-slate-700">
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
                      className="data-[state=checked]:bg-raptor-yellow"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-white font-medium">Switch 2</label>
                    <Switch
                      checked={isolateSwitch2}
                      onCheckedChange={setIsolateSwitch2}
                      className="data-[state=checked]:bg-raptor-yellow"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-white font-medium">Switch 3</label>
                    <Switch
                      checked={isolateSwitch3}
                      onCheckedChange={setIsolateSwitch3}
                      className="data-[state=checked]:bg-raptor-yellow"
                    />
                  </div>
                </div>
                <div className="bg-raptor-lightgray rounded-lg p-4">
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
            <Card className="bg-raptor-gray border-slate-700">
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
                  personnel are clear of equipment before operating jog
                  controls.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  );
}
