const { Trip } = require('../models/tripModel');
const { User } = require('../models/userModel');

// Get dashboard data for authenticated user
const getDashboardData = async (req, res) => {
  try {
    const userId = req.user?.id; // Assuming you have authentication middleware that sets req.user
    
    // Get user info
    const user = userId ? await User.findByPk(userId, {
      attributes: ['id', 'username', 'email']
    }) : null;

    // Get recent trips for destinations section
    const trips = userId ? await Trip.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 8
    }) : [];

    // Sample destinations data (will be replaced with actual trip data)
    const destinations = [
      { 
        id: 1, 
        tag: "Nature", 
        title: "Machhapuchhre Mountain", 
        location: "Pokhara, Nepal", 
        img: "mount.jpg",
        description: "Stunning mountain views and trekking trails"
      },
      { 
        id: 2, 
        tag: "Culture", 
        title: "Muktinath Temple", 
        location: "Mustang, Nepal", 
        img: "place2.jpeg",
        description: "Ancient temple with spiritual significance"
      },
      { 
        id: 3, 
        tag: "Adventure", 
        title: "Annapurna Base Camp", 
        location: "Nepal", 
        img: "mountain.jpg",
        description: "Challenging trek with breathtaking scenery"
      },
      { 
        id: 4, 
        tag: "History", 
        title: "Ram Janki Mandir", 
        location: "Janakpur, Nepal", 
        img: "janaki.png",
        description: "Historic temple dedicated to Goddess Sita"
      }
    ];

    // Mock weather data (will be replaced with real API data later)
    const weatherData = {
      current: {
        temperature: 24,
        condition: "Sunny",
        location: "Kathmandu, Nepal",
        wind: "12 km/h",
        humidity: "60%"
      },
      forecast: [
        { day: "Mon", temp: 22, condition: "Sunny" },
        { day: "Tue", temp: 23, condition: "Cloudy" },
        { day: "Wed", temp: 25, condition: "Sunny" },
        { day: "Thu", temp: 24, condition: "Rain" },
        { day: "Fri", temp: 21, condition: "Cloudy" }
      ],
      suitability: 85,
      alerts: ["Light rain expected in next 48 hours"]
    };

    const responseData = {
      user: user ? {
        name: user.username,
        email: user.email
      } : { name: "John", email: "john@example.com" }, // Fallback for demo
      destinations: destinations,
      weather: weatherData,
      stats: {
        totalTrips: trips.length,
        upcomingTrips: trips.filter(t => new Date(t.startDate) > new Date()).length,
        completedTrips: trips.filter(t => t.status === 'completed').length
      }
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

// Get user's trip history
const getTripHistory = async (req, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const trips = await Trip.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });

    res.json(trips);
  } catch (error) {
    console.error('Error fetching trip history:', error);
    res.status(500).json({ error: 'Failed to fetch trip history' });
  }
};

module.exports = {
  getDashboardData,
  getTripHistory
};