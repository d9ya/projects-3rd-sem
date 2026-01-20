import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const css = `
.settings-page {
  max-width: 900px;
  margin: 40px auto;
  font-family: system-ui, sans-serif;
  background: #e1e4eeff;
}

.settings-header h1 {
  font-size: 28px;
  margin-bottom: 6px;
}
.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
}

.tab {
  background: none;
  border: none;
  padding: 10px 0;
  font-size: 15px;
  cursor: pointer;
  color: #666;
}

.tab.active {
  color: #000;
  border-bottom: 2px solid #007bff;
}


.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 30px;
}

.card h2 {
  margin-bottom: 4px;
}

.muted {
  color: #777;
  margin-bottom: 20px;
}

.avatar-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #007bff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 22px;
}

.outline-btn {
  border: 1px solid #ddd;
  background: #fff;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}


.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

label {
  font-size: 13px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border-radius: 6px;
  border: 1px solid #ddd;
}


.primary-btn {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}
`;


const Settings = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: ""
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Fetch user profile data from backend
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/profile');
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);
   const menuItems = [
    { id: "home", label: "Home", img: "home.png" },
    { id: "create", label: "Create New Trip", img: "clock.png" },
    { id: "packing", label: "Packing List", img: "list.png" },
    { id: "history", label: "Trip History", img: "map.png" },
    {id: "settings", label:"Settings", img:"settings.png"}
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#e3e7f6ff" }}>
      {/* Sidebar */}
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
        {/* Logo/Header */}
        <div style={{ marginBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.3)" }}>
          <h2>Travel Cast</h2>
          <p style={{ fontSize: "12px", opacity: 0.8 }}>Your Journey Starts</p>
        </div>

        {/* Menu Items */}
        <div style={{ flex: 1 }}>
          {[
            { id: "home", label: "Home", img: "home.png" },
            { id: "create", label: "Create New Trip", img: "clock.png" },
            { id: "packing", label: "Packing List", img: "list.png" },
            { id: "history", label: "Trip History", img: "map.png" },
            { id: "settings", label: "Settings", img: "settings.png" }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                // Navigate to different pages based on menu item
                switch(item.id) {
                  case 'settings':
                    // Already on settings page
                    break;
                  case 'home':
                    navigate('/userdashboard');
                    break;
                  default:
                    // Handle other menu items if needed
                    console.log(`Navigating to ${item.id}`);
                }
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                marginBottom: "8px",
                background: item.id === "settings" ? "white" : "transparent",
                color: item.id === "settings" ? "#2563eb" : "black",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              <img src={item.img} alt={item.label} width={20} height={20} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            alert("Logged out successfully!");
            // Add actual logout logic here
          }}
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

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        <style>{css}</style>

        <div className="settings-page">
        
          <div className="settings-header">
            <h1>Profile Settings</h1>
            <p>Manage your account settings and preferences</p>
          </div>

          
          <div className="tabs">
            <button className="tab active">Profile</button>
            
          </div>

          
          <div className="card">
            <h2>Profile Information</h2>
            <p className="muted">Update your personal information</p>

            <div className="avatar-row">
              <div className="avatar">RD</div>
              <button className="outline-btn">📷 Change Photo</button>
            </div>

            <div className="form-grid">
              <div>
                <label>Full Name</label>
                <input
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Email</label>
                <input
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Phone Number</label>
                <input
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="primary-btn">Save Changes</button>
          </div>

         
          <div className="card">
            <h2>Change Password</h2>
            <p className="muted">Update your password to keep your account secure</p>

            <div className="form-grid">
              <div>
                <label>Current Password</label>
                <input type="password" />
              </div>
              <div>
                <label>New Password</label>
                <input type="password" />
              </div>
              <div>
                <label>Confirm New Password</label>
                <input type="password" />
              </div>
            </div>

            <button className="primary-btn">Update Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
