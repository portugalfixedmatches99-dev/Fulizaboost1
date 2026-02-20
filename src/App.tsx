import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PersonalDetails from "./pages/PersonalDetails";
import Confirmation from "./pages/Confirmation";
import Success from "./pages/Success";
import AdminDashboard from "./pages/AdminDashboard";
import HomeLogin from "./pages/Login";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // shows spinner before app renders

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }
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
