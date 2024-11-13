import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
import AllCategory from "./pages/shopping-view/AllCategory";

function App() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation(); // Get current location

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Update the document title based on the current route
  useEffect(() => {
    const path = location.pathname.split('/')[2]; // Get the second part of the path
    let title = "REVEL"; // Default title

    if (path === 'about-us') {
      title = "Revel - About Us";
    } else if (path === 'category') {
      title = "Revel - Categories";
    } else if (path === 'contact-us') {
      title = "Revel - Contact Us";
    } else if (path === 'home') {
      title = "Revel - Home";
    } else if (path === 'search') {
      title = "Revel - Search";
    } else {
      title = "Revel"; // Fallback title
    }

    document.title = title; // Update the document title
  }, [location]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  // Retrieve the full user object from localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Assuming "user" is the key

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<Navigate to="/shop/home" />} />

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="category" element={<AdminCategory />} />
        </Route>

        {/* Shop routes */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="about-us" element={<Aboutus />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="category" element={<AllCategory />} />

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

        {/* Unauthorized page */}
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
