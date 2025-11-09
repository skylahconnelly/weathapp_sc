import { getDummyWeatherData } from "@/data/weather-data";
import { WeatherData, WeatherCondition, WEATHER_CODES } from "@/types/weather";
import { getCityByName } from "@/data/cities";
import { fetchWeatherApi } from "openmeteo"; // for api
// NOTE: SC USED CURSOR AI TOOL TO HELP GENERATE API CODE.
/**
 * Get weather data for a city
 *
 * Fetches real weather data from Open-Meteo API
 * Falls back to dummy data if API call fails
 */
export async function getWeatherData(cityName: string): Promise<WeatherData | null> {
  // Get city coordinates
  const city = getCityByName(cityName);
  if (!city) {
    return getDummyWeatherData(cityName);
  }

  try {
    // Fetch real weather data from Open-Meteo API
    const params = {
      latitude: city.latitude,
      longitude: city.longitude,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "wind_speed_10m",
        "weather_code",
      ],
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
      ],
      forecast_days: 3,
      wind_speed_unit: "mph",
      temperature_unit: "fahrenheit",
      timezone: "auto",
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Process first location
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const daily = response.daily()!;

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process current weather data
    const currentTime = new Date((Number(current.time()) + utcOffsetSeconds) * 1000);
    const temperature = Math.round(current.variables(0)!.value());
    const humidity = Math.round(current.variables(1)!.value());
    const feelsLike = Math.round(current.variables(2)!.value());
    const windSpeed = Math.round(current.variables(3)!.value());
    const weatherCode = Math.round(current.variables(4)!.value());

    // Process daily forecast data
    const dailyTime = range(
      Number(daily.time()),
      Number(daily.timeEnd()),
      daily.interval()
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000));

    const dailyWeatherCode = daily.variables(0)!.valuesArray()!;
    const dailyMaxTemp = daily.variables(1)!.valuesArray()!;
    const dailyMinTemp = daily.variables(2)!.valuesArray()!;

    // Get weather description from code
    const getWeatherCondition = (code: number): WeatherCondition => {
      return {
        code,
        description: WEATHER_CODES[code] || "Unknown",
      };
    };

    // Build forecast array
    const forecast = dailyTime.map((date, i) => ({
      date: date.toISOString().split("T")[0],
      maxTemp: Math.round(dailyMaxTemp[i]),
      minTemp: Math.round(dailyMinTemp[i]),
      condition: getWeatherCondition(dailyWeatherCode[i]),
    }));

    // Build weather data object
    const weatherData: WeatherData = {
      city: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      current: {
        temperature,
        feelsLike,
        humidity,
        windSpeed,
        condition: getWeatherCondition(weatherCode),
      },
      forecast,
    };

    return weatherData;
  } catch (error) {
    console.error(`Error fetching weather data for ${cityName}:`, error);
    // Fall back to dummy data if API call fails
    return getDummyWeatherData(cityName);
  }
}
