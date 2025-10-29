import { WeatherCard } from "./WeatherCard";
import { Button } from "./ui/Button";
import { WeatherData } from "@/types/weather";

/**
 * Displays weather information with a link to detailed forecast
 */

interface WeatherDisplayProps {
  weather: WeatherData;
}

export function WeatherDisplay({ weather }: WeatherDisplayProps) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <WeatherCard city={weather.city} weather={weather.current} />

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Primary button - detailed forecast */}
        <Button href={`/weather/${weather.city.toLowerCase()}`} variant="outline">
          View Detailed Forecast
        </Button>
        
        {/* Secondary button - all cities */}
        <Button href="/all-weather/allcities" variant="default">
          View All Cities
        </Button>
      </div>
    </div>
  );
}
