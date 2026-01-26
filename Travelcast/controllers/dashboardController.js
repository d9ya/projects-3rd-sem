const { Trip } = require('../models/tripModel');
const User = require('../models/userModel');
const getDashboardData = async (req, res) => {
  try {
    const userId = req.user?.id; // Assuming you have authentication middleware that sets req.user
    const user = userId ? await User.findByPk(userId, {
      attributes: ['id', 'username', 'email']
    }) : null;

    // Get recent trips for destinations section
    const trips = userId ? await Trip.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 8
    }) : [];
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
    const weatherData = null;

    const responseData = {
      user: user ? {
        name: user.fullName || user.username,
        email: user.email
      } : { name: "John", email: "john@example.com" }, // Fallback for demo
      destinations: destinations,
      stats: {
        totalTrips: trips.length,
        upcomingTrips: trips.filter(t => new Date(t.startDate) > new Date()).length,
        completedTrips: trips.filter(t => t.status === 'completed').length
      }
    }; // Note: Weather data is now handled directly in the frontend component

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

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
    res.status(500).json({ error: 'Failed to fetch trip history' });
  }
};

module.exports = {
  getDashboardData,
  getTripHistory
};