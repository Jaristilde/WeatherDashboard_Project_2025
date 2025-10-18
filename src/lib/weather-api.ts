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
        temperature: Math.round(data.current.temp_c),
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        windSpeed: Math.round(data.current.wind_kph),
        icon: data.current.condition.icon,
        feelsLike: Math.round(data.current.feelslike_c),
      },
      forecast: data.forecast.forecastday.slice(1).map(day => ({
        date: day.date,
        day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
        high: Math.round(day.day.maxtemp_c),
        low: Math.round(day.day.mintemp_c),
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
        temperature: 18,
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        feelsLike: 20,
      },
      forecast: [
        {
          date: '2024-01-16',
          day: 'Tue',
          high: 16,
          low: 8,
          condition: 'Light Rain',
          icon: '//cdn.weatherapi.com/weather/64x64/day/296.png',
          precipitation: 2,
        },
        {
          date: '2024-01-17',
          day: 'Wed',
          high: 14,
          low: 6,
          condition: 'Cloudy',
          icon: '//cdn.weatherapi.com/weather/64x64/day/119.png',
          precipitation: 0,
        },
        {
          date: '2024-01-18',
          day: 'Thu',
          high: 17,
          low: 9,
          condition: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          precipitation: 0,
        },
        {
          date: '2024-01-19',
          day: 'Fri',
          high: 19,
          low: 11,
          condition: 'Partly Cloudy',
          icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
          precipitation: 0,
        },
        {
          date: '2024-01-20',
          day: 'Sat',
          high: 15,
          low: 7,
          condition: 'Heavy Rain',
          icon: '//cdn.weatherapi.com/weather/64x64/day/308.png',
          precipitation: 15,
        },
      ],
    },
    'New York': {
      location: 'New York, USA',
      current: {
        temperature: 12,
        condition: 'Clear',
        humidity: 45,
        windSpeed: 8,
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        feelsLike: 10,
      },
      forecast: [
        {
          date: '2024-01-16',
          day: 'Tue',
          high: 14,
          low: 2,
          condition: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          precipitation: 0,
        },
        {
          date: '2024-01-17',
          day: 'Wed',
          high: 11,
          low: -1,
          condition: 'Cloudy',
          icon: '//cdn.weatherapi.com/weather/64x64/day/119.png',
          precipitation: 0,
        },
        {
          date: '2024-01-18',
          day: 'Thu',
          high: 8,
          low: -3,
          condition: 'Snow',
          icon: '//cdn.weatherapi.com/weather/64x64/day/179.png',
          precipitation: 5,
        },
        {
          date: '2024-01-19',
          day: 'Fri',
          high: 16,
          low: 4,
          condition: 'Partly Cloudy',
          icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
          precipitation: 0,
        },
        {
          date: '2024-01-20',
          day: 'Sat',
          high: 18,
          low: 6,
          condition: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
          precipitation: 0,
        },
      ],
    },
  };

  return demoData[location as keyof typeof demoData] || demoData['London'];
}
