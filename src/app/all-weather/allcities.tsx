//SC added all cities page, let's see if it works
// Code from Github Project template
// src/
// ├── app/
// │   ├── page.tsx                    # Home page
// │   └── weather/[location]/
// │       └── page.tsx                # Detailed weather page
// ├── components/
// │   ├── LocationSearch.tsx          # City dropdown selector
// │   ├── WeatherCard.tsx             # Current weather card
// │   ├── WeatherDisplay.tsx          # Weather display with navigation
// │   ├── WeatherIcon.tsx             # Weather condition icons
// │   └── ui/
// │       └── Button.tsx              # Reusable button component
// ├── data/
// │   ├── cities.ts                   # Available cities
// │   └── weather-data.ts             # Weather data
// ├── lib/
// │   └── getWeather.ts               # Weather data retrieval
// └── types/
//     └── weather.ts                  # TypeScript interfaces
import { notFound } from "next/navigation";
import { getWeatherData } from "@/lib/getWeather";
import { CITIES } from "@/data/cities";
import { CurrentWeatherDetail } from "@/components/CurrentWeatherDetail";
import { ForecastCard } from "@/components/ForecastCard";
import { Button } from "@/components/ui/Button";

export default function AllCities() {
  return (
    <div>
      <h1>All Cities</h1>
    </div>
  );
}