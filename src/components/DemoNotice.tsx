'use client';

import { useState } from 'react';
import { Info, X } from 'lucide-react';

export default function DemoNotice() {
  const [isVisible, setIsVisible] = useState(true);
  
  // Check if weather API key is available
  const hasWeatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY && 
                          process.env.NEXT_PUBLIC_WEATHER_API_KEY !== 'your_api_key_here' &&
                          process.env.NEXT_PUBLIC_WEATHER_API_KEY !== 'demo';

  // Don't show the notice if API key is present
  if (!isVisible || hasWeatherApiKey) return null;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-yellow-800 mb-1">
            Demo Mode Active
          </h3>
          <p className="text-sm text-yellow-700 mb-2">
            You're currently viewing demo weather data for a few cities only. 
            To get real-time weather data for any location worldwide (like Macon, Georgia), 
            add your WeatherAPI key to the <code className="bg-yellow-100 px-1 rounded">.env.local</code> file.
          </p>
          <div className="text-xs text-yellow-600">
            <p>• Get a free API key from: <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-800">WeatherAPI.com</a></p>
            <p>• Add: <code className="bg-yellow-100 px-1 rounded">NEXT_PUBLIC_WEATHER_API_KEY=your_key_here</code></p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-yellow-600 hover:text-yellow-800 transition-colors"
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
