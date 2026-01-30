import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiLogOut, FiSettings, FiPlus, FiHome, FiBell, FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from "react-icons/wi";
 
const TripHistory = () => {
  const navigate = useNavigate();
 
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTrip, setEditTrip] = useState(null);
  const [saving, setSaving] = useState(false);
 
  useEffect(() => {
    fetch("http://localhost:3000/api/trips/all")
      .then((res) => res.json())
      .then((data) => {
        setTrips(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
 
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trip permanently?")) return;
 
    try {
      const res = await fetch(
        `http://localhost:3000/api/trips/delete/${id}`,
        { method: "DELETE" }
      );
 
      if (!res.ok) {
        alert("Delete failed");
        return;
      }
 
      setTrips((prev) => prev.filter((trip) => trip.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong");
    }
  };
 
  const handleUpdate = async () => {
    if (new Date(editTrip.startDate) > new Date(editTrip.endDate)) {
      alert("Start date cannot be after end date!");
      return;
    }
 
    setSaving(true);
 
    try {
      const res = await fetch(`http://localhost:3000/api/trips/update/${editTrip.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTrip),
      });
 
      if (!res.ok) throw new Error("Failed to update trip");
 
      const updated = await res.json();
      setTrips(trips.map((t) => (t.id === updated.id ? updated : t)));
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update trip. Please try again.");
    } finally {
      setSaving(false);
    }
  };
 
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };
 
  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return <WiDaySunny size={26} />;
      case "Rain":
        return <WiRain size={26} />;
      case "Snow":
        return <WiSnow size={26} />;
      default:
        return <WiCloudy size={26} />;
    }
  };
 
  const SidebarButton = ({ icon, label, onClick, active }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium shadow-md transition-colors duration-200
        ${active ? "bg-blue-200 font-semibold" : "bg-blue-100 hover:bg-white"}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
 
  const openEditModal = (trip) => {
    setEditTrip(trip);
    setShowModal(true);
  };
 
  return (
    <div className="flex h-screen bg-blue-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-100 p-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-center mb-8">
            <img src="/logo.png" alt="Travel Cast" className="w-24 h-auto mx-auto mb-5" />
          </div>
 
          <div className="flex flex-col gap-4">
            <SidebarButton icon={<FiHome />} label="Home" onClick={() => navigate("/userdashboard")} />
            <SidebarButton icon={<FiPlus />} label="Create New Trip" onClick={() => navigate("/createTrip")} />
            <SidebarButton icon={<FiList />} label="Packing List" onClick={() => navigate("/packing")} />
            <SidebarButton icon={<FiEdit />} label="Trip History" active />
            <SidebarButton icon={<FiBell />} label="Subscription" onClick={() => navigate("/subscription")} />
            <SidebarButton icon={<FiSettings />} label="Settings" onClick={() => navigate("/settings")} />
          </div>
        </div>
 
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold bg-blue-200 shadow-md hover:bg-white transition-colors duration-200"
        >
          <FiLogOut /> Logout
        </button>
      </aside>
 
      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <h1 className="text-4xl font-extrabold mb-2">Trip History</h1>
        <p className="text-gray-700 mb-8">Your past adventures at a glance.</p>
 
        {loading ? (
          <p>Loading trips...</p>
        ) : trips.length === 0 ? (
          <p className="text-gray-700 mt-5">No trips found.</p>
        ) : (
          trips.map((trip) => (
            <div key={trip.id} className="bg-white p-5 rounded-xl mb-5 shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{trip.name}</h3>
                <div className="flex items-center gap-2">
                  {getWeatherIcon(trip.weather)}
                  <span>{trip.weather}</span>
                </div>
              </div>
 
              <div className="flex gap-5 mt-2 text-sm">
                <span>{trip.startDate} → {trip.endDate}</span>
                <span>{trip.travelers} Travelers</span>
              </div>
 
              <p className="mt-2">📍 {trip.destination}</p>
              <p className="mt-2 text-gray-700">{trip.note || "No notes added."}</p>
 
              <div className="flex gap-3 justify-end mt-3">
                <button
                  className="bg-blue-50 px-3 py-2 rounded-lg flex items-center gap-1"
                  onClick={() => openEditModal(trip)}
                >
                  <FiEdit /> Edit
                </button>
                <button
                  className="bg-red-100 text-red-700 px-3 py-2 rounded-lg flex items-center gap-1"
                  onClick={() => handleDelete(trip.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </main>
 
      {/* Edit Modal */}
      {showModal && editTrip && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-80">
            <h3 className="text-lg font-semibold mb-3">Edit Trip</h3>
 
            <input
              type="text"
              className="w-full p-2 mb-3 rounded border border-gray-300"
              value={editTrip.name}
              onChange={(e) => setEditTrip({ ...editTrip, name: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 mb-3 rounded border border-gray-300"
              value={editTrip.startDate}
              onChange={(e) => setEditTrip({ ...editTrip, startDate: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 mb-3 rounded border border-gray-300"
              value={editTrip.endDate}
              onChange={(e) => setEditTrip({ ...editTrip, endDate: e.target.value })}
            />
 
            <div className="flex gap-2 justify-end">
              <button
                className="px-3 py-2 bg-blue-200 rounded hover:bg-blue-300"
                onClick={handleUpdate}
                disabled={saving}
              >
                Save
              </button>
              <button
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default TripHistory;