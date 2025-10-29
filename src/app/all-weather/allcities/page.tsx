import { getWeatherData } from "@/lib/getWeather";
import { CITIES } from "@/data/cities";
import { WeatherCard } from "@/components/WeatherCard";
import Link from "next/link";

export default function AllCities() {
  // Get weather data for all cities
  const citiesWithWeather = CITIES.map((city) => {
    const weatherData = getWeatherData(city.name);
    return {
      city,
      weatherData,
    };
  }).filter((item) => item.weatherData !== null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Weather Summary
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Check the weather for all available cities
          </p>
        </div>

        {/* Grid layout - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {citiesWithWeather.map(({ city, weatherData }) => {
            if (!weatherData) return null;
            return (
              <Link
                key={city.name}
                href={`/weather/${city.name.toLowerCase()}`}
                className="block transition-transform hover:scale-105"
              >
                <WeatherCard city={city.name} weather={weatherData.current} animate={false} />
              </Link>
            );
          })}
        </div>

        {/* Back to home link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-semibold text-lg"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

