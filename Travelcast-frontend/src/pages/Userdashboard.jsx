import React from "react";
import { Bell, Plus, ArrowRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "home", label: "Home", img: "home.png" },
    { id: "create", label: "Create New Trip", img: "add.png" },
    { id: "packing", label: "Packing List", img: "list.png" },
    { id: "history", label: "Trip History", img: "history.png" },
    { id: "subscription", label: "Subscription", img: "notification.png" },
    { id: "settings", label: "Settings", img: "settings.png" }
  ];



  return (
    <div style={{ display: "flex", height: "100vh", background: "#f0f4fa" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#f0f4fa",
          padding: "20px",
          color: "black",
          display: "flex",
          flexDirection: "column"
        }}
      >

        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ margin: "0", fontSize: "20px", fontWeight: "600", color: "black" }}>Travel Cast</h2>
          <p style={{ margin: "5px 0 0 0", fontSize: "12px", opacity: 0.8, color: "black" }}>Your Journey Starts</p>
        </div>



        <div style={{ flex: 1 }}>
          {menuItems.map(item => {
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 15px",
                  marginBottom: "8px",
                  background: "transparent",
                  color: "black",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                <img src={item.img} alt={item.label} width={20} height={20} />
                {item.label}
              </button>
            );
          })}
        </div>



        <button
          onClick={() => {
            alert("Logged out successfully!");
          }}
          style={{
            padding: "12px",
            background: "transparent",
            border: "none",
            borderRadius: "8px",
            color: "black",
            cursor: "pointer",
            width: "100%",
            fontWeight: "bold",
            marginTop: "20px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
            <img
              src="logout.png"
              alt="logout"
              style={{ width: "18px", height: "18px" }}
            />
            <span>Logout</span>
          </div>
        </button>
      </div>


      <div style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        <div className="min-h-screen bg-white p-8"style={{ background: "#f8fafc" }} >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3 w-1/2 bg-white px-4 py-3 rounded-xl shadow-sm">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations, trips, or activities..."
                className="w-full outline-none text-sm"
              />
            </div>

            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                3
              </span>
            </div>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold">
              Welcome back, John!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your travel plans today
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-12">
            <StatCard
              value="24"
              label="Trips Completed"
              change="+12"
              icon="navigation.png"
            />
            <StatCard
              value="18"
              label="Countries Visited"
              change="+3"
              icon="increase.png"
            />
            <StatCard
              value="3"
              label="Upcoming Trips"
              change="+2"
              sub="Next: Dec 28"
              icon="calendar.png"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Your Travel Plans</h2>
              <p className="text-gray-600">
                Manage and organize your upcoming adventures
              </p>
            </div>

            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl">
              <Plus className="w-4 h-4" />
              New Trip
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-14">
            <TripCard
              title="Santorini Escape"
              date="Mar 15 - Mar 22, 2026"
              status="Confirmed"
              img="Santorini.jpg"
            />
            <TripCard
              title="Bali Adventure"
              date="Apr 10 - Apr 18, 2026"
              status="Planning"
              img="bali.jpg"
            />
            <TripCard
              title="Maldives Retreat"
              date="May 5 - May 12, 2026"
              status="Draft"
              img="maldives.jpg"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                Recommended Destinations
              </h2>
              <p className="text-gray-600">
                Popular places based on your interests
              </p>
            </div>

            <button className="border px-4 py-2 rounded-xl">
              View All
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <DestinationCard
              tag="Nature"
              title="Machhapuchhre Fishtail Mountain"
              rating="4.8"
              reviews="234"
              location="Pokhara, Nepal"
              img="mount.jpg"
            />
            <DestinationCard
              tag="Culture"
              title="Muktinath Temple"
              rating="4.9"
              reviews="189"
              location="Mustang, Nepal"
              img="place2.jpeg"
              liked
            />
            <DestinationCard
              tag="Adventure"
              title="London Eye"
              rating="5.0"
              reviews="156"
              location="London, UK"
              img="london.jpg"
            />
            <DestinationCard
              tag="Luxury"
              title="Dubai Marina"
              rating="4.7"
              reviews="312"
              location="Dubai, UAE"
              img="dubai.jpg"
            />
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Weather Updates</h2>
            <p className="text-gray-600 mt-1">
              Current conditions at your destinations
            </p>
            <div className="grid grid-cols-5 gap-6">
              <WeatherCard city="Pokhara" temp={22} img="sun.png" country="Nepal" />
              <WeatherCard city="London" temp={22} img="sun.png" country="UK" />
              <WeatherCard city="Dubai" temp={-14} img="clouds.png" country="UAE" />
              <WeatherCard city="Dolpa" temp={-4} img="clouds.png" country="Nepal" />
              <WeatherCard city="Ghandruk" temp={4} img="rain.png" country="Nepal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ value, label, change, sub, icon }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="flex justify-between mb-6">
      <div className="text-2xl">
        <img src={icon} alt={label} className="w-8 h-8" />
      </div>
      {change && (
        <span className="text-green-600 font-semibold">
          {change}
        </span>
      )}
    </div>
    <h3 className="text-3xl font-bold">{value}</h3>
    <p className="text-gray-600">{label}</p>
    {sub && <p className="text-sm mt-1">{sub}</p>}
  </div>
);

const TripCard = ({ title, date, status, img }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
    <div className="relative">
      <img src={img} className="h-48 w-full object-cover" />
      <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
        {status}
      </span>
    </div>
    <div className="p-5">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600 text-sm mt-1">{date}</p>
      <button className="flex items-center gap-2 mt-4 font-semibold">
        View Details <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const DestinationCard = ({
  tag,
  title,
  rating,
  reviews,
  location,
  img,
  liked
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="relative">
        <img src={img} className="h-40 w-full object-cover" />
        <span className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
          {tag}
        </span>

      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-yellow-500 font-semibold">
          <img src="star.png" alt="rating" className="w-4 h-4" />
          <span>{rating} ({reviews})</span>

        </div>

        <h4 className="font-bold mt-1">{title}</h4>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img src="pin.png" alt="location" className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

const WeatherCard = ({ city, temp, img, country = "Nepal" }) => {
  // Extract weather condition from image name
  const getConditionFromImage = (imageName) => {
    if (imageName.includes('sun')) return 'Sunny';
    if (imageName.includes('cloud')) return 'Cloudy';
    if (imageName.includes('rain')) return 'Rainy';
    if (imageName.includes('snow')) return 'Snowy';
    return 'Clear';
  };

  const condition = getConditionFromImage(img);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="text-left">
          <h3 className="font-bold text-lg">{city}</h3>
          <p className="text-gray-600 text-sm">{country}</p>
        </div>
        <div className="flex-shrink-0">
          <img src={img} alt={condition} className="w-12 h-12" />
        </div>
      </div>
      <p className="text-2xl font-bold mt-3">{temp}°C</p>
      <p className="text-gray-600 text-sm mt-1">{condition}</p>
    </div>
  );
};

export default UserDashboard;