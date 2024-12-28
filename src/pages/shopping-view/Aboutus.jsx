import React from "react";
import { Outlet } from "react-router-dom";
import imac from "../../assets/cer/imac.jpg";
import iso from "../../assets/cer/iso.png";
import psga from "../../assets/cer/psga.jpg";
import secp from "../../assets/cer/secp.png";
import sedex from "../../assets/cer/sedex.png";
import wyoming from "../../assets/cer/wyoming.png";
import bsci from "../../assets/cer/BSCI.png";

const About = () => {
  return (
    <>
      <div className="w-full h-[250px] bg-black flex flex-col items-center justify-center">
        <span className="text-5xl text-white font-semibold">About Us</span>
        <span className="text-lg text-white mt-2">Home / About Us</span>
      </div>

      <div className="p-6 bg-white">
       <div className="container  mx-auto p-4 md:p-6 ">
  <div className="w-4/4 flex items-center justify-center font-bold text-[28px]">
    <h1>WELCOME TO REVEL</h1>
  </div>

<div className="mt-8">
  <p className="text-lg  md:text-xl text-gray-800 leading-relaxed text-justify">
   At <span className="font-bold text-red-700">Revel Indusry</span>, we are passionate about crafting high-quality sportswear and hosiery products that support and elevate your active lifestyle. With 7+ years of experience in design and manufacturing, we combine innovation, comfort, and performance in every item we create. Whether you're an athlete, a fitness enthusiast, or someone who values everyday comfort, our products are designed to meet your needs with precision and care.
  </p>
  <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
    At <span className="font-bold text-red-700">Revel Indusry</span>, we lead the way in innovation and sustainability, ensuring that every product we produce meets the most rigorous quality standards. We provide end-to-end manufacturing solutions that help businesses scale efficiently from concept to completion. We pride ourselves on offering cutting-edge technology and environmentally responsible manufacturing practices to create products that perform and last.
  </p>
  <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
    Our commitment to quality is reflected in our carefully selected materials, skilled craftsmanship, and attention to detail in every stitch. The right gear can make a difference, and our goal is to provide our customers with stylish, durable, and functional apparel that enhances their performance and confidence.
  </p>
  <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
    At Revel Industry, we are dedicated to sustainability, ethical practices, and delivering exceptional products that stand the test of time. Join us on our journey to bring comfort, performance, and innovation to your wardrobe.
  </p>
</div>

</div>
        <h2 className="text-3xl font-bold text-center text-black my-6">Our Mission</h2>
        <p className="text-lg leading-relaxed text-gray-700 text-center mb-6">
         Our mission is to deliver high-quality sportswear and hosiery products that empower individuals with unmatched comfort, style, and performance. We are committed to innovation, sustainability, and crafting products that support every active lifestyle.
        </p>

        <h2 className="text-3xl font-bold text-center text-black my-6">Who We Are</h2>
        <p className="text-lg leading-relaxed text-gray-700 text-center mb-6">
        <span className="font-bold text-red-700">Revel Industry</span> is a passionate team of sports enthusiasts, engineers, and designers who share a common goal: to revolutionize sportswear and hosiery products.
        </p>

        {/* <h2 className="text-3xl font-bold text-center text-black my-6">What We Offer</h2>
        <p className="text-lg leading-relaxed text-gray-700 text-center mb-4">
          Our product range includes:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li className="font-semibold">Goalkeeper Gloves: Designed for maximum grip, comfort, and protection.</li>
          <li className="font-semibold">Footballs: Engineered for superior control, durability, and flight stability.</li>
          <li className="font-semibold">Hosiery Items: Providing comfort and support for peak performance.</li>
        </ul> */}

        {/* <h2 className="text-3xl font-bold text-center text-black my-6">Why Choose <span className="font-bold text-red-700">Revel</span></h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li className="font-semibold">Quality and Innovation: We constantly innovate to bring you the latest in sports technology.</li>
          <li className="font-semibold">Customer Satisfaction: Your success is our priority.</li>
          <li className="font-semibold">Passion for Excellence: Our dedication to the sport drives us.</li>
        </ul> */}

        <h2 className="text-3xl font-bold text-center text-black my-6">Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
          {[imac, iso, psga, secp, sedex, wyoming].map((img, index) => (
            <div key={index} className="flex justify-center">
              <img src={img} alt={`Certification ${index}`} className="w-full h-auto max-w-[150px] object-contain" />
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <img src={bsci} alt="BSCI Certification" className="w-3/4 h-auto" />
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default About;
