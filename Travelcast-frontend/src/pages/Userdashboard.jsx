import React from "react";
import { Bell, ArrowRight, Search } from "lucide-react";
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
          background: "rgb(184, 211, 240)",
          padding: "20px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div style={{ marginBottom: "30px", display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="logo.png" alt="Logo" width={40} height={40} />
          <div>
            <h2 className="text-xl font-semibold">Travel Cast</h2>
            <p className="text-xs text-gray-500">Your Journey Starts</p>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-3 mb-4 rounded-lg hover:bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
              onClick={() => {
                if (item.id === "settings") {
                  navigate("/settings");
                } else if (item.id === "home") {
                  navigate("/userdashboard");
                }
                // Add other navigation cases as needed
              }}
            >
              <img src={item.img} alt={item.label} width={20} />
              {item.label}
            </button>
          ))}
        </div>

        <button className="font-semibold flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white w-full shadow-md hover:shadow-lg transition-shadow duration-200 mt-4">
          <img src="logout.png" alt="Logout" width={20} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto bg-[#f8fafc]">

        {/* Top Bar */}
        <div className="flex justify-between mb-10">
          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-sm w-1/2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search weather, destinations, trips..."
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

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Welcome back, John!</h1>
          <p className="text-gray-600">
            Here's what's happening with your travel plans today
          </p>
        </div>

        {/* WEATHER SECTION */}
        <div className="mb-14">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <WeatherBox />
            <SuitabilityBox />
            <AlertBox />
          </div>

          <Forecast />
        </div>

        {/* RECOMMENDED DESTINATIONS */}
        <SectionHeader
          title="Recommended Destinations"
          desc="Popular places based on your interests"
        >
        </SectionHeader>

        <div className="grid grid-cols-4 gap-6">
          <DestinationCard
            tag="Nature"
            title="Machhapuchhre Mountain"
            location="Pokhara, Nepal"
            img="mount.jpg"
          />
           <DestinationCard
            tag="Culture"
            title="Muktinath Temple"
            location="Mustang, Nepal"
            img="place2.jpeg"
          />
           <DestinationCard
            tag="Adventure"
            title="ABC"
            location=" Nepal"
            img="mountain.jpg"
          />
           <DestinationCard
            tag="History"
            title="Ram Janki Mandir"
            location="Janakpur, Nepal"
            img="janaki.png"
          />
         
        </div>

      </div>
    </div>
  );
};

const SectionHeader = ({ title, desc, children }) => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-600">{desc}</p>
    </div>
    {children}
  </div>
);

const WeatherBox = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <h3 className="font-semibold">Current Weather</h3>
    <p className="text-sm text-gray-500 mb-4">Kathmandu, Nepal</p>
    <div className="flex items-center gap-4">
      <img src="sun.png" className="w-14 h-14" />
      <div>
        <p className="text-3xl font-bold">24°C</p>
        <p className="text-gray-600">Sunny</p>
      </div>
    </div>
    <p className="text-sm text-gray-600 mt-4">Wind: 12 km/h</p>
    <p className="text-sm text-gray-600">Humidity: 60%</p>
  </div>
);

const SuitabilityBox = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm text-center flex flex-col justify-center">
    <h3 className="font-semibold mb-4">Travel Suitability</h3>
    <p className="text-4xl font-bold text-green-600">85%</p>
    <p className="text-gray-600 mt-2">Excellent for sightseeing & hiking</p>
  </div>
);

const AlertBox = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <h3 className="font-semibold mb-4">Weather Alerts</h3>
    <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded-xl text-sm">
      ⚠️ Light rain expected in next 48 hours
    </div>
  </div>
);

const Forecast = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <h3 className="font-semibold mb-6">5-Day Forecast</h3>
    <div className="grid grid-cols-5 gap-6 text-center">
      {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
        <div key={i} className="bg-gray-50 p-4 rounded-xl">
          <p className="font-semibold">{d}</p>
          <img src="sun.png" className="w-10 h-10 mx-auto my-2" />
          <p className="font-semibold">{22 + i}°C</p>
        </div>
      ))}
    </div>
  </div>
);

const TripCard = ({ title, date, status, img }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
    <img src={img} className="h-48 w-full object-cover" />
    <div className="p-5">
      <span className="text-sm font-semibold">{status}</span>
      <h3 className="font-bold text-lg mt-2">{title}</h3>
      <p className="text-gray-600 text-sm">{date}</p>
      <button className="flex items-center gap-2 mt-4 font-semibold">
        View Details <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const DestinationCard = ({ tag, title, location, img }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
    <img src={img} className="h-40 w-full object-cover" />
    <div className="p-4">
      <span className="text-sm font-semibold">{tag}</span>
      <h4 className="font-bold mt-2">{title}</h4>
      <p className="text-sm text-gray-600">{location}</p>
    </div>
  </div>
);

export default UserDashboard;