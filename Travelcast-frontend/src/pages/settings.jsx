import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
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
    className={`flex items-center gap-4 w-full h-[52px] px-5 rounded-xl transition
      ${active ? "bg-white shadow-md" : "hover:bg-white shadow-sm"}`}
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
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileApi();
        if (res.data.success) {
          setProfile(res.data.data);
        }
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError("");

    try {
      const res = await updateProfileApi(profile);
      if (res.data.success) {
        toast.success("Profile updated successfully!");
      } else {
        setProfileError(res.data.message);
      }
    } catch {
      toast.error("Server error updating profile");
    } finally {
      setProfileLoading(false);
    }
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      setPasswordLoading(false);
      return;
    }

    try {
      const res = await changePasswordApi({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });

      if (res.data.success) {
        toast.success("Password changed successfully!");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(res.data.message || "Failed to change password");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-[#e3e7f6ff]">
      {/* SIDEBAR */}
      <div className="w-[250px] bg-[rgb(184,211,240)] p-6 flex flex-col">
        <div className="mb-10">
          <h2 className="text-xl font-semibold">Travel Cast</h2>
          <p className="text-xs">Your Journey Starts</p>
        </div>

        <div className="flex-1 space-y-3">
          <SidebarItem icon={<BiHome />} label="Home" onClick={() => navigate("/userdashboard")} />
          <SidebarItem icon={<BiPlus />} label="Create New Trip" />
          <SidebarItem icon={<BiListCheck />} label="Packing List" />
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

      {/* MAIN */}
      <div className="flex-1 p-8 overflow-y-auto">
        <style>{css}</style>

        <div className="settings-page">
          <div className="settings-header bg-white p-5 rounded-lg mb-6">
            <h1>Profile Settings</h1>
            <p>Manage your account</p>
          </div>

          <div className="tabs">
            <button className={`tab ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
              Profile
            </button>
            <button className={`tab ${activeTab === "password" ? "active" : ""}`} onClick={() => setActiveTab("password")}>
              Password
            </button>
          </div>

          {activeTab === "profile" && (
            <div className="card">
              <form onSubmit={handleProfileSubmit}>
                <div className="form-grid">
                  <input name="fullName" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} />
                  <input name="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                  <input name="phoneNumber" value={profile.phoneNumber} onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })} />
                </div>
                <button className="primary-btn">{profileLoading ? "Saving..." : "Save Changes"}</button>
              </form>
            </div>
          )}

          {activeTab === "password" && (
            <div className="card">
              {passwordError && <p className="text-red-600 mb-3">{passwordError}</p>}
              <form onSubmit={handlePasswordSubmit}>
                {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
                  <div key={field} style={{ position: "relative", marginBottom: 20 }}>
                    <input
                      type={showPasswords[field] ? "text" : "password"}
                      placeholder={field}
                      value={passwordForm[field]}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, [field]: e.target.value })
                      }
                    />
                    <span
                      className="password-icon"
                      onClick={() =>
                        setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] })
                      }
                    >
                      {showPasswords[field] ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                ))}
                <button className="primary-btn">
                  {passwordLoading ? "Updating..." : "Update Password"}
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