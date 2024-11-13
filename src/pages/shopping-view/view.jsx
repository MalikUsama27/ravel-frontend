import React from 'react';
import img from '../../assets/manufacturing.jfif'; // Ensure correct image path
import img2 from '../../assets/revel.jpeg';
const View = () => {
  return (
    <div className="flex flex-col md:flex-row w-full bg-black mx-auto border border-gray-300 shadow-md overflow-hidden p-6">
      {/* Image Side */}
      <div
        className="flex-1 w-full md:w-6/12 bg-cover bg-center h-64 md:h-auto"
        style={{ backgroundImage: `url(${img2})` }}
      >
        {/* Image side - no content needed here */}
      </div>

      {/* Text Side */}
      <div className="flex-1 w-full md:w-6/12 p-6 bg-black text-white flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">WE ARE A</h1>
        <h2 className="text-2xl md:text-3xl font-semibold">
          <span className="text-red-600">MANUFACTURING </span>
          <span className="text-white">COMPANY</span>
        </h2>
        <p className="mt-3 text-lg leading-relaxed">
        <span className="font-bold text-red-700">Revel</span> is a well-reputed and professional manufacturing organization. We manufacture and export our products using the latest technology of the modern era.
        </p>
        <p className="mt-3 text-lg leading-relaxed">
          We have been serving the world market for over 12 years, dealing in quality and price-conscious products with the motto “Honesty – The Best.” From the selection of raw materials to the finishing touches and packing, our entire operation is conducted by highly qualified and trained professionals.
        </p>
      </div>
    </div>
  );
};

export default View;
