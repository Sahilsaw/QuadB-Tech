"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, Loader2, MapPin } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface WeatherData {
  location: string
  temperature: number
  condition: string
  icon: React.ReactNode
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // In a real app, you would fetch from a weather API
        // For demo purposes, we'll simulate a response
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock weather data
        const conditions = ["Sunny", "Cloudy", "Rainy"]
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
        const randomTemp = Math.floor(Math.random() * 15) + 15 // 15-30°C

        let icon
        switch (randomCondition) {
          case "Sunny":
            icon = <Sun className="h-6 w-6 text-yellow-400" />
            break
          case "Cloudy":
            icon = <Cloud className="h-6 w-6 text-gray-400" />
            break
          case "Rainy":
            icon = <CloudRain className="h-6 w-6 text-blue-400" />
            break
          default:
            icon = <Sun className="h-6 w-6 text-yellow-400" />
        }

        setWeather({
          location: "New York",
          temperature: randomTemp,
          condition: randomCondition,
          icon,
        })
      } catch (error) {
        toast({
          title: "Failed to fetch weather",
          description: "Could not retrieve weather information.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeather()
  }, [toast])

  const getWeatherMessage = () => {
    if (!weather) return ""

    if (weather.condition === "Sunny" && weather.temperature > 25) {
      return "Great day for outdoor tasks! Don't forget sunscreen."
    } else if (weather.condition === "Rainy") {
      return "Good day to focus on indoor tasks."
    } else if (weather.temperature < 20) {
      return "It's a bit chilly today. Consider indoor activities."
    } else {
      return "Perfect weather for getting things done!"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Weather Forecast</CardTitle>
        <CardDescription>Plan your tasks according to the weather</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : weather ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">{weather.icon}</div>
              <div>
                <div className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-medium">{weather.location}</span>
                </div>
                <div className="mt-1 text-2xl font-bold">{weather.temperature}°C</div>
                <div className="text-sm text-muted-foreground">{weather.condition}</div>
              </div>
            </div>
            <div className="max-w-[180px] text-sm text-muted-foreground">{getWeatherMessage()}</div>
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">Weather information unavailable</div>
        )}
      </CardContent>
    </Card>
  )
}

