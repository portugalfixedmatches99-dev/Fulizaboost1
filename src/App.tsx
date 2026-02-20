import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PersonalDetails from "./pages/PersonalDetails";
import Confirmation from "./pages/Confirmation";
import Success from "./pages/Success";
import AdminDashboard from "./pages/AdminDashboard";
import HomeLogin from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/personal-details" element={<PersonalDetails />} />
       <Route path="/confirmation" element={<Confirmation />} />
       <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<AdminDashboard />} />
         <Route path="/login" element={<HomeLogin />} />
    </Routes>
  );
}

export default App;
