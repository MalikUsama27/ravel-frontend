import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllCategory=()=> {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`https://ravel-be.vercel.app/api/admin/category/get`);
        setCategories(response.data.data); // Adjust according to your response structure
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap justify-center p-4">
      {categories.map((category) => (
        <div key={category._id} className="relative w-full sm:w-1/2 md:w-1/3 p-4">
          <Link
            to={`/shop/category/ca/${category._id}`}
            className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110" // Scale image on hover
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-50 w-full h-20 flex items-center justify-center text-center transition-opacity duration-300">
                <span className="text-white text-lg font-bold">{category.title}</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllCategory