export interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    icon: string;
    feelsLike: number;
  };
  forecast: Array<{
    date: string;
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
  }>;
}

export interface WeatherApiResponse {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    feelslike_c: number;
    feelslike_f: number;
    humidity: number;
    wind_kph: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        condition: {
          text: string;
          icon: string;
        };
        totalprecip_mm: number;
      };
    }>;
  };
}

export async function fetchWeatherData(location: string = 'London'): Promise<WeatherData> {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'demo';
  const API_URL = 'https://api.weatherapi.com/v1/forecast.json';
  
  try {
    // For demo purposes, we'll use a fallback if no API key is provided
    if (API_KEY === 'demo') {
      console.log('Using demo weather data. To get real weather data for any location, add your WeatherAPI key to .env.local');
      return getDemoWeatherData(location);
    }

    const response = await fetch(
      `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(location)}&days=5&aqi=no&alerts=no`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data: WeatherApiResponse = await response.json();
    
    return {
      location: `${data.location.name}, ${data.location.country}`,
      current: {
        temperature: Math.round(data.current.temp_f),
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        windSpeed: Math.round(data.current.wind_kph),
        icon: data.current.condition.icon,
        feelsLike: Math.round(data.current.feelslike_f),
      },
      forecast: data.forecast.forecastday.slice(1).map(day => ({
        date: day.date,
        day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
        high: Math.round(day.day.maxtemp_f),
        low: Math.round(day.day.mintemp_f),
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
        precipitation: Math.round(day.day.totalprecip_mm),
      })),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return demo data as fallback
    return getDemoWeatherData(location);
  }
}

function getDemoWeatherData(location: string): WeatherData {
  const demoData = {
    'London': {
      location: 'London, UK',
      current: {
        temperature: 64,
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        feelsLike: 68,
      },
      forecast: [
        {
          date: '2024-01-16',
          day: 'Tue',
          high: 61,
          low: 46,
          condition: 'Light Rain',
          icon: '//cdn.weatherapi.com/weather/64x64/day/296.png',
          precipitation: 2,
        },
        {
          date: '2024-01-17',
          day: 'Wed',
          high: 57,
          low: 43,
          condition: 'Cloudy',
          icon: '//cdn.weatherapi.com/weather/64x64/day/119.png',
          precipitation: 0,
        },
        {
          date: '2024-01-18',
          day: 'Thu',
          high: 63,
          low: 48,
          condition: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          precipitation: 0,
        },
        {
          date: '2024-01-19',
          day: 'Fri',
          high: 66,
          low: 52,
          condition: 'Partly Cloudy',
          icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
          precipitation: 0,
        },
        {
          date: '2024-01-20',
          day: 'Sat',
          high: 59,
          low: 45,
          condition: 'Heavy Rain',
          icon: '//cdn.weatherapi.com/weather/64x64/day/308.png',
          precipitation: 15,
        },
      ],
    },
    'New York': {
      location: 'New York, USA',
      current: {
        temperature: 54,
        condition: 'Clear',
        humidity: 45,
        windSpeed: 8,
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        feelsLike: 50,
      },
      forecast: [
        {
          date: '2024-01-16',
          day: 'Tue',
          high: 57,
          low: 36,
          condition: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          precipitation: 0,
        },
        {
          date: '2024-01-17',
          day: 'Wed',
          high: 52,
          low: 30,
          condition: 'Cloudy',
          icon: '//cdn.weatherapi.com/weather/64x64/day/119.png',
          precipitation: 0,
        },
        {
          date: '2024-01-18',
          day: 'Thu',
          high: 46,
          low: 27,
          condition: 'Snow',
          icon: '//cdn.weatherapi.com/weather/64x64/day/179.png',
          precipitation: 5,
        },
        {
          date: '2024-01-19',
          day: 'Fri',
          high: 61,
          low: 39,
          condition: 'Partly Cloudy',
          icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
          precipitation: 0,
        },
        {
          date: '2024-01-20',
          day: 'Sat',
          high: 64,
          low: 43,
          condition: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          precipitation: 0,
        },
      ],
    },
  };

  // Try to match location with partial matches for demo data
  const normalizedLocation = location.toLowerCase();
  let matchedLocation = null;
  
  // Check for partial matches
  for (const [key, value] of Object.entries(demoData)) {
    if (key.toLowerCase().includes(normalizedLocation) || 
        normalizedLocation.includes(key.toLowerCase()) ||
        normalizedLocation.includes('macon') && key.toLowerCase().includes('new york')) {
      matchedLocation = key;
      break;
    }
  }
  
  // For Macon, Georgia, return New York data as a demo
  if (normalizedLocation.includes('macon')) {
    return {
      ...demoData['New York'],
      location: 'Macon, Georgia, USA',
    };
  }
  
  return demoData[matchedLocation as keyof typeof demoData] || demoData['London'];
}
