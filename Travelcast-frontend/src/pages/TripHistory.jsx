
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


  /* 🔹 Fetch trips */
  useEffect(() => {
    fetch("http://localhost:3000/api/trips/all")
      .then((res) => res.json())
      .then((data) => {
        setTrips(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* 🔹 Delete trip */
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
    // 🔹 Frontend date validation
    if (new Date(editTrip.startDate) > new Date(editTrip.endDate)) {
        alert("Start date cannot be after end date!");
        return;
    }

    setSaving(true); // disable button

    try {
        const res = await fetch(`http://localhost:3000/api/trips/update/${editTrip.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTrip),
        });

        if (!res.ok) {
        throw new Error("Failed to update trip");
        }

        const updated = await res.json();
        setTrips(trips.map((t) => (t.id === updated.id ? updated : t)));
        setShowModal(false);
    } catch (err) {
        console.error(err);
        alert("Failed to update trip. Please try again.");
    } finally {
        setSaving(false); // re-enable button
    }
    };

    /* 🔹 Logout */
    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
    };

  /* 🔹 Weather icon */
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

  /* 🔹 Sidebar Button */
  const SidebarButton = ({ icon, label, onClick, active }) => (
    <button
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = active ? "#dbe7fb" : "#cfe0f7")
      }
      style={{
        ...styles.sideBtn,
        background: active ? "#dbe7fb" : "#cfe0f7",
        fontWeight: active ? "600" : "500",
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
  
/* 🎨 Styles */
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#eef2fb",
    fontFamily: "Arial, sans-serif",
  },

  sidebar: {
    width: "260px",
    background: "#cfe0f7",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  brand: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "35px",
  },

    logo: {
    width: "90px",          // ⬅️ bigger logo
    height: "auto",
    marginBottom: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",    // ⬅️ centers it
},


  brandTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
  },

  brandSub: {
    margin: 0,
    fontSize: "13px",
    color: "#555",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  sideBtn: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 18px",
    borderRadius: "16px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    transition: "background 0.2s ease",
  },

  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 18px",
    borderRadius: "16px",
    border: "none",
    cursor: "pointer",
    background: "#dbe7fb",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },

  main: {
    flex: 1,
    padding: "50px",
  },

  /* 🔥 Bigger & Bold title */
  pageTitle: {
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  pageSub: {
    fontSize: "16px",
    color: "#444",
    marginBottom: "30px",
  },

  empty: {
    fontSize: "16px",
    marginTop: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "18px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  weather: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  cardInfo: {
    display: "flex",
    gap: "20px",
    marginTop: "10px",
    fontSize: "14px",
  },

  note: {
    marginTop: "10px",
    color: "#444",
  },

  actions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    marginTop: "15px",
  },

  editBtn: {
    background: "#eef2fb",
    border: "none",
    padding: "8px 14px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ffecec",
    border: "none",
    padding: "8px 10px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#d11a2a",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    width: "360px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
};

  return (
    <div style={styles.container}>
      {/* 🔹 Sidebar */}
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.brand}>
            <img
              src="/logo.png"
              alt="Travel Cast"
              style={styles.logo}
            />
          </div>

          <div style={styles.menu}>
            <SidebarButton
              icon={<FiHome />}
              label="Home"
              onClick={() => navigate("/userdashboard")}
            />
            <SidebarButton
              icon={<FiPlus />}
              label="Create New Trip"
              onClick={() => navigate("/createTrip")}
            />
            <SidebarButton
              icon={<FiList />}
              label="Packing List"
              onClick={() => navigate("/packing")}
            />
             <SidebarButton
              icon={<FiEdit />}
              label="Trip History"
              active={true}
            />
            <SidebarButton
              icon={<FiBell />}
              label="Subscription"
              onClick={() => navigate("/subscription")}
            />
            <SidebarButton
              icon={<FiSettings />}
              label="Settings"
              onClick={() => navigate("/settings")}
            />
          </div>
        </div>

        <button
          style={styles.logoutBtn}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#dbe7fb")
          }
          onClick={handleLogout}
        >
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* 🔹 Main Content */}
      <main style={styles.main}>
        <h1 style={styles.pageTitle}>Trip History</h1>
        <p style={styles.pageSub}>Your past adventures at a glance.</p>

        {loading ? (
          <p>Loading trips...</p>
        ) : trips.length === 0 ? (
          <p style={styles.empty}>No trips found.</p>
        ) : (
          trips.map((trip) => (
            <div key={trip.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3>{trip.name}</h3>

                <div style={styles.weather}>
                  {getWeatherIcon(trip.weather)}
                  <span>{trip.weather}</span>
                </div>
              </div>

              <div style={styles.cardInfo}>
                <span>
                  {trip.startDate} → {trip.endDate}
                </span>
                <span>{trip.travelers} Travelers</span>
              </div>
              <p>📍 {trip.destination}</p>

              <p style={styles.note}>{trip.note || "No notes added."}</p>

              <div style={styles.actions}>
                <button
                  style={styles.editBtn}
                  onClick={() => openEditModal(trip)}
                >
                  <FiEdit /> Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(trip.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      {/* 🔹 Edit Modal */}
      {showModal && editTrip && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit Trip</h3>

            <input
              style={styles.input}
              value={editTrip.name}
              onChange={(e) =>
                setEditTrip({ ...editTrip, name: e.target.value })
              }
            />

            <input
              style={styles.input}
              type="date"
              value={editTrip.startDate}
              onChange={(e) =>
                setEditTrip({ ...editTrip, startDate: e.target.value })
              }
            />

            <input
              style={styles.input}
              type="date"
              value={editTrip.endDate}
              onChange={(e) =>
                setEditTrip({ ...editTrip, endDate: e.target.value })
              }
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripHistory;