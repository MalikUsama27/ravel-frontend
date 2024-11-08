import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // If there's no user in localStorage, redirect to the login page
  if (!user) {
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/auth/login" />;
    } else {
      return <>{children}</>; // Let normal users access shop routes
    }
  }

  // If the user is authenticated but not an admin, redirect them to the shop routes
  if (user.role !== "admin" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/shop/home" />;
  }

  // If the user is an admin and tries to access shop routes, redirect them to the admin dashboard
  if (user.role === "admin" && location.pathname.startsWith("/shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Allow access to the requested route if the conditions above are not met
  return <>{children}</>;
}

export default CheckAuth;
