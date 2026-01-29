const buildDashboardResponse = (user, trips) => {
  return {
    user: formatUser(user),
    destinations: getRecommendedDestinations(),
    weather: getMockWeather(),
    stats: calculateTripStats(trips),
  };
};

const formatUser = (user) => {
  if (!user) {
    return {
      name: "John",
      email: "john@example.com",
    };
  }

  return {
    name: user.username,
    email: user.email,
  };
};

const calculateTripStats = (trips) => {
  const now = new Date();

  return {
    totalTrips: trips.length,
    upcomingTrips: trips.filter(
      (trip) => new Date(trip.startDate) > now
    ).length,
    completedTrips: trips.filter(
      (trip) => trip.status === "completed"
    ).length,
  };
};

const getRecommendedDestinations = () => [
  {
    id: 1,
    tag: "Nature",
    title: "Machhapuchhre Mountain",
    location: "Pokhara, Nepal",
    img: "mount.jpg",
    description: "Stunning mountain views and trekking trails",
  },
  {
    id: 2,
    tag: "Culture",
    title: "Muktinath Temple",
    location: "Mustang, Nepal",
    img: "place2.jpeg",
    description: "Ancient temple with spiritual significance",
  },
  {
    id: 3,
    tag: "Adventure",
    title: "Annapurna Base Camp",
    location: "Nepal",
    img: "mountain.jpg",
    description: "Challenging trek with breathtaking scenery",
  },
  {
    id: 4,
    tag: "History",
    title: "Ram Janki Mandir",
    location: "Janakpur, Nepal",
    img: "janaki.png",
    description: "Historic temple dedicated to Goddess Sita",
  },
];

// Mock weather data (replace with OpenWeather later)
const getMockWeather = () => ({
  current: {
    temperature: 22,
    condition: "Partly Cloudy",
    location: "Kathmandu, Nepal",
    wind: "7 km/h",
    humidity: "61%",
  },
  forecast: [
    { day: "Sat", temp: 24, condition: "Rain" },
    { day: "Sun", temp: 23, condition: "Cloudy" },
    { day: "Mon", temp: 18, condition: "Cloudy" },
    { day: "Tue", temp: 19, condition: "Sunny" },
    { day: "Wed", temp: 26, condition: "Sunny" },
  ],
  suitability: 75,
  alerts: ["No significant weather alerts"],
});

module.exports = {
  buildDashboardResponse,
};