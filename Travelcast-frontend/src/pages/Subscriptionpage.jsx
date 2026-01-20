import React from "react";

export default function Subscriptionpage() {
  const handleSubscribe = (planName) => {
    alert(`${planName} subscription plan done`);
  };

  const styles = {
    container: {
      height: "100vh",
      width: "100%",
      background: "url('background.png') no-repeat center/cover",
      padding: "40px",
      fontFamily: "Arial, sans-serif",
      color: "#000",
    },

    title: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "30px",
    },

    plansWrapper: {
      display: "flex",
      gap: "40px",
      marginTop: "20px",
    },

    card: {
      width: "250px",
      padding: "30px",
      border: "1px solid black",
      background: "rgba(255, 255, 255, 0.4)",
      backdropFilter: "blur(4px)",
    },

    planTitle: {
      fontSize: "22px",
      fontWeight: "700",
      marginBottom: "10px",
    },

    price: {
      fontSize: "20px",
      fontWeight: "700",
      marginBottom: "20px",
    },

    features: {
      listStyle: "none",
      padding: 0,
      marginBottom: "25px",
      color: "rgb(34, 90, 160)",
      fontSize: "14px",
    },

    btn: {
      width: "100%",
      padding: "10px",
      border: "1px solid #333",
      background: "transparent",
      cursor: "pointer",
      fontSize: "15px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>The best plan for you!!</h1>

      <div style={styles.plansWrapper}>

        <div style={styles.card}>
          <div style={styles.planTitle}>Basic</div>
          <div style={styles.price}>NPR<br />200/mo</div>

          <ul style={styles.features}>
            <li>- Weather forecast updates</li>
            <li>- Basic travel tips</li>
          </ul>

          <button
            style={styles.btn}
            onClick={() => handleSubscribe("Basic")}
          >
            Subscribe
          </button>
        </div>

        <div style={styles.card}>
          <div style={styles.planTitle}>Standard</div>
          <div style={styles.price}>NPR<br />400/mo</div>

          <ul style={styles.features}>
            <li>- Advanced weather insights</li>
            <li>- Personalized travel suggestions</li>
          </ul>

          <button
            style={styles.btn}
            onClick={() => handleSubscribe("Standard")}
          >
            Subscribe
          </button>
        </div>

        <div style={styles.card}>
          <div style={styles.planTitle}>Premium</div>
          <div style={styles.price}>NPR<br />700/mo</div>

          <ul style={styles.features}>
            <li>- Real-time weather alerts</li>
            <li>- Full travel planner integration</li>
            <li>- 24/7 support</li>
          </ul>

          <button
            style={styles.btn}
            onClick={() => handleSubscribe("Premium")}
          >
            Subscribe
          </button>
        </div>

      </div>
    </div>
  );
}
