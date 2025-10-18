'use client';

import { WeatherData } from '@/lib/weather-api';
import { MapPin, Thermometer, Droplets, Wind } from 'lucide-react';

interface CurrentWeatherProps {
  weather: WeatherData;
}

export default function CurrentWeather({ weather }: CurrentWeatherProps) {
  const { current } = weather;

  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
      {/* Location */}
      <div className="flex items-center justify-center mb-4">
        <MapPin className="w-5 h-5 mr-2" />
        <h2 className="text-xl font-semibold">{weather.location}</h2>
      </div>

      {/* Main Weather Info */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <img
            src={`https:${current.icon}`}
            alt={current.condition}
            className="w-20 h-20"
          />
        </div>
        <h3 className="text-4xl font-bold mb-2">{current.temperature}°C</h3>
        <p className="text-lg opacity-90">{current.condition}</p>
        <p className="text-sm opacity-75">Feels like {current.feelsLike}°C</p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
          <Droplets className="w-5 h-5 mx-auto mb-1 opacity-80" />
          <p className="text-sm opacity-90">Humidity</p>
          <p className="text-lg font-semibold">{current.humidity}%</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
          <Wind className="w-5 h-5 mx-auto mb-1 opacity-80" />
          <p className="text-sm opacity-90">Wind Speed</p>
          <p className="text-lg font-semibold">{current.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}
