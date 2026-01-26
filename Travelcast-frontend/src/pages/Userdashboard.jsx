import React, { useState, useEffect } from "react";
import {
  BiSearch,
  BiBell,
  BiHome,
  BiPlus,
  BiListCheck,
  BiHistory,
  BiCog,
  BiLogOut,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const API_KEY = "4f11ab35f65e0493763249ca4395483f";
const fetchWeatherByCity = async (city) => {
  const [currentRes, forecastRes] = await Promise.all([
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    ),
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    ),
  ]);

  if (!currentRes.ok || !forecastRes.ok) {
    throw new Error("City not found");
  }

  const current = await currentRes.json();
  const forecastData = await forecastRes.json();
  
  const forecast = forecastData.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5)
    .map((item) => ({
      day: new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
    }));

  return {
    current: {
      temperature: Math.round(current.main.temp),
      condition: current.weather[0].main,
      icon: current.weather[0].icon,
      location: `${current.name}, ${current.sys.country}`,
      wind: `${Math.round(current.wind.speed * 3.6)} km/h`,
      humidity: `${current.main.humidity}%`,
      sunrise: current.sys.sunrise,
      sunset: current.sys.sunset,
    },
    forecast,
  };
};


const UserDashboard = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const data = await res.json();
          handleWeatherSearch(data.name);
        } catch {
          handleWeatherSearch("Kathmandu");
        }
      },
      () => handleWeatherSearch("Kathmandu")
    );
  }, []);

  const handleWeatherSearch = async (cityInput) => {
    const city = cityInput || searchTerm.trim();
    if (!city) return;

    try {

      setLoading(true);
      setError("");
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
    } catch {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  const destinations = [
    {
      id: 1,
      tag: "Nature",
      title: "Machhapuchhre Mountain",
      location: "Pokhara, Nepal",
      img: "mount.jpg",
    },
    {
      id: 2,
      tag: "Culture",
      title: "Muktinath Temple",
      location: "Mustang, Nepal",
      img: "place2.jpeg",
    },
    {
      id: 3,
      tag: "Adventure",
      title: "Annapurna Base Camp",
      location: "Nepal",
      img: "mountain.jpg",
    },
    {
      id: 4,
      tag: "History",
      title: "Ram Janaki Mandir",
      location: "Janakpur, Nepal",
      img: "janaki.png",
    },
  ];

  return (
    <div className="flex h-screen bg-[#f0f4fa]">

      <div className="w-[250px] bg-[rgb(184,211,240)] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <img src="logo.png" width={40} />
          <div>
            <h2 className="text-xl font-semibold">Travel Cast</h2>
            <p className="text-xs text-gray-600">Your Journey Starts</p>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <SidebarItem icon={<BiHome />} label="Home" onClick={() => navigate("/userdashboard")} />
          <SidebarItem icon={<BiPlus />} label="Create New Trip" />
          <SidebarItem icon={<BiListCheck />} label="Packing List" />
          <SidebarItem icon={<BiHistory />} label="Trip History" />
          <SidebarItem icon={<BiBell />} label="Subscription" />
          <SidebarItem icon={<BiCog />} label="Settings" onClick={() => navigate("/settings")} />
        </div>

        <div className="mt-4">
          <SidebarItem
            icon={<BiLogOut />}
            label="Logout"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          />
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto bg-[#f8fafc]">

        <div className="flex justify-between mb-10">
          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-sm w-1/2">
            <BiSearch />
            <input
              placeholder="Search city for weather..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleWeatherSearch()}
              className="w-full outline-none text-sm"
            />
            <button onClick={() => handleWeatherSearch()}>Search</button>
          </div>
          <BiBell />
        </div>
        {weatherData && (
          <>
            <WeatherBox data={weatherData.current} />
            <Forecast forecast={weatherData.forecast} />
          </>
        )}
        <h2 className="text-2xl font-bold mt-14 mb-6">
          Recommended Destinations
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {destinations.map((d) => (
            <DestinationCard key={d.id} {...d} />
          ))}
        </div>
      </div>
    </div>
  );
};


const SidebarItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="
      flex items-center gap-4
      w-full h-[52px]
      px-5
      rounded-xl
      hover:bg-white
      shadow-sm hover:shadow-md
      transition
      text-left
    "
  >
    <span className="text-xl">{icon}</span>
    <span className="text-sm font-medium truncate">{label}</span>
  </button>
);

const WeatherBox = ({ data }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm mb-10">
    <h3 className="font-semibold">{data.location}</h3>
    <div className="flex items-center gap-4 mt-4">
      <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} />
      <div>
        <p className="text-4xl font-bold">{data.temperature}°C</p>
        <p>{data.condition}</p>
      </div>
    </div>
    <p className="text-sm mt-3">Wind: {data.wind}</p>
    <p className="text-sm">Humidity: {data.humidity}</p>
  </div>
);

const Forecast = ({ forecast }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <h3 className="font-semibold mb-6">5-Day Forecast</h3>
    <div className="grid grid-cols-5 gap-6 text-center">
      {forecast.map((day, i) => (
        <div key={i} className="bg-gray-50 p-4 rounded-xl">
          <p className="font-semibold">{day.day}</p>
          <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} className="mx-auto" />
          <p>{day.temp}°C</p>
        </div>
      ))}
    </div>
  </div>
);

const DestinationCard = ({ tag, title, location, img }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
    <img src={img} className="h-40 w-full object-cover" />
    <div className="p-4">
      <span className="text-xs font-semibold text-gray-500">{tag}</span>
      <h4 className="font-bold mt-2">{title}</h4>
      <p className="text-sm text-gray-600">{location}</p>
    </div>
  </div>
);

export default UserDashboard;
