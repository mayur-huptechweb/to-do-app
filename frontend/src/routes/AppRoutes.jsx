import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import App from "@/pages/App";
import NotFound from "@/pages/404";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import PrivateRoute from "@/routes/PrivateRoute";
import PublicRoute from "@/routes/PublicRoute"; 

function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" richColors duration={4000} />

        <Routes>
          {/* Public Routes (redirects if logged in) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;
