import { Trash } from "lucide-react";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem, onUpdateCart }) {
  const { toast } = useToast();

  const handleCartItemDelete = (getCartItem) => {
    // Retrieve current cart from local storage
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Filter out the deleted item
    const updatedCart = currentCart.filter(item => item.productId !== getCartItem.productId);
    
    // Update local storage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    toast({
      title: "Cart item deleted successfully",
    });

    // Trigger an update in the parent component
    if (onUpdateCart) {
      onUpdateCart(); // Call to refresh the cart items in the parent
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.img}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          SKU-{((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
