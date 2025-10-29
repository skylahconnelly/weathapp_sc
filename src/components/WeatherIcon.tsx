/**
 * Maps weather codes to appropriate emoji icons
 * Simple visual representation of weather conditions
 */

interface WeatherIconProps {
  code: number;
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
}

export function WeatherIcon({ code, size = "md", animate = true }: WeatherIconProps) {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl",
  };

  const getIcon = (code: number): string => {
    // Clear
    if (code === 0) return "☀️";
    if (code === 1) return "🌤️";
    if (code === 2) return "⛅";
    if (code === 3) return "☁️";

    // Fog
    if (code === 45 || code === 48) return "🌫️";

    // Drizzle
    if (code >= 51 && code <= 55) return "🌦️";

    // Rain
    if (code >= 61 && code <= 65) return "🌧️";
    if (code >= 80 && code <= 82) return "🌧️";

    // Snow
    if (code >= 71 && code <= 77) return "🌨️";
    if (code >= 85 && code <= 86) return "🌨️";

    // Thunderstorm
    if (code >= 95 && code <= 99) return "⛈️";

    return "🌡️"; // Default
  };

  const getAnimationClass = (code: number): string => {
    if (!animate) return ""; // No animation if disabled
    
    // Sun - gentle rotation
    if (code === 0) return "animate-spin";
    
    // Partly cloudy - gentle pulse (less aggressive than bounce)
    if (code === 1 || code === 2) return "animate-pulse";
    
    // Clouds - gentle sway
    if (code === 3) return "animate-pulse";
    
    // Rain/drizzle - bounce (like raindrops)
    if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65) || (code >= 80 && code <= 82)) {
      return "animate-bounce";
    }
    
    // Snow - gentle float
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
      return "animate-pulse";
    }
    
    // Thunderstorm - shake
    if (code >= 95 && code <= 99) return "animate-ping";
    
    // Fog - gentle pulse
    if (code === 45 || code === 48) return "animate-pulse";
    
    return ""; // No animation for default
  };

  return (
    <span 
      className={`${sizeClasses[size]} ${getAnimationClass(code)} inline-block`} 
      role="img" 
      aria-label="weather icon"
      style={animate ? {
        animationDuration: code === 0 ? '8s' : '3s', // Slower animations overall
        animationIterationCount: 'infinite'
      } : {}}
    >
      {getIcon(code)}
    </span>
  );
}
