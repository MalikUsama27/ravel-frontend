import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ setOpenCartSheet }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const updateCartItems = () => {
    // Retrieve cart items from local storage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  };

  useEffect(() => {
    updateCartItems(); // Initial load of cart items
  }, []);

  const totalCartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
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
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total Items</span>
          <span className="font-bold">{totalCartQuantity}</span>
        </div>
        <div className="flex justify-between">
          {/* <span className="font-bold">Total SKU</span> */}
          <span className="font-bold">
            {cartItems.map((item) => item.sku).join(", ")}
          </span>
        </div>
      </div>
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
