import React, { useState, useEffect } from "react";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  WiDaySunny,
  WiCloudy,
  WiCloud,
  WiRain,
  WiSnow,
} from "react-icons/wi";


const CreateTrip = () => {
const navigate = useNavigate();
const handleLogout = () => {
  localStorage.clear();
  sessionStorage.clear();
  navigate("/login"); // or "/" if that's your login page
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

  // Map cities to OpenWeatherMap-friendly names or coordinates
  const cityMap = {
    Kathmandu: { q: "Kathmandu,NP" },
    Pokhara: { q: "Pokhara,NP" },
    Chitwan: { lat: 27.5293, lon: 84.3542 }, // Chitwan coordinates
    Mustang: { q: "Mustang,NP" },
  };

  // Automatically fetch weather when destination or dates change
  useEffect(() => {
    if (trip.destination) {
      fetchWeather(trip.destination);
    } else {
      setWeather([]);
    }
  }, [trip.destination, trip.startDate, trip.endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const increase = () => setTrip({ ...trip, travelers: trip.travelers + 1 });
  const decrease = () =>
    trip.travelers > 1 && setTrip({ ...trip, travelers: trip.travelers - 1 });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/trips/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trip),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Trip saved successfully!");
        setTrip({ name: "", destination: "", startDate: "", endDate: "", travelers: 1, note: "" });
        setWeather([]);
        console.log("Saved trip:", data);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Backend not responding");
    }
  };

  // Fetch 5-day weather forecast
  const fetchWeather = async (city) => {
    if (!city) return;

    try {
      setLoadingWeather(true);
      const apiKey = "4f11ab35f65e0493763249ca4395483f"; // Replace with your API key
      const cityInfo = cityMap[city];

      let url;
      if (cityInfo.lat && cityInfo.lon) {
        // Use coordinates if available
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityInfo.lat}&lon=${cityInfo.lon}&units=metric&appid=${apiKey}`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInfo.q}&units=metric&appid=${apiKey}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        // Filter one forecast per day at 12:00
        const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);
        setWeather(daily);
      } else {
        console.error("Weather API error:", data.message);
        setWeather([]);
      }
    } catch (err) {
      console.error("Weather error", err);
      setWeather([]);
    } finally {
      setLoadingWeather(false);
    }
  };

  const goToSettings = () => navigate("/settings");
  const getWeatherIcon = (main) => {
  switch (main) {
    case "Clear":
      return <WiDaySunny size={40} />;
    case "Clouds":
      return <WiCloudy size={40} />;
    case "Rain":
      return <WiRain size={40} />;
    case "Snow":
      return <WiSnow size={40} />;
    default:
      return <WiCloud size={40} />;
  }
};


  const styles = {
    container: { 
      display: "flex", 
      height: "110vh", 
      background: "#eef2fb", 
      fontFamily: "Arial, sans-serif" 
    },
    sidebar: { 
      width: "230px", 
      background: "#c9d6f1", 
      padding: "25px 20px", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "space-between", 
      height: "110vh" 
    },
    logoImg: { 
      width: "120px", 
      marginTop: "15px", 
      marginLeft: "20px" 
    },
    menu: { 
      marginTop: "40px", 
      display: "flex", 
      flexDirection: "column", 
      gap: "14px" 
    },
    menuBtn: { 
      background: "#c9d6f1", 
      border: "none", 
      fontSize: "14px", 
      cursor: "pointer", 
      display: "flex", 
      alignItems: "center", 
      gap: "10px", 
      padding: "12px 16px", 
      borderRadius: "12px", 
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)", 
      transition: "all 0.3s ease" 
    },
    menuBtnHover: { 
      background: "#ffffff", 
      boxShadow: "0 6px 18px rgba(0,0,0,0.16)" 
    },
    logoutBtn: { 
      background: "#4f5bd5", 
      color: "#fff", 
      border: "none", 
      borderRadius: "22px", 
      padding: "12px", 
      cursor: "pointer", 
      fontSize: "14px", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      gap: "8px" 
    },
    content: { 
      flex: 1, 
      padding: "35px 50px" 
    },
    topBarTitle: { 
      fontSize: "22px", 
      fontWeight: "700", 
      margin: 0 
    },
    subtitle: { 
      color: "#666", 
      marginBottom: "25px" 
    },
    card: { 
      background: "#fff", 
      padding: "30px", 
      paddingBottom: "90px", 
      borderRadius: "14px", 
      maxWidth: "1200px", 
      width: "100%", 
      margin: "0 auto", 
      position: "relative", 
      height: "90vh" 
    },
    label: { 
      fontSize: "14px", 
      marginBottom: "6px", 
      display: "block" 
    },
    input: { 
      width: "100%", 
      padding: "12px", 
      background: "#f1f1f1", 
      border: "none", 
      borderRadius: "8px", 
      marginBottom: "15px" },
      row: { display: "flex", 
      gap: "20px" 
    },
    travelerBox: { 
      flex: 1 
    },
    counter: { 
      display: "flex", 
      alignItems: "center", 
      gap: "12px", 
      background: "#f1f1f1", 
      padding: "10px", 
      borderRadius: "8px", 
      marginTop: "8px" 
    },
    counterBtn: { 
      background: "#ddd", 
      border: "none", 
      borderRadius: "6px", 
      padding: "4px 10px", 
      cursor: "pointer" 
    },
    mapBox: { 
      marginTop: "20px", 
      width: "50%" 
    },
    map: { 
      width: "100%", 
      height: "200px", 
      border: "none", 
      borderRadius: "10px" 
    },
    saveBtnWrapper: { 
      position: "absolute", 
      bottom: "25px", 
      right: "30px" 
    },
    saveBtn: { 
      background: "#4f5bd5", 
      color: "#fff", 
      padding: "14px 36px", 
      border: "none", 
      borderRadius: "30px", 
      fontSize: "16px", 
      cursor: "pointer" 
    },
    mapWeatherRow: { 
      display: "flex", 
      gap: "20px", 
      marginTop: "20px" 
    },
    weatherBox: {
      flex: 1,
      borderRadius: "16px",
      padding: "16px",
      color: "#fff",
      backgroundImage:"linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('weather.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    },

    forecastItem: {
      minWidth: "110px",
      background: "rgba(255,255,255,0.25)",
      backdropFilter: "blur(8px)",
      borderRadius: "14px",
      padding: "10px",
      textAlign: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
      fontSize: "13px",
    },
      };
  

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div>
          <img src="/logo.png" alt="logo" style={styles.logoImg} />
          <div style={styles.menu}>
            <button
              style={styles.menuBtn}
              onClick={goToSettings}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.menuBtnHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.menuBtn)}
            >
              <FiSettings /> Settings
            </button>
          </div>
        </div>
        <button style={styles.logoutBtn} onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
      </aside>

      {/* Main */}
      <main style={styles.content}>
        <div style={{ maxWidth: styles.card.maxWidth, margin: "0 auto 20px auto" }}>
          <h1 style={styles.topBarTitle}>Create Your Trip</h1>
          <p style={styles.subtitle}>Plan smarter with weather insights</p>
        </div>

        <div style={styles.card}>
          <h3>Trip Essentials</h3>

          <label style={styles.label}>Name</label>
          <input style={styles.input} name="name" value={trip.name} onChange={handleChange} />

          <div style={styles.row}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Destination</label>
              <select style={styles.input} name="destination" value={trip.destination} onChange={handleChange}>
                <option value="">Select</option>
                <option>Kathmandu</option>
                <option>Pokhara</option>
                <option>Chitwan</option>
                <option>Mustang</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={styles.label}>Start Date</label>
              <input style={styles.input} type="date" name="startDate" value={trip.startDate} onChange={handleChange} />
            </div>

            <div style={{ flex: 1 }}>
              <label style={styles.label}>End Date</label>
              <input style={styles.input} type="date" name="endDate" value={trip.endDate} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.travelerBox}>
              <label style={styles.label}>Number of travelers</label>
              <div style={styles.counter}>
                <button style={styles.counterBtn} onClick={decrease}>-</button>
                <span>{trip.travelers}</span>
                <button style={styles.counterBtn} onClick={increase}>+</button>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <label style={styles.label}>Note</label>
              <input style={styles.input} name="note" value={trip.note} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.mapWeatherRow}>
            {/* Map */}
            <div style={styles.mapBox}>
              <p>Google Map</p>
              <iframe
                title="map"
                style={styles.map}
                src={`https://www.google.com/maps?q=${encodeURIComponent(trip.destination || "Kathmandu")}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Weather */}
            <div style={styles.weatherBox}>
              <p>Weather Forecast</p>
              {loadingWeather ? (
                <p>Loading...</p>
              ) : weather.length > 0 ? (
                <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
                  {weather.map((day, i) => (
                    <div key={i} style={styles.forecastItem}>
                      <p>{day.dt_txt.split(" ")[0]}</p>
                      <div style={{ fontSize: "42px", margin: "6px 0" }}>
                          {getWeatherIcon(day.weather[0].main)}
                        </div>
                      <p>{day.main.temp} °C</p>
                      <p>{day.weather[0].description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Select a destination to see weather</p>
              )}
            </div>
          </div>

          <div style={styles.saveBtnWrapper}>
            <button style={styles.saveBtn} onClick={handleSubmit}>Save Trip</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTrip;