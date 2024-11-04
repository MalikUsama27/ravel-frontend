import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  const handleMouseEnter = () => {
    setZoomStyle({ display: 'block' });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleMouseMove = (e) => {
    const img = e.target;
    const { offsetX, offsetY } = e.nativeEvent;
    const { clientWidth, clientHeight } = img;

    const x = (offsetX / clientWidth) * 100;
    const y = (offsetY / clientHeight) * 100;

    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${productDetails?.image})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '300%',
      width: '300px',
      height: '300px',
      position: 'absolute',
      borderRadius: '50%',
      border: '2px solid rgba(255, 255, 255, 0.7)',
      pointerEvents: 'none',
      zIndex: 10,
      top: `${offsetY}px`,
      left: `${offsetX}px`,
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    });
  };

  const handleAddToCart = (productId, totalStock) => {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === productId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > totalStock) {
          toast({
            title: `Only ${totalStock} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(addToCart({ productId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product added to cart", variant: "success" });
      }
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({ title: "Review added successfully!", variant: "success" });
      }
    });
  };

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg image-container">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          />
          <div style={zoomStyle}></div>
        </div>
        <div className="flex flex-col  ">
  <h1 className="text-3xl font-extrabold text-gray-900 mt-9">{productDetails?.title}</h1> {/* Added mt-6 for top margin */}
  <p className="text-gray-700 text-xl mb-5 mt-4">{productDetails?.description}</p>
  <p className="text-gray-700 text-xl mb-5 mt-4">{productDetails?.price}</p>
  
  {/* Review section can be added here if needed */}
</div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
