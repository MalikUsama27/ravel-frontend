import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ setOpenCartSheet }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Function to update cart items from localStorage
  const updateCartItems = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  };

  // Listen for changes in localStorage across tabs and update the cart
  useEffect(() => {
    // Initial load of cart items
    updateCartItems();

    // Add event listener for 'storage' event to update cart on localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        updateCartItems();
      }
    };

    // Continuously check for changes every 500ms
    const intervalId = setInterval(updateCartItems, 500);

    // Add event listener to sync cart across tabs
    window.addEventListener("storage", handleStorageChange);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);  // Clear the interval
      window.removeEventListener("storage", handleStorageChange);  // Remove the event listener
    };
  }, []);

  // Calculate the total quantity of items in the cart
  const totalCartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SheetContent className="sm:max-w-md h-full overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      {/* Cart Items Section */}
      <div className="mt-8 space-y-4 overflow-y-auto max-h-72">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent
              key={item.productId}
              cartItem={item}
              onUpdateCart={updateCartItems} // Update the cart items when changed
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Cart Summary Section */}
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total Items</span>
          <span className="font-bold">{totalCartQuantity}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6 bg-black rounded-2xl"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
