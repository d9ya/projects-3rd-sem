import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const css = `
.settings-page {
  max-width: 900px;
  margin: 20px auto;
  font-family: "Segoe UI", system-ui, sans-serif;
}

.settings-header h1 {
  font-size: 26px;
  font-weight: 700;
}

.settings-header p {
  color: #6b7280;
  margin-top: 4px;
}

.tabs {
  margin-top: 25px;
  border-bottom: 1px solid #e5e7eb;
}

.tab {
  background: none;
  border: none;
  padding: 12px 0;
  font-size: 15px;
  font-weight: 600;
  color: #2563eb;
  border-bottom: 3px solid #2563eb;
  cursor: pointer;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 28px;
  margin-top: 30px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.card h2 {
  font-size: 18px;
  margin-bottom: 22px;
}

.profile-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: white;
  font-weight: 700;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.change-photo-btn {
  border: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  color: #2563eb;
  cursor: pointer;
}

.form-group {
  margin-bottom: 18px;
}

label {
  font-size: 13px;
  color: #6b7280;
}

input {
  width: 100%;
  margin-top: 6px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.primary-btn {
  margin-top: 25px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #ffffff;
  border: none;
  padding: 12px 30px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);
}

.password-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
}
`;

const Settings = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const menuItems = [
    { id: "home", label: "Home", img: "home.png" },
    { id: "create", label: "Create New Trip", img: "clock.png" },
    { id: "packing", label: "Packing List", img: "list.png" },
    { id: "history", label: "Trip History", img: "map.png" },
    { id: "settings", label: "Settings", img: "settings.png" }
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#eaf3ff" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "linear-gradient(180deg, rgb(184, 211, 240))",
          padding: "20px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <h2>Travel Cast</h2>
          <p style={{ fontSize: "12px" }}>Your Journey Starts</p>
        </div>

        <div style={{ flex: 1 }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "home") navigate("/userdashboard");
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                marginBottom: "14px",
                background: item.id === "settings" ? "white" : "transparent",
                color: item.id === "settings" ? "#2563eb" : "black",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              <img src={item.img} alt={item.label} width={20} />
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => alert("Logged out successfully")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          <img src="logout.png" alt="Logout" width={20} />
          Logout
        </button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        <style>{css}</style>

        <div className="settings-page">
          <div className="settings-header" style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h1>Profile Settings</h1>
            <p>Manage your account settings and preferences</p>
          </div>

          <div className="tabs">
            <button className="tab">Profile</button>
          </div>

          <div className="card">
            <h2>Profile Information</h2>

            <div className="profile-row">
              <div className="avatar">RD</div>
              <button className="change-photo-btn">📷 Change Photo</button>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input name="fullName" value={profile.fullName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input name="email" value={profile.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} />
            </div>

            <button className="primary-btn">Save Changes</button>
          </div>

          <div className="card">
            <h2>Change Password</h2>

            <div className="password-row">
              <input type="password" placeholder="Current Password" />
              <input type="password" placeholder="New Password" />
              <input type="password" placeholder="Confirm New Password" />
            </div>

            <button className="primary-btn">Update Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
