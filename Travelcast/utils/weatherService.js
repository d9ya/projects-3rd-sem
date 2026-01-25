// Weather Service Module
// Handles both mock and real weather data for the dashboard
// Easy to replace with OpenWeatherMap API when activated

class WeatherService {
    constructor() {
        // Possible weather conditions for mock data
        this.conditions = ["Sunny", "Cloudy", "Rainy", "Partly Cloudy", "Thunderstorm", "Clear", "Snow", "Windy"];
        this.locations = ["Kathmandu, Nepal", "Pokhara, Nepal", "Lumbini, Nepal", "Bhaktapur, Nepal", "Chitwan, Nepal", "Gokyo, Nepal", "Everest Region, Nepal"];
        this.days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }

    /**
     * Generates realistic mock weather data
     * @param {string} location - Location for weather data
     * @returns {Object} Weather data object
     */
    getMockWeatherData(location = null) {
        const currentTemp = Math.floor(Math.random() * 20) + 15; // Between 15-35°C
        const currentCondition = this.conditions[Math.floor(Math.random() * this.conditions.length)];
        const currentLocation = location || this.locations[Math.floor(Math.random() * this.locations.length)];

        // Generate forecast
        const forecast = [];
        for (let i = 0; i < 5; i++) {
            const temp = Math.floor(Math.random() * 10) + 18; // Between 18-27°C
            const condition = this.conditions[Math.floor(Math.random() * this.conditions.length)];
            forecast.push({
                day: this.days[(new Date().getDay() + i) % 7],
                temp: temp,
                condition: condition
            });
        }

        // Calculate travel suitability based on weather
        let suitability = 85;
        if (currentCondition.includes("Rain") || currentCondition.includes("Storm")) {
            suitability = 60;
        } else if (currentCondition.includes("Sunny") || currentCondition.includes("Clear")) {
            suitability = 90;
        } else if (currentCondition.includes("Cloud")) {
            suitability = 75;
        }

        // Generate alerts based on conditions
        const alerts = [];
        if (currentCondition.includes("Rain")) {
            alerts.push("Heavy rain expected in next 24 hours");
        } else if (currentCondition.includes("Thunderstorm")) {
            alerts.push("Thunderstorms expected - avoid outdoor activities");
        } else if (currentTemp > 30) {
            alerts.push("High temperatures - carry extra water");
        } else if (currentTemp < 10) {
            alerts.push("Cold temperatures - pack warm clothes");
        }

        return {
            current: {
                temperature: currentTemp,
                condition: currentCondition,
                location: currentLocation,
                wind: `${Math.floor(Math.random() * 15) + 5} km/h`,
                humidity: `${Math.floor(Math.random() * 30) + 40}%`
            },
            forecast: forecast,
            suitability: suitability,
            alerts: alerts.length > 0 ? alerts : ["No significant weather alerts"]
        };
    }

    /**
     * Fetch real weather data from OpenWeatherMap API
     * TODO: Implement when API key is activated
     * @param {string} city - City name for weather data
     * @returns {Promise<Object>} Weather data object
     */
    async getRealWeatherData(city = "Kathmandu") {
        // This is a placeholder that returns mock data until OpenWeatherMap API is available
        console.log(`Would fetch real weather data for ${city} from OpenWeatherMap API`);

        // TODO: Replace with actual API call when OpenWeatherMap is activated:
        /*
        try {
          const API_KEY = process.env.OPENWEATHER_API_KEY;
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
          
          if (!response.ok) {
            throw new Error(`OpenWeatherMap API error: ${response.status}`);
          }
          
          const data = await response.json();
          
          // Convert OpenWeatherMap data to our format
          return this.formatOpenWeatherData(data);
        } catch (error) {
          console.error('Error fetching real weather data:', error);
          // Fallback to mock data if API fails
          return this.getMockWeatherData(city);
        }
        */

        // Return mock data for now
        return this.getMockWeatherData(city);
    }

    /**
     * Format OpenWeatherMap API response to match our dashboard format
     * @param {Object} openWeatherData - Raw data from OpenWeatherMap API
     * @returns {Object} Formatted weather data
     */
    formatOpenWeatherData(openWeatherData) {
        const { main, weather, wind, name, sys } = openWeatherData;

        // Map OpenWeatherMap conditions to our format
        const conditionMap = {
            'clear': 'Sunny',
            'clouds': 'Cloudy',
            'rain': 'Rainy',
            'drizzle': 'Rainy',
            'thunderstorm': 'Thunderstorm',
            'snow': 'Snow',
            'mist': 'Foggy',
            'smoke': 'Hazy',
            'haze': 'Hazy',
            'dust': 'Hazy',
            'fog': 'Foggy',
            'sand': 'Hazy',
            'ash': 'Hazy',
            'squall': 'Windy',
            'tornado': 'Storm'
        };

        const condition = conditionMap[weather[0].main.toLowerCase()] || weather[0].main;

        // Generate a 5-day forecast (would need separate API call in real implementation)
        const forecast = [];
        for (let i = 0; i < 5; i++) {
            const temp = Math.floor(main.temp - i); // Simplified forecast
            const conditionOptions = Object.values(conditionMap);
            const dailyCondition = conditionOptions[Math.floor(Math.random() * conditionOptions.length)];
            forecast.push({
                day: this.days[(new Date().getDay() + i) % 7],
                temp: temp,
                condition: dailyCondition
            });
        }

        // Calculate travel suitability based on weather
        let suitability = 85;
        if (condition.includes("Rain") || condition.includes("Storm")) {
            suitability = 60;
        } else if (condition.includes("Sunny") || condition.includes("Clear")) {
            suitability = 90;
        } else if (condition.includes("Cloud")) {
            suitability = 75;
        }

        // Generate alerts based on conditions
        const alerts = [];
        if (condition.includes("Rain")) {
            alerts.push("Heavy rain expected in next 24 hours");
        } else if (condition.includes("Thunderstorm")) {
            alerts.push("Thunderstorms expected - avoid outdoor activities");
        } else if (main.temp > 30) {
            alerts.push("High temperatures - carry extra water");
        } else if (main.temp < 10) {
            alerts.push("Cold temperatures - pack warm clothes");
        }

        return {
            current: {
                temperature: Math.round(main.temp),
                condition: condition,
                location: `${name}, ${sys.country}`,
                wind: `${wind ? Math.round(wind.speed * 3.6) : 0} km/h`, // Convert m/s to km/h
                humidity: `${main.humidity}%`
            },
            forecast: forecast,
            suitability: suitability,
            alerts: alerts.length > 0 ? alerts : ["No significant weather alerts"]
        };
    }

    /**
     * Main method to get weather data (mock or real depending on implementation)
     * @param {string} city - City name for weather data
     * @param {boolean} useRealAPI - Whether to attempt real API call
     * @returns {Promise<Object>} Weather data object
     */
    async getWeatherData(city = "Kathmandu") {
        const useRealAPI = process.env.USE_REAL_WEATHER_API === "true";

        return useRealAPI
            ? await this.getRealWeatherData(city)
            : this.getMockWeatherData(city);
    }
}


module.exports = new WeatherService();