import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
<nav className="flex flex-col mt-[10px] lg:mb-2 lg:items-center gap-6 lg:flex-row bg-transparent text-center">
  {shoppingViewHeaderMenuItems.map((menuItem) => (
    <Label
      onClick={() => handleNavigate(menuItem)}
      className="text-sm font-medium cursor-pointer"
      key={menuItem.id}
    >
      {menuItem.label}
    </Label>
  ))}
</nav>

  );
}

function HeaderRightContent() {
  const navigate = useNavigate(); // Initialize the navigate function
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  // Function to update cart items from localStorage
  const updateCartItems = () => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  };

  useEffect(() => {
    updateCartItems(); // Initial load of cart items

    // Check localStorage every 500ms for changes
    const intervalId = setInterval(updateCartItems, 500);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Navigate to checkout when cart is clicked
  const handleNavigateToCheckout = () => {
    navigate("/shop/checkout"); // Navigate to checkout page
  };

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* Cart Button */}
      

      {/* Add an onClick handler to navigate to checkout */}
      <div  >
<Sheet 
// open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}
>
        <Button onClick={handleNavigateToCheckout}
          // onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems.length || 0}
          </span>
          {/* <span className="sr-only">User cart</span> */}
        </Button>
        {/* <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems.length > 0 ? cartItems : []}
        /> */}
      </Sheet>
      </div>
    </div>
  );
}




function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 items-center self-center w-11/12 bg-transparent">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 bg-transparent">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Revel</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block" onClick={() => {
          navigate("/shop/checkout");
          // setOpenCartSheet(false);
        }}>
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
