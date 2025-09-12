import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import App from "@/pages/App";
import NotFound from "@/pages/404";
import { Toaster } from "sonner";

function AppRoutes() {
  return (
    <Router>
      <Toaster position="top-right" richColors duration={4000} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<App />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
