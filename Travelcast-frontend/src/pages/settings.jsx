import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const css = `
.settings-page {
  max-width: 900px;
  margin: 40px auto;
  font-family: system-ui, sans-serif;
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

.password-icon {
  position: absolute;
  right: 10px;
  top: 38px;
  cursor: pointer;
  color: #777;
}

.password-icon:hover {
  color: #333;
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
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: ""
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile data from backend
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/profile');
        if (response.ok) {
          const profileData = await response.json();
          setProfile(profileData);
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
    { id: "create", label: "Create New Trip", img: "add.png" },
    { id: "packing", label: "Packing List", img: "list.png" },
    { id: "history", label: "Trip History", img: "history.png" },
    { id: "subscription", label: "Subscription", img: "notification.png" },
    { id: "settings", label: "Settings", img: "settings.png" }
  ];

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordForm)
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        // Reset form
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        // Reset password visibility
        setShowPasswords({
          currentPassword: false,
          newPassword: false,
          confirmPassword: false
        });
      } else {
        const errorResult = await response.json();
        alert(errorResult.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#e3e7f6ff" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "linear-gradient(180deg, rgb(184, 211, 240))",
          padding: "20px",
          color: "black",
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
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                // Navigate to different pages based on menu item
                switch (item.id) {
                  case 'settings':
                    // Already on settings page
                    break;
                  case 'home':
                    navigate('/userdashboard');
                    break;
                  case 'create':
                  case 'packing':
                  case 'history':
                  case 'subscription':
                  default:
                }
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                marginBottom: "16px",
                background: item.id === "settings" ? "white" : "transparent",
                color: item.id === "settings" ? "#2563eb" : "black",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
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
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px",
            marginTop: "20px",
            background: "transparent",
            color: "black",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "box-shadow 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
          }}
        >
          <img src="logout.png" alt="Logout" width={20} height={20} />
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        <style>{css}</style>

        <div className="settings-page">

          <div className="settings-header" style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h1>Profile Settings</h1>
            <p>Manage your account settings and preferences</p>
          </div>


          <div className="tabs">
            <button
              className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`tab ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              Password
            </button>
          </div>

          {activeTab === 'profile' && (
            <div className="card">
              <h2>Profile Information</h2>
              <p className="muted">Update your personal information</p>

              <div className="avatar-row">
                <div className="avatar">RD</div>
                <button className="outline-btn">📷 Change Photo</button>
              </div>

              <form onSubmit={handleProfileSubmit}>
                <div className="form-grid">
                  <div>
                    <label>Full Name</label>
                    <input
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>

                  <div>
                    <label>Email</label>
                    <input
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      type="email"
                      required
                    />
                  </div>

                  <div>
                    <label>Phone Number</label>
                    <input
                      name="phoneNumber"
                      value={profile.phoneNumber}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="primary-btn">Save Changes</button>
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="card">
              <h2>Change Password</h2>
              <p className="muted">Update your password to keep your account secure</p>

              <form onSubmit={handlePasswordSubmit}>
                <div className="form-grid">
                  <div style={{ position: 'relative' }}>
                    <label>Current Password</label>
                    <input
                      type={showPasswords.currentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <span
                      className="password-icon"
                      onClick={() => setShowPasswords(prev => ({
                        ...prev,
                        currentPassword: !prev.currentPassword
                      }))}
                    >
                      {showPasswords.currentPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <label>New Password</label>
                    <input
                      type={showPasswords.newPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <span
                      className="password-icon"
                      onClick={() => setShowPasswords(prev => ({
                        ...prev,
                        newPassword: !prev.newPassword
                      }))}
                    >
                      {showPasswords.newPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <label>Confirm New Password</label>
                    <input
                      type={showPasswords.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <span
                      className="password-icon"
                      onClick={() => setShowPasswords(prev => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword
                      }))}
                    >
                      {showPasswords.confirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>

                <button type="submit" className="primary-btn">Update Password</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;