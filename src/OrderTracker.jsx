import React, { useState } from "react";

const OrderTracker = () => {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrack = async () => {
    if (!orderId) return;

    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch(`https://example.com/api/orders/${orderId}`);
      
      if (!response.ok) {
        throw new Error("Order not found");
      }

      const data = await response.json();
      setStatus(data.status);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📦 Order Tracker</h2>

      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleTrack} disabled={loading} style={styles.button}>
        {loading ? "Tracking..." : "Track Order"}
      </button>

      {status && (
        <div style={{ ...styles.card, ...styles.statusCard }}>
          ✅ Status: {status}
        </div>
      )}
      {error && (
        <div style={{ ...styles.card, ...styles.errorCard }}>
          ❌ {error}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "'Montserrat', sans-serif",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  card: {
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontSize: "16px",
    marginBottom: "10px",
  },
  statusCard: {
    backgroundColor: "#e0f7e9",
    color: "#2e7d32",
  },
  errorCard: {
    backgroundColor: "#fdecea",
    color: "#c62828",
  },
};

export default OrderTracker;

