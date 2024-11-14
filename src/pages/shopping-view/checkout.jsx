import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

function ShoppingCheckout() {
  const [cartItems, setCartItems] = useState([]);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);

    // Fetch the stored address from local storage
    const storedAddress = JSON.parse(localStorage.getItem("addresses")); 
    if (storedAddress) {
      setCurrentSelectedAddress(storedAddress);
    } 
  }, []);

  const totalCartAmount = cartItems.reduce(
    (sum, currentItem) =>
      sum + (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      cartItems,
      address: currentSelectedAddress,
    };

    console.log("Payload being sent:", payload); 

    try {
      const response = await axios.post('https://ravel-be.vercel.app/api/shop/order/create', payload);
      console.log("Response from API:", response.data); 
      if (response.status === 201) {
        toast({
          title: "Checkout successful!",
          description: "Your order has been placed.",
        });
        localStorage.removeItem("cart");
        setCartItems([]);
        setCurrentSelectedAddress(null);
      }
    } catch (error) {
      console.error("API error:", error.response?.data); 
      toast({
        title: "Error during checkout.",
        description: error.response?.data?.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" alt="Checkout" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} onUpdateCart={() => setCartItems(JSON.parse(localStorage.getItem("cart")) || [])} />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="mt-4 w-full">
            <Button onClick={handleCheckout} className="w-full bg-black border">
              CHECK OUT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
