import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import ProductDetailsDialog from '@/components/shopping-view/product-details';
import { useToast } from "@/components/ui/use-toast";

const Products = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [productList, setProductList] = useState([]);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const { toast } = useToast();

  // Fetch products by category ID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://ravel-be.vercel.app/api/admin/category/get/${id}`);
        const products = response.data.data.products; // Adjust to get products from the response
        setProductList(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id]);

  const handleGetProductDetails = (productId) => {
    const product = productList.find((item) => item._id === productId);
    setProductDetails(product);
    setOpenDetailsDialog(true);
  };

  const handleAddtoCart = (productId) => {
    const product = productList.find((item) => item._id === productId);
    console.log(product)
    // Check if product exists and extract necessary properties
    if (product) {
      const cartItem = {
        img: product.img || product.image || product.imageUrl,
        price: product.price,
        productId: product._id, // Use _id as productId
        quantity: 1, // Set default quantity
        title: product.title
      };

      // Store the product data in local storage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cart));

      toast({ message: `${product.title} added to cart!` }); // Show custom toast notification
      console.log("Product added to cart:", cartItem);
    }
  };

  return (
    <div>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
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
              <p>No products found in this category.</p>
            )}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default Products;
