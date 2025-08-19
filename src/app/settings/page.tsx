"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { LayoutWrapper } from "@/components/layout-wrapper";

export default function SettingsPage() {
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
        class: "bg-raptor-gray",
        hex: "#1e293b",
        rgb: "rgb(30, 41, 59)",
      },
      {
        name: "Secondary Background",
        class: "bg-raptor-lightgray",
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
        class: "bg-raptor-yellow",
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
        class: "border-raptor-yellow",
        hex: "#f97316",
        rgb: "rgb(249, 115, 22)",
      },
    ],
  };

  const ColorSwatch = ({
    color,
  }: {
    color: { name: string; class: string; hex: string; rgb: string };
  }) => (
    <div className="bg-raptor-lightgray rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-medium text-sm">{color.name}</h4>
        <div
          className={`w-8 h-8 rounded-md border-2 border-slate-600 ${
            color.class.includes("text-") ? "bg-raptor-gray" : color.class
          }`}
          style={
            color.class.includes("text-") ? { backgroundColor: color.hex } : {}
          }
        />
      </div>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">Class:</span>
          <code className="text-slate-300 bg-raptor-gray px-2 py-1 rounded">
            {color.class}
          </code>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Hex:</span>
          <code className="text-slate-300 bg-raptor-gray px-2 py-1 rounded font-mono">
            {color.hex}
          </code>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">RGB:</span>
          <code className="text-slate-300 bg-raptor-gray px-2 py-1 rounded font-mono text-xs">
            {color.rgb}
          </code>
        </div>
      </div>
    </div>
  );

  return (
    <LayoutWrapper>
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
          <Card className="bg-raptor-gray border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-4 h-4 bg-raptor-lightgray rounded"></div>
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
          <Card className="bg-raptor-gray border-slate-700">
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
          <Card className="bg-raptor-gray border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-4 h-4 bg-raptor-yellow rounded"></div>
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

          {/* Color Usage Guidelines */}
          <Card className="bg-raptor-gray border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-400" />
                Color Usage Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">
                    Status Indicators
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-slate-300">
                        Green: Optimal operation, success states
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-raptor-yellow rounded-full"></div>
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
                      <div className="w-3 h-3 bg-raptor-yellow rounded-full"></div>
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
    </LayoutWrapper>
  );
}
