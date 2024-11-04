import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';

const CategoriesAndProducts = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ravel-be.vercel.app/api/admin/category/get');
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex ">
    {/* Sidebar for categories */}
    <div className="w-4/4 p-4">
    <h2 className="ml-14 mt-14 text-lg font-bold mb-4">Categories</h2>
<div className="ml-10 pl-4">
  {categories.map((category) => (
    <Link
      to={`/shop/category/ca/${category._id}`}
      key={category._id}
      className="block mb-2 text-gray-700 hover:text-red-600 transition-colors duration-200"
    >
      <span className="text-md">{category.title}</span>
    </Link>
  ))}
</div>
    </div>

      {/* Main section for products */}
      <div className="w-12/12 p-2">
        <Outlet /> {/* Render products based on selected category */}
      </div>
    </div>
  );
};

export default CategoriesAndProducts;
