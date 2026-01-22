import React, { useState } from "react";
import { FiSettings, FiLogOut } from "react-icons/fi";

const CreateTrip = () => {
  const [trip, setTrip] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const increase = () =>
    setTrip({ ...trip, travelers: trip.travelers + 1 });

  const decrease = () =>
    trip.travelers > 1 &&
    setTrip({ ...trip, travelers: trip.travelers - 1 });

  const handleSubmit = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/trips/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trip),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Trip saved successfully ");

      setTrip({
        name: "",
        destination: "",
        startDate: "",
        endDate: "",
        travelers: 1,
        note: "",
      });

      console.log("Saved trip:", data);
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Submit error:", error);
    alert("Backend not responding ❌");
  }
};


  const styles = {
    container: {
      display: "flex",
      height: "110vh",
      background: "#eef2fb",
      fontFamily: "Arial, sans-serif",
    },

    /* Sidebar */
    sidebar: {
      width: "230px",
      background: "#c9d6f1",
      padding: "25px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height:"110vh",
    },

    logo: {
      fontSize: "20px",
      fontWeight: "600",
       marginLeft: "20px",
    },

    logoImg: {
      width: "120px",
      marginTop: "15px",
       marginLeft: "20px",
    },

    menu: {
      marginTop: "40px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    },

    menuBtn: {
      background: "none",
      border: "none",
      fontSize: "14px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "6px 0",
    },

    logoutBtn: {
      background: "#4f5bd5",
      color: "#fff",
      border: "none",
      borderRadius: "22px",
      padding: "12px",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },

    /* Main */
    content: {
      flex: 1,
      padding: "35px 50px",
    },
    topBarTitle: {
      fontSize: "22px",
      fontWeight: "700",
      margin: 0,
    },

    subtitle: {
      color: "#666",
      marginBottom: "25px",
    },

    card: {
    background: "#fff",
    padding: "30px",
    paddingBottom: "90px",   
    borderRadius: "14px",
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    position: "relative",  
    height:"90vh",
    },

// Form Elements
    label: {
      fontSize: "14px",
      marginBottom: "6px",
      display: "block",
    },

    input: {
      width: "100%",
      padding: "12px",
      background: "#f1f1f1",
      border: "none",
      borderRadius: "8px",
      marginBottom: "15px",
    },

    row: {
      display: "flex",
      gap: "20px",
    },

    travelerBox: {
      flex: 1,
    },

    counter: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      background: "#f1f1f1",
      padding: "10px",
      borderRadius: "8px",
      marginTop: "8px",
    },

    counterBtn: {
      background: "#ddd",
      border: "none",
      borderRadius: "6px",
      padding: "4px 10px",
      cursor: "pointer",
    },

    mapBox: {
      marginTop: "20px",
      width: "50%",
    },

    map: {
      width: "100%",
      height: "200px",
      border: "none",
      borderRadius: "10px",
    },

    saveBtnWrapper: {
    position: "absolute",  
    bottom: "25px",
    right: "30px",
    },


    saveBtn: {
      background: "#4f5bd5",
      color: "#fff",
      padding: "14px 36px",
      border: "none",
      borderRadius: "30px",
      fontSize: "16px",
      cursor: "pointer",
    },
    profileTopRight: {
    position: "fixed",
    top: "20px",
    right: "30px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    zIndex: 1000,
    },

    avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    objectFit: "cover",
    },

    profileName: {
    fontSize: "14px",
    fontWeight: "500",
    },

  };

  return (
    <div style={styles.container}>
            {/* Profile - Top Right */}
    <div style={styles.profileTopRight}>
      <span style={styles.profileName}>Diya</span>
      <img
        src="/profile.png"
        alt="profile"
        style={styles.avatar}
      />
    </div>

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div>

          <img src="/logo.png" alt="logo" style={styles.logoImg} />

          <div style={styles.menu}>
            <button style={styles.menuBtn}>
              <FiSettings /> Settings
            </button>
          </div>
        </div>

        <button style={styles.logoutBtn}>
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Main */}
      <main style={styles.content}>
        <div style={{ maxWidth: styles.card.maxWidth, margin: "0 auto 20px auto" }}>
        <h1 style={styles.topBarTitle}>Create Your Trip</h1>
        <p style={styles.subtitle}>Plan smarter with weather insights</p>
        </div>


        <div style={styles.card}>
          <h3>Trip Essentials</h3>

          <label style={styles.label}>Trip name</label>
          <input
            style={styles.input}
            name="name"
            value={trip.name}
            onChange={handleChange}
          />

          <div style={styles.row}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Destination</label>
              <select
                style={styles.input}
                name="destination"
                value={trip.destination}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Kathmandu</option>
                <option>Pokhara</option>
                <option>Chitwan</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={styles.label}>Start Date</label>
              <input
                style={styles.input}
                type="date"
                name="startDate"
                value={trip.startDate}
                onChange={handleChange}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={styles.label}>End Date</label>
              <input
                style={styles.input}
                type="date"
                name="endDate"
                value={trip.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.travelerBox}>
              <label style={styles.label}>Number of travelers</label>
              <div style={styles.counter}>
                <button style={styles.counterBtn} onClick={decrease}>-</button>
                <span>{trip.travelers}</span>
                <button style={styles.counterBtn} onClick={increase}>+</button>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <label style={styles.label}>Note</label>
              <input
                style={styles.input}
                name="note"
                value={trip.note}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={styles.mapBox}>
            <p>Google map & Weather</p>
          </div>

          <div style={styles.saveBtnWrapper}>
            <button style={styles.saveBtn} onClick={handleSubmit}>
              Save Trip
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTrip;
