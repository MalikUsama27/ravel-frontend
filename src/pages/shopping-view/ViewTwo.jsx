import React from 'react';
import img from '../../assets/manufacturing.jfif'; // Ensure correct image path
import img1 from '../../assets/download.jfif';

const ViewTwo = () => {
  return (
    <div>
      {/* First Section */}
{/*       <div className="flex flex-col md:flex-row w-full h-auto mx-auto shadow-md overflow-hidden p-9">
        {/* Text Side - shows first on mobile */}
        <div className="flex-1 w-full md:w-5/12 p-6 text-black flex flex-col justify-center order-1 border md:border-black">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-wide">SUBLIMATION</h1>
            <h2 className="text-2xl md:text-3xl font-semibold">
              <span className="text-black">Printing,</span>
              <span className="text-red-600"> Embroidery</span>
            </h2>
            <p className="mt-3 text-gray-700 text-lg leading-relaxed">
              We have been serving the world market for well over 7+ years, focusing on quality and price-conscious products with the motto “Honesty – The Best.”<br />
              Our entire operation is conducted by highly qualified and trained professionals.
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
        </div> */}

        {/* Image Side - shows below the text on mobile */}
{/*         <div
          className="flex-1 w-full md:w-7/12 bg-cover bg-center h-64 md:h-auto order-2"
          style={{ backgroundImage: `url(${img1})` }} 
        >
        </div> */}
      // </div>

      {/* Second Section */}
      <div className="flex flex-col md:flex-row w-full bg-black mx-auto shadow-md overflow-hidden p-9">
        {/* Image Side - shows below the text on mobile */}
        {/* <div
          className="flex-1 w-full md:w-7/12 bg-cover bg-center h-64 md:h-auto order-2"
          style={{ backgroundImage: `url(${img})` }} 
        >
        
        </div> */}

        {/* Text Side - shows first on mobile */}
        <div className="flex-1 w-full md:w-5/12 p-6 bg-black text-white flex flex-col justify-center order-1 border border-black md:border-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">WEAR</h1>
          <h2 className="text-2xl md:text-3xl font-semibold">
            <span className="text-red-600">INTERNATIONAL </span>
          </h2>
          <p className="mt-3 text-white text-lg leading-relaxed">
We’re always happy to hear from our customers. Whether you’re interested in our products or have any inquiries, we’re here to help you.          </p>
          <p className="mt-3 text-white text-lg leading-relaxed">
Lets contact us and our team will be happy to assist you!          </p>
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
