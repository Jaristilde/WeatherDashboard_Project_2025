'use client';

import { useState, useEffect } from 'react';
import { WeatherData, fetchWeatherData } from '@/lib/weather-api';
import CurrentWeather from '@/components/CurrentWeather';
import WeatherForecast from '@/components/WeatherForecast';
import LocationSearch from '@/components/LocationSearch';
import Chatbot from '@/components/Chatbot';
import DemoNotice from '@/components/DemoNotice';
import { Cloud } from 'lucide-react';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const loadWeatherData = async (location: string = 'London') => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData(location);
      setWeather(data);
    } catch (err) {
      setError('Failed to load weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  if (loading && !weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Cloud className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
          <p className="text-xl text-gray-600">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto">
            <p className="text-xl text-red-600 mb-4">Error loading weather data</p>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => loadWeatherData()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Weather Dashboard</h1>
          <p className="text-gray-600">Get current weather and 5-day forecast</p>
        </div>

        {/* Demo Notice */}
        <DemoNotice />

        {/* Location Search */}
        <div className="mb-8">
          <LocationSearch 
            onLocationChange={loadWeatherData} 
            isLoading={loading}
          />
        </div>

        {/* Weather Content */}
        {weather && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Weather - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <CurrentWeather weather={weather} />
            </div>
            
            {/* Forecast - Takes 1 column on large screens */}
            <div className="lg:col-span-1">
              <WeatherForecast weather={weather} />
            </div>
          </div>
        )}

        {/* Loading overlay for location changes */}
        {loading && weather && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 text-center">
              <Cloud className="w-8 h-8 text-blue-500 mx-auto mb-2 animate-pulse" />
              <p className="text-gray-600">Updating weather data...</p>
            </div>
          </div>
        )}

        {/* Chatbot */}
        <Chatbot 
          isOpen={isChatbotOpen} 
          onToggle={() => setIsChatbotOpen(!isChatbotOpen)} 
        />
      </div>
    </div>
  );
}