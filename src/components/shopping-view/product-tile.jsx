import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card 
      className="w-full max-w-l mx-auto relative overflow-hidden" 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
    >
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
        {/* Quick View Overlay */}
        <div className={`absolute ml-11 rounded-full w-8/12 h-[45px] mt-[230px] inset-0 flex justify-center items-center transition-opacity duration-300 ${hovered ? 'bg-black bg-opacity-80 opacity-100' : 'bg-transparent opacity-0 pointer-events-none'} shadow-lg`}>
  <span className="text-white text-lg font-semibold">Quick View</span>
</div>

      </div>
      
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
        <span>
          
          {product?.price}</span>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed ">Out Of Stock</Button>
        ) : (
          <Button onClick={() => handleAddtoCart(product?._id)} className="w-full bg-black rounded-2xl">
            Add to Inquiry
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
