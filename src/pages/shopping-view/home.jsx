import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

import View from "./view";
import ViewTwo from "./ViewTwo";
import AllCategory from "./AllCategory";

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }


  const handleAddtoCart = (productId) => {
    const product = productList.find((item) => item._id === productId);

    if (product) {
      const cartItem = {
        productId: product._id,
        img:product?.image,
        title: product?.title,
        price: product?.price,
        quantity: 1,
      };

      const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = currentCart.find(item => item.productId === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        currentCart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(currentCart));

      toast({
        title: "Product added to cart!",
      });
    }
  };
  
  

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);
  const features = [
    {
      imgSrc: 'https://wear-international.com/wp-content/uploads/2022/11/icons8-us-dollar-circled-64.png',
      title: 'Best PRICE',
      subtitle: 'GUARANTEE',
      description: "If we can't beat the market price, we'll match it.",
    },
    {
      imgSrc: 'https://wear-international.com/wp-content/uploads/2022/11/icons8-free-shipping-64.png',
      title: 'FAST, FREE',
      subtitle: 'SHIPPING',
      description: 'Orders shipping is always on time with best quality.*',
    },
    {
      imgSrc: 'https://wear-international.com/wp-content/uploads/2022/11/icons8-star-64.png',
      title: '5-STAR',
      subtitle: 'SERVICES',
      description: 'A staple in the industry for more than 12 years.',
    },
    {
      imgSrc: 'https://wear-international.com/wp-content/uploads/2022/11/icons8-return-purchase-64.png',
      title: 'NO HASSLE',
      subtitle: 'RETURNS',
      description: 'Return any new, unused item within 30 days.',
    },
  ];
  return (
    <div className="flex flex-col min-h-screen ">
     <div className="relative w-full max-h-[450px] md:max-h-[450px]">
  {featureImageList && featureImageList.length > 0
    ? featureImageList.map((slide, index) => (
        <img
          src={slide?.image}
          key={index}
          className={`${
            index === currentSlide ? "opacity-100" : "opacity-0"
          } absolute top-0 left-0 w-full max-h-[450px] md:max-h-[450px] object-contain transition-opacity duration-400`}
        />
      ))
    : null}

  <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 mt-[0px]  md:mt-[0px] transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4  mt-[0px]  md:mt-[0px] transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
        <div className="flex flex-col items-center py-8 md:py-0 gap-6 bg-white w-11/12 mx-auto z-10 mt-[145px] md:mt-[350px] relative">
    <div className="flex flex-wrap justify-center items-start w-full mt-[0] md:mt-[25px] bg-white">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center text-center w-56 relative mx-4 mb-6">
          <img src={feature.imgSrc} alt={feature.title} className="w-10 h-10" />
          <h3 className="mt-4 font-bold">{feature.title}</h3>
          <p className="font-semibold">{feature.subtitle}</p>
          <p className="mt-2 text-gray-500">{feature.description}</p>

          {/* Bottom border for mobile */}
          <div className="border-b border-gray-300 w-full md:hidden mt-4" />

          {/* Vertical border for web view, except for the last item */}
          {index !== features.length - 1 && (
            <div className="hidden md:block absolute right-[-15px] top-0 h-full border-l border-gray-300"></div>
          )}
        </div>
      ))}
    </div>
    <div className="w-full border-t border-gray-300 mt-8"></div>
  </div>
</div>

<div className="container  mx-auto p-4 md:p-6 mt-[220%] md:mt-[20%]">
  <div className="w-4/4 flex items-center justify-center font-bold text-[28px]">
    <h1>WELCOME TO RAVEL</h1>
  </div>

  <div className="mt-8">
    <p className="text-lg font-semibold md:text-xl text-gray-800 leading-relaxed text-justify">
      Welcome to <span className="font-bold text-red-700">Ravel</span>, your premier partner in exceptional travel experiences. With over 12 years of expertise in the travel industry, we have established ourselves as a leading provider of high-quality travel services, connecting travelers worldwide. Based in both Pakistan and the US, we proudly serve clients from all corners of the globe.
    </p>
    <p className="mt-4 text-lg md:text-xl text-gray-500 leading-relaxed text-justify">
      Our commitment to excellence has earned the trust of over 100 satisfied customers, who rely on us for unforgettable journeys. Our experienced team of travel professionals is dedicated to crafting personalized itineraries that cater to your unique needs, whether you're planning a solo adventure, a family vacation, or a corporate retreat.
    </p>
    <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
      At Ravel, we prioritize innovation, sustainability, and customer satisfaction, ensuring that every aspect of your travel experience meets the highest standards of quality and comfort. From guided tours to bespoke travel packages, we offer a diverse range of services designed to exceed your expectations.
    </p>
    <p className="mt-4 text-lg md:text-xl text-gray-800 leading-relaxed text-justify">
      Join the Ravel family today and discover the world like never before. Experience the difference with our tailored travel solutions that inspire and enrich your journeys. Let us help you create memories that last a lifetime!
    </p>
  </div>
</div>



<View/>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
<AllCategory/>
        </div>
      </section>
      <ViewTwo/>
      <section className="py-12">
  <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
    {productList.length > 0 ? (
      productList.map((productItem) => (
        <ShoppingProductTile
          key={productItem._id}
          handleGetProductDetails={handleGetProductDetails}
          product={productItem}
          handleAddtoCart={handleAddtoCart}
        />
      ))
    ) : (
      <p className="col-span-full text-center">No products found.</p>
    )}
  </div>
</section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
