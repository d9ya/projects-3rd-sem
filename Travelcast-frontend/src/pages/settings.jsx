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

// Sidebar Item Component
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

  const [profile, setProfile] = useState({ fullName: "", email: "" });
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
  const [fetchError, setFetchError] = useState("");

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await getProfileApi();
        if (res.data.success) {
          setProfile({
            fullName: res.data.data.fullName,
            email: res.data.data.email,
          });
        } else {
          setFetchError(res.data.message || "Failed to fetch profile");
        }
      } catch (err) {
        console.error(err);
        setFetchError("Unable to fetch profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle Profile Submit
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError("");

    try {
      const res = await updateProfileApi(profile);
      if (res.data.success) {
        toast.success("Profile updated successfully!");
      } else {
        setProfileError(res.data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error updating profile");
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle Password Submit
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
      const res = await changePasswordApi(passwordForm);
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
      console.error(err);
      toast.error(err.response?.data?.message || "Server error. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#e3e7f6ff]">
      {/* Sidebar */}
      <div className="w-[250px] bg-[rgb(184,211,240)] p-6 flex flex-col">
        <div className="mb-10">
          <h2 className="text-xl font-semibold">Travel Cast</h2>
          <p className="text-xs">Your Journey Starts</p>
        </div>

        <div className="flex-1 space-y-3">
          <SidebarItem icon={<BiHome />} label="Home" onClick={() => navigate("/userdashboard")} />
          <SidebarItem icon={<BiPlus />} label="Create New Trip" onClick={() => navigate("/createTrip")} />
          <SidebarItem icon={<BiListCheck />} label="Packing List" onClick={() => navigate("/packing")} />
          <SidebarItem icon={<BiHistory />} label="Trip History" onClick={() => navigate("/tripHistory")} />
          <SidebarItem icon={<BiBell />} label="Subscription" onClick={() => navigate("/subscription")} />
          <SidebarItem icon={<BiCog />} label="Settings" onClick={() => setActiveTab("profile")} active={true} />
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

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[900px] mx-auto mt-6 font-sans">
          <div className="bg-white p-5 rounded-lg mb-6 shadow-sm">
            <h1 className="text-[28px] font-semibold mb-1">Profile Settings</h1>
            <p className="text-gray-600">Manage your account</p>
          </div>

          {fetchError && <p className="text-red-600 mb-4 text-center">{fetchError}</p>}

          <div className="flex gap-6 mb-8 border-b border-gray-200">
            <button
              className={`pb-2 text-[15px] font-medium transition ${
                activeTab === "profile"
                  ? "text-black border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-black"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>

            <button
              className={`pb-2 text-[15px] font-medium transition ${
                activeTab === "password"
                  ? "text-black border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-black"
              }`}
              onClick={() => setActiveTab("password")}
            >
              Password
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
              <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    name="fullName"
                    placeholder="Full Name"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                  />
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    name="email"
                    placeholder="Email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>

                {profileError && <p className="text-red-600 mb-3">{profileError}</p>}

                <button className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition">
                  {profileLoading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === "password" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
              {passwordError && <p className="text-red-600 mb-3">{passwordError}</p>}

              <form onSubmit={handlePasswordSubmit}>
                {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
                  <div key={field} className="relative mb-5">
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                      type={showPasswords[field] ? "text" : "password"}
                      placeholder={field}
                      value={passwordForm[field]}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, [field]: e.target.value })
                      }
                    />
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() =>
                        setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] })
                      }
                    >
                      {showPasswords[field] ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                ))}

                <button className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition">
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
