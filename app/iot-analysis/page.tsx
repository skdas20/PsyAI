"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Bluetooth, Download, Heart, Activity, Zap, Clock, Calendar } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ChartContainer,
  ChartTitle,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
} from "@/components/ui/chart"

// Sample data for charts
const generateHourlyData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)
  const stressLevels = Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
  const heartRates = Array.from({ length: 24 }, () => 60 + Math.floor(Math.random() * 40))

  return { hours, stressLevels, heartRates }
}

const generateDailyData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const stressLevels = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100))
  const heartRates = Array.from({ length: 7 }, () => 60 + Math.floor(Math.random() * 40))

  return { days, stressLevels, heartRates }
}

const generateWeeklyData = () => {
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"]
  const stressLevels = Array.from({ length: 4 }, () => Math.floor(Math.random() * 100))
  const heartRates = Array.from({ length: 4 }, () => 60 + Math.floor(Math.random() * 40))

  return { weeks, stressLevels, heartRates }
}

export default function IoTAnalysisPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [currentStressLevel, setCurrentStressLevel] = useState(null)
  const [currentHeartRate, setCurrentHeartRate] = useState(null)
  const [timeRange, setTimeRange] = useState("daily")
  const [chartData, setChartData] = useState({
    categories: [],
    stressLevels: [],
    heartRates: [],
  })

  // Simulate connecting to a Bluetooth device
  const connectDevice = async () => {
    setIsConnecting(true)

    // In a real implementation, this would use the Web Bluetooth API
    // to connect to an Arduino or other IoT device
    setTimeout(() => {
      setIsConnected(true)
      setIsConnecting(false)

      // Simulate initial readings
      setCurrentStressLevel(Math.floor(Math.random() * 100))
      setCurrentHeartRate(60 + Math.floor(Math.random() * 40))

      // Load chart data
      updateChartData(timeRange)
    }, 2000)
  }

  // Simulate disconnecting from a Bluetooth device
  const disconnectDevice = () => {
    setIsConnected(false)
    setCurrentStressLevel(null)
    setCurrentHeartRate(null)
  }

  // Update chart data based on selected time range
  const updateChartData = (range) => {
    let data

    switch (range) {
      case "hourly":
        data = generateHourlyData()
        setChartData({
          categories: data.hours,
          stressLevels: data.stressLevels,
          heartRates: data.heartRates,
        })
        break
      case "daily":
        data = generateDailyData()
        setChartData({
          categories: data.days,
          stressLevels: data.stressLevels,
          heartRates: data.heartRates,
        })
        break
      case "weekly":
        data = generateWeeklyData()
        setChartData({
          categories: data.weeks,
          stressLevels: data.stressLevels,
          heartRates: data.heartRates,
        })
        break
    }
  }

  // Simulate receiving data updates from the device
  useEffect(() => {
    let interval

    if (isConnected) {
      interval = setInterval(() => {
        // Simulate fluctuations in readings
        setCurrentStressLevel((prev) => {
          const change = Math.floor(Math.random() * 10) - 5 // -5 to +5
          return Math.max(0, Math.min(100, prev + change))
        })

        setCurrentHeartRate((prev) => {
          const change = Math.floor(Math.random() * 6) - 3 // -3 to +3
          return Math.max(50, Math.min(120, prev + change))
        })
      }, 3000)
    }

    return () => clearInterval(interval)
  }, [isConnected])

  // Update chart data when time range changes
  useEffect(() => {
    if (isConnected) {
      updateChartData(timeRange)
    }
  }, [timeRange, isConnected])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">IoT Stress Analysis</h1>

        <div className="max-w-5xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bluetooth className="mr-2 h-5 w-5" /> Device Connection
              </CardTitle>
              <CardDescription>
                Connect to your Arduino Nano 33 BLE with GSR and pulse sensors to monitor stress levels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isConnected ? (
                <div className="text-center">
                  <p className="mb-4">Connect your device to begin monitoring your stress levels in real-time.</p>
                  <Button onClick={connectDevice} disabled={isConnecting} className="bg-blue-600 hover:bg-blue-700">
                    {isConnecting ? "Connecting..." : "Connect Device"}
                  </Button>
                </div>
              ) : (
                <div>
                  <Alert className="mb-4 bg-green-50 border-green-200">
                    <Activity className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-600">Device Connected</AlertTitle>
                    <AlertDescription>
                      Your Arduino Nano 33 BLE is now connected and transmitting data.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium flex items-center">
                          <Zap className="mr-2 h-5 w-5 text-amber-500" /> Current Stress Level
                        </h3>
                        <span
                          className={`text-2xl font-bold ${
                            currentStressLevel < 30
                              ? "text-green-500"
                              : currentStressLevel < 70
                                ? "text-amber-500"
                                : "text-red-500"
                          }`}
                        >
                          {currentStressLevel}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            currentStressLevel < 30
                              ? "bg-green-500"
                              : currentStressLevel < 70
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${currentStressLevel}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium flex items-center">
                          <Heart className="mr-2 h-5 w-5 text-red-500" /> Current Heart Rate
                        </h3>
                        <span className="text-2xl font-bold text-red-500">{currentHeartRate} BPM</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full bg-red-500"
                          style={{ width: `${((currentHeartRate - 50) / 70) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <Button
                      variant="outline"
                      onClick={disconnectDevice}
                      className="text-red-500 border-red-200 hover:bg-red-50"
                    >
                      Disconnect Device
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {isConnected && (
            <>
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Stress Analysis</CardTitle>
                    <Tabs value={timeRange} onValueChange={setTimeRange}>
                      <TabsList>
                        <TabsTrigger value="hourly" className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" /> Hourly
                        </TabsTrigger>
                        <TabsTrigger value="daily" className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" /> Daily
                        </TabsTrigger>
                        <TabsTrigger value="weekly" className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" /> Weekly
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <CardDescription>View your stress levels and heart rate over time.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ChartContainer>
                      <ChartTitle text="Stress Level & Heart Rate" />
                      <ChartLegend position="bottom" />
                      <ChartTooltip>
                        <ChartTooltipContent />
                      </ChartTooltip>
                      <ChartCategoryAxis>
                        <ChartCategoryAxisItem categories={chartData.categories} />
                      </ChartCategoryAxis>
                      <ChartValueAxis>
                        <ChartValueAxisItem title={{ text: "Stress Level (%)" }} min={0} max={100} />
                      </ChartValueAxis>
                      <ChartValueAxis name="heartRate">
                        <ChartValueAxisItem title={{ text: "Heart Rate (BPM)" }} min={50} max={120} />
                      </ChartValueAxis>
                      <ChartSeries>
                        <ChartSeriesItem
                          type="area"
                          data={chartData.stressLevels}
                          name="Stress Level"
                          color="#f59e0b"
                          opacity={0.3}
                        />
                        <ChartSeriesItem
                          type="line"
                          data={chartData.heartRates}
                          name="Heart Rate"
                          color="#ef4444"
                          axis="heartRate"
                        />
                      </ChartSeries>
                    </ChartContainer>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="flex items-center">
                    <Download className="mr-2 h-4 w-4" /> Export Data
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>
                    Based on your stress patterns, here are some personalized recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentStressLevel > 70 && (
                      <Alert className="bg-red-50 border-red-200">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertTitle className="text-red-600">High Stress Detected</AlertTitle>
                        <AlertDescription>
                          Your current stress level is high. Consider taking a short break for deep breathing or a brief
                          meditation session.
                        </AlertDescription>
                      </Alert>
                    )}

                    {currentStressLevel >= 30 && currentStressLevel <= 70 && (
                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-600">Moderate Stress Detected</AlertTitle>
                        <AlertDescription>
                          Your stress level is moderate. Regular mindfulness practices can help maintain balance
                          throughout your day.
                        </AlertDescription>
                      </Alert>
                    )}

                    {currentStressLevel < 30 && (
                      <Alert className="bg-green-50 border-green-200">
                        <AlertCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-600">Low Stress Detected</AlertTitle>
                        <AlertDescription>
                          Your stress level is currently low. This is a good time for focused work or creative
                          activities.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-medium mb-2">Breathing Exercise</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Practice 4-7-8 breathing: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.
                          Repeat 5 times.
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Start Guided Exercise
                        </Button>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="font-medium mb-2">Quick Meditation</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          A 5-minute mindfulness meditation can help reset your stress response and improve focus.
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Start Meditation
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

