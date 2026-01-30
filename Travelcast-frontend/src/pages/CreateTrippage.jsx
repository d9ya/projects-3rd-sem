import React, { useState, useEffect } from "react";
import { FiHome, FiPlus, FiList, FiEdit, FiBell, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { WiDaySunny, WiCloudy, WiCloud, WiRain, WiSnow } from "react-icons/wi";
 
const CreateTrip = () => {
  const navigate = useNavigate();
 
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };
 
  const [trip, setTrip] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    note: "",
  });
 
  const [weather, setWeather] = useState([]);
  const [loadingWeather, setLoadingWeather] = useState(false);
 
  const cityMap = {
    Kathmandu: { q: "Kathmandu,NP" },
    Pokhara: { q: "Pokhara,NP" },
    Chitwan: { lat: 27.5293, lon: 84.3542 },
    Mustang: { q: "Mustang,NP" },
  };
 
  useEffect(() => {
    if (trip.destination) fetchWeather(trip.destination);
    else setWeather([]);
  }, [trip.destination, trip.startDate, trip.endDate]);
 
  const handleChange = (e) => setTrip({ ...trip, [e.target.name]: e.target.value });
  const increase = () => setTrip({ ...trip, travelers: trip.travelers + 1 });
  const decrease = () => trip.travelers > 1 && setTrip({ ...trip, travelers: trip.travelers - 1 });
 
  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/trips/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trip),
      });
 
      const data = await res.json();
 
      if (res.ok) {
        alert("Trip saved successfully!");
        setTrip({ name: "", destination: "", startDate: "", endDate: "", travelers: 1, note: "" });
        setWeather([]);
       
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
     
      alert("Backend not responding");
    }
  };
 
  const fetchWeather = async (city) => {
    if (!city) return;
    try {
      setLoadingWeather(true);
      const apiKey = "4f11ab35f65e0493763249ca4395483f";
      const cityInfo = cityMap[city];
 
      const url = cityInfo.lat && cityInfo.lon
        ? `https://api.openweathermap.org/data/2.5/forecast?lat=${cityInfo.lat}&lon=${cityInfo.lon}&units=metric&appid=${apiKey}`
        : `https://api.openweathermap.org/data/2.5/forecast?q=${cityInfo.q}&units=metric&appid=${apiKey}`;
 
      const res = await fetch(url);
      const data = await res.json();
 
      if (res.ok) {
        const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);
        setWeather(daily);
      } else setWeather([]);
    } catch (err) {
      console.error(err);
      setWeather([]);
    } finally {
      setLoadingWeather(false);
    }
  };
 
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear": return <WiDaySunny size={40} />;
      case "Clouds": return <WiCloudy size={40} />;
      case "Rain": return <WiRain size={40} />;
      case "Snow": return <WiSnow size={40} />;
      default: return <WiCloud size={40} />;
    }
  };
 
  return (
    <div className="flex h-[110vh] bg-blue-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-100 p-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-center mb-8">
            <img src="/logo.png" alt="Logo" className="w-20 mb-2 mx-auto" />
          </div>
 
          <div className="flex flex-col gap-4">
            <button className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-blue-200 font-medium shadow-md hover:bg-white" onClick={() => navigate("/userdashboard")}><FiHome /> Home</button>
            <button className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-blue-300 font-semibold shadow-md hover:bg-white" onClick={() => navigate("/createTrip")}><FiPlus /> Create New Trip</button>
            <button className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-blue-200 font-medium shadow-md hover:bg-white" onClick={() => navigate("/packing")}><FiList /> Packing List</button>
            <button className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-blue-200 font-medium shadow-md hover:bg-white" onClick={() => navigate("/tripHistory")}><FiEdit /> Trip History</button>
            <button className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-blue-200 font-medium shadow-md hover:bg-white" onClick={() => navigate("/subscription")}><FiBell /> Subscription</button>
            <button className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-blue-200 font-medium shadow-md hover:bg-white" onClick={() => navigate("/settings")}><FiSettings /> Settings</button>
          </div>
        </div>
 
        <button onClick={handleLogout} className="flex items-center gap-3 justify-center px-4 py-4 rounded-2xl bg-blue-200 font-semibold shadow-md hover:bg-white"><FiLogOut /> Logout</button>
      </aside>
 
      {/* Main Content */}
      <main className="flex-1 p-9 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto mb-5">
          <h1 className="text-2xl font-bold mb-2">Create Your Trip</h1>
          <p className="text-gray-600 mb-6">Plan smarter with weather insights</p>
        </div>
 
        <div className="bg-white p-8 rounded-xl max-w-[1200px] w-full mx-auto relative h-[90vh]">
          <h3 className="text-lg font-semibold mb-4">Trip Essentials</h3>
 
          <label className="block text-sm mb-2">Name</label>
          <input name="name" value={trip.name} onChange={handleChange} className="w-full p-3 mb-4 rounded bg-gray-100 border-none" />
 
          <div className="flex gap-5 mb-4">
            <div className="flex-1">
              <label className="block text-sm mb-2">Destination</label>
              <select name="destination" value={trip.destination} onChange={handleChange} className="w-full p-3 mb-4 rounded bg-gray-100 border-none">
                <option value="">Select</option>
                <option>Kathmandu</option>
                <option>Pokhara</option>
                <option>Chitwan</option>
                <option>Mustang</option>
              </select>
            </div>
 
            <div className="flex-1">
              <label className="block text-sm mb-2">Start Date</label>
              <input type="date" name="startDate" value={trip.startDate} onChange={handleChange} className="w-full p-3 mb-4 rounded bg-gray-100 border-none" />
            </div>
 
            <div className="flex-1">
              <label className="block text-sm mb-2">End Date</label>
              <input type="date" name="endDate" value={trip.endDate} onChange={handleChange} className="w-full p-3 mb-4 rounded bg-gray-100 border-none" />
            </div>
          </div>
 
          <div className="flex gap-5 mb-4">
            <div className="flex-1">
              <label className="block text-sm mb-2">Number of travelers</label>
              <div className="flex items-center gap-3 bg-gray-100 p-2 rounded">
                <button onClick={decrease} className="bg-gray-300 px-3 py-1 rounded">-</button>
                <span>{trip.travelers}</span>
                <button onClick={increase} className="bg-gray-300 px-3 py-1 rounded">+</button>
              </div>
            </div>
 
            <div className="flex-1">
              <label className="block text-sm mb-2">Note</label>
              <input name="note" value={trip.note} onChange={handleChange} className="w-full p-3 mb-4 rounded bg-gray-100 border-none" />
            </div>
          </div>
 
          <div className="flex gap-5 mt-6">
            {/* Map */}
            <div className="flex-1">
              <p className="mb-2 font-semibold">Google Map</p>
              <iframe
                title="map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(trip.destination || "Kathmandu")}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-52 rounded-lg border-none"
              />
            </div>
 
            {/* Weather */}
            <div className="flex-1 p-4 rounded-2xl shadow-lg">
              <p className="font-semibold mb-2">Weather Forecast</p>
              {loadingWeather ? (
                <p>Loading...</p>
              ) : weather.length > 0 ? (
                <div className="flex gap-3 overflow-x-auto">
                  {weather.map((day, i) => (
                    <div
                      key={i}
                      className="min-w-[110px] rounded-lg p-3 text-center shadow-md"
                      style={{ backgroundColor: "#B9EBFF", color: "#000" }}
                    >
                      <p className="mb-1 font-semibold">{day.dt_txt.split(" ")[0]}</p>
                      <div className="text-4xl mb-1">{getWeatherIcon(day.weather[0].main)}</div>
                      <p className="font-medium">{day.main.temp} °C</p>
                      <p className="text-sm capitalize">{day.weather[0].description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Select a destination to see weather</p>
              )}
            </div>
          </div>
 
          <div className="absolute bottom-6 right-6">
            <button onClick={handleSubmit} className="bg-blue-700 text-white px-9 py-4 rounded-full text-lg hover:bg-blue-800 transition-colors">Save Trip</button>
          </div>
        </div>
      </main>
    </div>
  );
};
 
export default CreateTrip;
 