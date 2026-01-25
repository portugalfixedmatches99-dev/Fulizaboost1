import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PersonalDetails from "./pages/PersonalDetails";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/personal-details" element={<PersonalDetails />} />
       <Route path="/confirmation" element={<Confirmation />} />
    </Routes>
  );
}

export default App;
