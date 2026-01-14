import React, { useState } from "react";


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

// .settings-header p {
//   color: #666;
//   margin-bottom: 30px;
// }


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
    fullName: "Robert Doe",
    email: "robort@example.com",
    phoneNumber: "+1 (555) 123-4567",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <>
      
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
    </>
  );
};

export default Settings;
