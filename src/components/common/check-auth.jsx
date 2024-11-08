import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, role, children }) {
  const location = useLocation();

  // If the user is trying to access the root path ("/")
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/shop/home" />;
    } else {
      if (role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // If the user is not authenticated and trying to access a page other than login/register
  if (!isAuthenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth/login" />;
  }

  // If the user is authenticated and trying to access login/register, redirect to their role-based page
  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // If authenticated and trying to access admin routes without being an admin
  if (isAuthenticated && role !== "admin" && location.pathname.includes("/admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // If an admin is trying to access shop routes, redirect to the admin dashboard
  if (isAuthenticated && role === "admin" && location.pathname.includes("/shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
