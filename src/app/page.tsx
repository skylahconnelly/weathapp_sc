"use client";

import { useEffect, useState } from "react";
import { LocationSearch } from "@/components/LocationSearch";
import { LoadingState } from "@/components/LoadingState";
import { ErrorMessage } from "@/components/ErrorMessage";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { PageHeader } from "@/components/PageHeader";
import { getWeatherData } from "@/lib/getWeather";
import { WeatherData } from "@/types/weather";

// Default city to display on load
const DEFAULT_CITY = "Durham";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCityWeather = async (cityName: string) => {
    setLoading(true);
    setError("");

    try {
      const data = await getWeatherData(cityName);

      if (data) {
        setWeather(data);
      } else {
        setError(`Sorry, something went wrong.Failed to load weather data for ${cityName}.`);
      }
    } catch (err) {
      setError(`Sorry, something went wrong. Failed to load weather data for ${cityName}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load default city weather on mount
    loadCityWeather(DEFAULT_CITY);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800 px-4 py-12">
      <main className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <PageHeader
          title="Weather App"
          subtitle="A simple weather forecast for your city."
        />

        {/* Search at the top */}
        <div className="flex flex-col items-center">
          <LocationSearch onCitySelect={loadCityWeather} />
        </div>

        {/* Weather display */}
        {loading && <LoadingState />}
        {error && <ErrorMessage message={error} />}
        {weather && !loading && <WeatherDisplay weather={weather} />}
      </main>
    </div>
  );
}
