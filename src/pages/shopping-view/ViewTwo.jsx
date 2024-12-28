import React from 'react';
import img from '../../assets/manufacturing.jfif'; // Ensure correct image path
import img1 from '../../assets/download.jfif';

const ViewTwo = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row w-full bg-black mx-auto shadow-md overflow-hidden p-9">
        {/* Text Side */}
        <div className="flex-1 w-full md:w-5/12 p-6 bg-black text-white flex flex-col justify-center order-1 border border-black md:border-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">WEAR</h1>
          <h2 className="text-2xl md:text-3xl font-semibold">
            <span className="text-red-600">INTERNATIONAL </span>
          </h2>
          <p className="mt-3 text-white text-lg leading-relaxed">
            We’re always happy to hear from our customers. Whether you’re interested in our products or have any inquiries, we’re here to help you.
          </p>
          <p className="mt-3 text-white text-lg leading-relaxed">
            Let's contact us, and our team will be happy to assist you!
          </p>
          <div className="mt-5 flex flex-col md:flex-row justify-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
            <a 
              href="/shop/contact-us" 
              className="inline-block bg-gray-700 text-white text-lg font-semibold py-2 px-5 rounded-full transition duration-300 hover:bg-gray-600 hover:shadow-lg text-center"
            >
              Contact Us
            </a>
            <a 
              href="/shop/category" 
              className="inline-block bg-red-700 text-white text-lg font-semibold py-2 px-5 rounded-full transition duration-300 hover:bg-red-600 hover:shadow-lg text-center"
            >
              View More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTwo;
