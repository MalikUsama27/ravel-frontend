import { Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminCategory from "./pages/admin-view/category";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import Products from "./pages/shopping-view/Products";
import CategoriesAndProducts from "./pages/shopping-view/CategoriesAndProducts";
import Aboutus from "./pages/shopping-view/Aboutus";
import ContactUs from "./pages/shopping-view/ContactUs";
import RandD from "./pages/shopping-view/RandD";

function App() {
  // Initialize states from localStorage
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user); // If user is null, set it to false
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If user exists in localStorage, update the state
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Root Route Redirect */}
        <Route path="/" element={<Navigate to="/shop/home" replace />} />

        {/* Auth Routes (Accessible to anyone) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin Routes (Requires Authentication) */}
        <Route
          path="/admin"
          element={
            isAuthenticated && user?.role === "admin" ? (
              <AdminLayout />
            ) : (
              <Navigate to="/unauth-page" />
            )
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="category" element={<AdminCategory />} />
        </Route>

        {/* Shop Routes (Accessible to anyone) */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="about-us" element={<Aboutus />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="r&d" element={<RandD />} />
          <Route path="category/ca" element={<CategoriesAndProducts />} >
            <Route path=":id" element={<Products />} />
          </Route>
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        {/* Unauthenticated page */}
        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
