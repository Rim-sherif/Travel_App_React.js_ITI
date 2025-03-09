import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function AdminRoute({ children }) {
  const { userToken } = useContext(UserContext);

  // If no token is present, redirect to login
  if (!userToken) {
    return <Navigate to="/login" />;
  }

  // Check if the user role is 'admin' in localStorage
  const userRole = localStorage.getItem("userRole");

  // If role is not 'admin', redirect to the home page
  if (userRole !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
