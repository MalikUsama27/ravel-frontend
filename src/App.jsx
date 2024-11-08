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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
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
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Check if the user is loading or data is still being fetched
  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  // Get user role from localStorage
  const role = localStorage.getItem("role");

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            // If not authenticated or user is not admin, redirect to /unauth-page
            !isAuthenticated || role !== "admin" ? (
              <Navigate to="/unauth-page" />
            ) : (
              <AdminLayout />
            )
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="category" element={<AdminCategory />} />
        </Route>

        <Route
          path="/shop"
          element={
            <ShoppingLayout />
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="about-us" element={<Aboutus />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="r&d" element={<RandD />} />
          <Route path="category/ca" element={<CategoriesAndProducts />}>
            <Route path=":id" element={<Products />} />
          </Route>
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
