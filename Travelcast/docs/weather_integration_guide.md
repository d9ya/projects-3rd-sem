# Weather Integration Guide for Travelcast Dashboard

## Overview
This document explains how to integrate real-time weather data into the Travelcast dashboard. The current implementation uses mock data that simulates real weather conditions, making it easy to transition to the actual OpenWeatherMap API when your API key is activated.

## Current Implementation
The dashboard currently uses mock weather data that changes each time the page loads to simulate real-time weather updates. This implementation is located in:
- Backend: `controllers/dashboardController.mock.js`
- Service: `utils/weatherService.js`
- Frontend: `src/pages/Userdashboard.jsx`

## How to Activate Real OpenWeatherMap API

### Step 1: Get Your API Key
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Navigate to your account dashboard
3. Copy your API key

### Step 2: Configure Environment Variables
Add your API key to the `.env` file in the backend:
```
OPENWEATHER_API_KEY=your_actual_api_key_here
```

### Step 3: Update the Weather Service
In `utils/weatherService.js`, change the call in the `getDashboardData` function:
- Change `useRealAPI` parameter from `false` to `true`
- From: `const weatherData = await weatherService.getWeatherData('Kathmandu', false);`
- To: `const weatherData = await weatherService.getWeatherData('Kathmandu', true);`

## Data Structure
The weather data follows this structure, which is compatible with both mock and real API data:

```javascript
{
  current: {
    temperature: 24,           // Temperature in Celsius
    condition: "Sunny",        // Weather condition
    location: "Kathmandu, Nepal", // Location
    wind: "12 km/h",           // Wind speed
    humidity: "60%"            // Humidity percentage
  },
  forecast: [
    { day: "Mon", temp: 22, condition: "Sunny" },
    { day: "Tue", temp: 23, condition: "Cloudy" },
    // ... 5-day forecast
  ],
  suitability: 85,             // Travel suitability percentage
  alerts: ["Weather alert message"] // Weather alerts
}
```

## Frontend Integration
The frontend in `Userdashboard.jsx` already handles the weather data structure properly:
- Current weather display
- 5-day forecast
- Travel suitability indicator
- Weather alerts section

## Testing the Current Implementation
1. Make sure your backend server is running: `npm start` or `node index.js`
2. The frontend should connect to `http://localhost:3000/api/dashboard`
3. Each page refresh will show different simulated weather conditions

## Troubleshooting
- If weather data doesn't appear, check that the backend route `/api/dashboard` is accessible
- Ensure CORS is configured properly if running on different ports
- Check browser console for any API fetch errors