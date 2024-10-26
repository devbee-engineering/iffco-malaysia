import { Navigate, Outlet } from "react-router-dom";
import { IsAuthenticated, IsMfaOtpVerified } from "./Services/auth";

const ProtectedRoutes = () => {
  if (!IsAuthenticated()) {
    window.alert("You are not authenticated. Please sign in.");
    return <Navigate to="/" />;
  }

    if (IsMfaOtpVerified()) {
        return <Navigate to="/veryfy-otp" />;
    }
  return <Outlet />;
};

export default ProtectedRoutes;
