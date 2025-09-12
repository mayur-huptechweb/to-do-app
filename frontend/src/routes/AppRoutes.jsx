import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import App from "@/pages/App";
import { Toaster } from "sonner";

function AppRoutes() {
  return (
    <Router>
      <Toaster position="top-right" richColors duration={4000} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
