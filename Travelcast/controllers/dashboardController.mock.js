const mockUser = {
  id: 1,
  username: "John",
  fullName: "John Doe",
  email: "john@example.com"
};

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

const getDashboardData = (req, res) => {
  try {
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
    const stats = {
      totalTrips: mockTrips.length,
      upcomingTrips: mockTrips.filter(t => t.status === 'upcoming').length,
      completedTrips: mockTrips.filter(t => t.status === 'completed').length
    };
    const responseData = {
      user: {
        name: mockUser.fullName || mockUser.username,
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