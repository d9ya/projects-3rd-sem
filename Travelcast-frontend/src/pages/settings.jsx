import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  BiHome,
  BiPlus,
  BiListCheck,
  BiHistory,
  BiBell,
  BiCog,
  BiLogOut,
} from "react-icons/bi";
import {
  getProfileApi,
  updateProfileApi,
  changePasswordApi,
} from "../services/api";

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
.primary-btn {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}
`;

const SidebarItem = ({ icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-4
      w-full h-[52px]
      px-5
      rounded-xl
      transition
      text-left
      ${active
        ? "bg-white text-black shadow-md"
        : "hover:bg-white shadow-sm text-black"
      }
    `}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileApi();
        if (res.data.success) {
          setProfile(res.data.data);
        } else {
          alert(`${res.data.message || 'Failed to load profile'}`);
        }
      } catch (err) {
        console.error('Profile fetch error:', err);

        if (err.response) {
          const { status, data } = err.response;

          switch (status) {
            case 401:
              alert(' Session expired. Please log in again.');
              localStorage.removeItem('token');
              navigate('/login');
              break;
            case 404:
              alert('👤 Profile not found.');
              break;
            case 500:
              alert(' Server error loading profile.');
              break;
            default:
              alert(` Error loading profile (${status}): ${data.message || 'Unknown error'}`);
          }
        } else if (err.request) {
          alert('Network error. Please check your connection.');
        } else {
          alert(' Failed to load profile. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError('');

    try {
      const res = await updateProfileApi(profile);
      if (res.data.success) {
        alert(' Profile updated successfully!');
      } else {
        const errorMessage = res.data.message || 'Failed to update profile';
        setProfileError(errorMessage);
        alert(` ${errorMessage}`);
      }
    } catch (err) {
      console.error('Profile update error:', err);

      // Handle specific error cases
      let errorMessage = '';
      if (err.response) {
        const { status, data } = err.response;

        switch (status) {
          case 400:
            errorMessage = `Validation Error: ${data.message || 'Please check your input data'}`;
            break;
          case 401:
            errorMessage = 'Authentication required. Please log in again.';
            localStorage.removeItem('token');
            navigate('/login');
            break;
          case 404:
            errorMessage = 'User not found. Please try logging in again.';
            break;
          case 409:
            errorMessage = data.message || 'Phone number or email already exists';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = `Error (${status}): ${data.message || 'Failed to update profile'}`;
        }
      } else if (err.request) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        errorMessage = 'An unexpected error occurred. Please try again.';
      }

      setProfileError(errorMessage);
      if (errorMessage && !errorMessage.includes('Authentication required') && !errorMessage.includes('User not found')) {
        alert(` ${errorMessage}`);
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError('');

    try {
      const res = await changePasswordApi(passwordForm);
      if (res.data.success) {
        alert('Password changed successfully!');
        // Clear the form after successful password change
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        const errorMessage = res.data.message || 'Failed to change password';
        setPasswordError(errorMessage);
        alert(` ${errorMessage}`);
      }
    } catch (err) {
      console.error('Password change error:', err);

      // Handle specific error cases
      let errorMessage = '';
      if (err.response) {
        const { status, data } = err.response;

        switch (status) {
          case 400:
            errorMessage = `Validation Error: ${data.message || 'Please check your passwords'}`;
            break;
          case 401:
            errorMessage = 'Authentication required. Please log in again.';
            localStorage.removeItem('token');
            navigate('/login');
            break;
          case 404:
            errorMessage = 'User not found. Please try logging in again.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = `Error (${status}): ${data.message || 'Failed to change password'}`;
        }
      } else if (err.request) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        errorMessage = 'An unexpected error occurred. Please try again.';
      }

      setPasswordError(errorMessage);
      if (errorMessage && !errorMessage.includes('Authentication required') && !errorMessage.includes('User not found')) {
        alert(`${errorMessage}`);
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-[#e3e7f6ff]">
      <div className="w-[250px] bg-[rgb(184,211,240)] p-6 flex flex-col">
        <div className="mb-10 border-b border-white/40 pb-4">
          <h2 className="text-xl font-semibold">Travel Cast</h2>
          <p className="text-xs text-gray-700">Your Journey Starts</p>
        </div>

        <div className="flex-1 space-y-3">
          <SidebarItem icon={<BiHome />} label="Home" onClick={() => navigate("/userdashboard")} />
          <SidebarItem icon={<BiPlus />} label="Create New Trip" />
          <SidebarItem icon={<BiListCheck />} label="Packing List" />
          <SidebarItem icon={<BiHistory />} label="Trip History" />
          <SidebarItem icon={<BiBell />} label="Subscription" />
          <SidebarItem icon={<BiCog />} label="Settings" active />
        </div>

        <SidebarItem
          icon={<BiLogOut />}
          label="Logout"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        />
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <style>{css}</style>

        <div className="settings-page">
          <div className="settings-header bg-white p-5 rounded-lg mb-6">
            <h1>Profile Settings</h1>
            <p>Manage your account settings</p>
          </div>

          <div className="tabs">
            <button
              className={`tab ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`tab ${activeTab === "password" ? "active" : ""}`}
              onClick={() => setActiveTab("password")}
            >
              Password
            </button>
          </div>

          {activeTab === "profile" && (
            <div className="card">
              <h2>Profile Information</h2>
              <p className="muted">Update your personal info</p>

              {profileError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-red-700">
                  {profileError}
                </div>
              )}

              <form onSubmit={handleProfileSubmit}>
                <div className="form-grid">
                  <div>
                    <label>Full Name</label>
                    <input name="fullName" value={profile.fullName} onChange={handleProfileChange} />
                  </div>
                  <div>
                    <label>Email</label>
                    <input name="email" value={profile.email} onChange={handleProfileChange} />
                  </div>
                  <div>
                    <label>Phone Number</label>
                    <input name="phoneNumber" value={profile.phoneNumber} onChange={handleProfileChange} />
                  </div>
                </div>
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={profileLoading}
                >
                  {profileLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {activeTab === "password" && (
            <div className="card">
              <h2>Change Password</h2>

              {passwordError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-red-700">
                  {passwordError}
                </div>
              )}

              <form onSubmit={handlePasswordSubmit}>
                <div className="form-grid">
                  {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
                    <div key={field} style={{ position: "relative" }}>
                      <label>{field.replace(/([A-Z])/g, " $1")}</label>
                      <input
                        type={showPasswords[field] ? "text" : "password"}
                        name={field}
                        value={passwordForm[field]}
                        onChange={handlePasswordChange}
                      />
                      <span
                        className="password-icon"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            [field]: !showPasswords[field],
                          })
                        }
                      >
                        {showPasswords[field] ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
