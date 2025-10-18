'use client';

import { WeatherData } from '@/lib/weather-api';
import { format } from 'date-fns';

interface WeatherForecastProps {
  weather: WeatherData;
}

export default function WeatherForecast({ weather }: WeatherForecastProps) {
  const { forecast } = weather;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
      
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div
            key={day.date}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="text-center min-w-[60px]">
                <p className="text-sm font-medium text-gray-600">{day.day}</p>
                <p className="text-xs text-gray-500">
                  {format(new Date(day.date), 'MMM d')}
                </p>
              </div>
              <img
                src={`https:${day.icon}`}
                alt={day.condition}
                className="w-10 h-10"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">{day.condition}</p>
                {day.precipitation > 0 && (
                  <p className="text-xs text-blue-600">
                    {day.precipitation}mm rain
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-800">{day.high}°</span>
              <span className="text-sm text-gray-500">{day.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
