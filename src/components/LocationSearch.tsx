'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface LocationSearchProps {
  onLocationChange: (location: string) => void;
  isLoading?: boolean;
}

export default function LocationSearch({ onLocationChange, isLoading }: LocationSearchProps) {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onLocationChange(location.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !location.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {/* Quick location buttons */}
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {['London', 'New York', 'Tokyo', 'Paris', 'Sydney'].map((city) => (
          <button
            key={city}
            onClick={() => onLocationChange(city)}
            disabled={isLoading}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
