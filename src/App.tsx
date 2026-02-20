import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PersonalDetails from "./pages/PersonalDetails";
import Confirmation from "./pages/Confirmation";
import Success from "./pages/Success";
import AdminDashboard from "./pages/AdminDashboard";
import HomeLogin from "./pages/Login";
import safImage from "./assets/saf1.png";

function App() {
  console.log("Image path:", safImage);
  return (
    <>
      <div style={{
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${safImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',  // ← this makes it fill the whole background
  opacity: 0.15,
  pointerEvents: 'none',
  zIndex: 0,
}} />

      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<HomeLogin />} />
      </Routes>
    </>
  );
}

export default App;
