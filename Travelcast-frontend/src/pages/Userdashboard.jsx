import React, { useState } from "react";

const UserDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const [showNotification, setShowNotification] =useState(false);

 
  const menuItems = [
    { id: "home", label: "Home", img: "home.png" },
    { id: "create", label: "Create New Trip", img: "clock.png" },
    { id: "packing", label: "Packing List", img: "list.png" },
    { id: "history", label: "Trip History", img: "map.png" },
    {id: "settings", label:"Settings", img:"settings.png"}
  ];

  
  const weatherData = [
    { city: "Pokhara", temp: 22, img: "sun.png" },
    { city: "Lumbini", temp: 22, img: "sun.png" },
    { city: "Mustang", temp: -14, img: "clouds.png" },
    { city: "Dolpa", temp: -4, img: "clouds.png" },
    { city: "Ghandruk", temp: 4, img: "rain.png" }
  ];

  const handleLogout = () => {
    
    alert("Logged out successfully!");
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#e3e7f6ff" }}>

     
      <div
        style={{
          width: "250px",
          background: "linear-gradient(180deg, #90b4efff)",
          padding: "20px",
          color: "white",
          display: "flex",
          flexDirection: "column"
        }}
      >
        
        <div style={{ marginBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.3)" }}>
          <h2>Travel Cast</h2>
          <p style={{ fontSize: "12px", opacity: 0.8 }}>Your Journey Starts</p>
        </div>

       
        <div style={{ flex: 1 }}>
          {menuItems.map(item => {
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  marginBottom: "8px",
                  background: isActive ? "white" : "transparent",
                  color: isActive ? "#2563eb" : "black",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer"
                }}
              >
                <img src={item.img} alt={item.label} width={20} height={20} />
                {item.label}
              </button>
            );
          })}
        </div>

       
        <button
          onClick={handleLogout}
          style={{
            padding: "12px",
            background: "White",
            border: "none",
            borderRadius: "10px",
            color: "Black",
            cursor: "pointer",
            width: "100%",
            fontWeight: "bold",
            marginTop: "20px"
          }}
        >
          Logout
        </button>
      </div>

     
      <div style={{ flex: 1, padding: "30px", overflowY: "auto" }}>

             
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#90b4efff",
    padding: "15px 20px",
    borderRadius: "12px",
    marginBottom: "25px",
    color: "white"
  }}
>
 
  <div style={{ flex: 1, marginRight: "20px" }}>
    <input
      type="text"
      placeholder="Search ..."
      style={{
       width: "100%",
        padding: "10px 15px",
        borderRadius: "8px",
        border: "none",
        outline: "none",
        fontSize: "14px",
        fontWeight: "bold"
      }}
    />
  </div>


  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "20px"
    }}
  >
   

   
    <div style={{ position: "relative", cursor: "pointer" }}>
      <img
  src="notification.png"
  alt="Notifications"
  onClick={() => alert("Notifications clicked")}
  style={{
    width: "20px",
    height: "20px",
    cursor: "pointer"
  }}
/> 
    </div>

    
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #2563eb"
         
        }}
      >
        
  <img
    src="user.jpeg"
    alt="Profile"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }}
  />
      </div>
      <span style={{ fontSize: "14px" }}>John Doe</span>
    </div>
  </div>
</div>
       
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "25px",
            fontWeight: "bold"
          }}
        >
          <div>
            <h2>Welcome back, John!</h2>
            <p>Ready to plan your next trip?</p>
          </div>
          
          

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginBottom: "30px",
             
            
            }}
          >
            <img src="mountain.jpg" alt="Mountain" style={imgStyle} />
            <img src="explore3.jpg" alt="Group" style={imgStyle} />
            <img src="explore2.jpg" alt="Heritage" style={imgStyle} />
          </div>
          </div>

          <h3>
            <strong>Recommended Places</strong></h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" , fontWeight: "bold"}}>
            {[
              { name: "Phewa Lake", location: "Pokhara", image: "place1.jpeg" },
              { name: "Muktinath Temple", location: "Mustang", image: "place2.jpeg" },
              { name: "Mountain Vista", location: "Mustang", image: "place3.jpeg" }
            ].map((place, i) => (
              <div key={i} style={{ background: "white", borderRadius: "15px", overflow: "hidden" }}>
                <img src={place.image} alt={place.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                <div style={{ padding: "15px" }}>
                  <h4>{place.name}</h4>
                  <p>{place.location}</p>
                </div>
              </div>
            ))}
          </div>

         
          <h3>
            <strong>Weather Updates</strong>
            </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "15px" }}>
            {weatherData.map((w, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "15px",
                  textAlign: "center"
                }}
              >
                <img src={w.img} alt={w.city} width={32} height={32} />
                <h4>{w.city}</h4>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{w.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      );
};

      const imgStyle = {
        width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "15px"
};

export default UserDashboard;
