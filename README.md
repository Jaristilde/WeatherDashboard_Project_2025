# WeatherDashboard_Project_2025

A modern, responsive weather dashboard built with Next.js, React, and Tailwind CSS. This application displays current weather conditions and a 5-day forecast for any location worldwide.

## Features

- 🌤️ **Current Weather Display**: Shows temperature, weather conditions, humidity, and wind speed
- 📅 **5-Day Forecast**: Detailed forecast with high/low temperatures and precipitation
- 🔍 **Location Search**: Search for any city worldwide
- 🤖 **AI Weather Assistant**: Chat with an AI assistant for weather-related questions and advice
- 📱 **Responsive Design**: Optimized for both mobile and desktop devices
- 🎨 **Modern UI**: Clean, beautiful interface with gradient backgrounds and smooth animations
- ⚡ **Fast Loading**: Built with Next.js for optimal performance

## Demo

The app includes demo weather data for popular cities (London, New York, Tokyo, Paris, Sydney) so you can test it immediately without an API key.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Jaristilde/WeatherDashboard_Project_2025.git
cd WeatherDashboard_Project_2025
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Configuration (Optional)

### Weather Data
To use real weather data instead of demo data:

1. Get a free API key from [WeatherAPI.com](https://www.weatherapi.com/)
2. Create a `.env.local` file in the root directory
3. Add your API key:
```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

### AI Chatbot
To enable the AI weather assistant:

1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add it to your `.env.local` file:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Without API keys, the app will use demo weather data and the chatbot will show an error message.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Beautiful icons
- **date-fns** - Date formatting utilities
- **OpenAI API** - AI chatbot functionality
- **WeatherAPI.com** - Weather data provider

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts    # Chatbot API endpoint
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── CurrentWeather.tsx  # Current weather display
│   ├── WeatherForecast.tsx # 5-day forecast
│   ├── LocationSearch.tsx  # Location search input
│   └── Chatbot.tsx         # AI chatbot component
└── lib/
    └── weather-api.ts      # API service and types
```

## Deployment

The easiest way to deploy this app is with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

For other deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
