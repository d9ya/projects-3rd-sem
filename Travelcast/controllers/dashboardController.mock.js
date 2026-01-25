// Simple dashboard controller using mock data for development
// This provides all the data your UserDashboard frontend needs
const weatherService = require('../utils/weatherService');

// Mock user data
const mockUser = {
  id: 1,
  username: "John",
  email: "john@example.com"
};

// Mock trips data
const mockTrips = [
  {
    id: 1,
    name: "Mountain Adventure",
    destination: "Pokhara, Nepal",
    startDate: "2024-02-15",
    endDate: "2024-02-22",
    travelers: 2,
    note: "Amazing trekking adventure in the Himalayas",
    budget: 1500.00,
    status: "upcoming",
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: "Cultural Tour",
    destination: "Kathmandu Valley",
    startDate: "2024-03-10",
    endDate: "2024-03-17",
    travelers: 1,
    note: "Exploring ancient temples and cultural sites",
    budget: 800.00,
    status: "planning",
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Get dashboard data - main endpoint your frontend calls
const getDashboardData = async (req, res) => {
  try {
    // Mock destinations data for the Recommended Destinations section
    const destinations = [
      { 
        id: 1, 
        tag: "Nature", 
        title: "Machhapuchhre Mountain", 
        location: "Pokhara, Nepal", 
        img: "mount.jpg"
      },
      { 
        id: 2, 
        tag: "Culture", 
        title: "Muktinath Temple", 
        location: "Mustang, Nepal", 
        img: "place2.jpeg"
      },
      { 
        id: 3, 
        tag: "Adventure", 
        title: "ABC Trek", 
        location: "Nepal", 
        img: "mountain.jpg"
      },
      { 
        id: 4, 
        tag: "History", 
        title: "Ram Janki Mandir", 
        location: "Janakpur, Nepal", 
        img: "janaki.png"
      }
    ];

    // Get weather data (using mock for now, easy to switch to real API)
    const weatherData = await weatherService.getWeatherData('Kathmandu', false); // Set to true when using real API

    // Dashboard statistics
    const stats = {
      totalTrips: mockTrips.length,
      upcomingTrips: mockTrips.filter(t => t.status === 'upcoming').length,
      completedTrips: mockTrips.filter(t => t.status === 'completed').length
    };

    // Response data matching your frontend expectations
    const responseData = {
      user: {
        name: mockUser.username,
        email: mockUser.email
      },
      destinations: destinations,
      weather: weatherData,
      stats: stats
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

// Get trip history (for Trip History page)
const getTripHistory = async (req, res) => {
  try {
    res.json(mockTrips);
  } catch (error) {
    console.error('Error fetching trip history:', error);
    res.status(500).json({ error: 'Failed to fetch trip history' });
  }
};

module.exports = {
  getDashboardData,
  getTripHistory
};