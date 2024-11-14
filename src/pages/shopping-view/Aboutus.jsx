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
    Welcome to <span className="font-bold text-red-700">Revel</span>, the leading name in high-quality manufacturing services. As one of the top manufacturers in the industry with over 12 years of experience, we are committed to delivering exceptional, custom-made products that meet the highest standards. Based in Pakistan and the US, we serve clients across the globe, offering innovative manufacturing solutions tailored to your specific needs.
  </p>
  <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
    Our reputation as the best manufacturers has been built on a foundation of trust and reliability. With over 100 satisfied clients, we are known for our ability to deliver premium products and unparalleled customer service. Whether you need large-scale production or unique, custom designs, our team of experts is here to help you bring your vision to life with precision and excellence.
  </p>
  <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
    At <span className="font-bold text-red-700">Revel</span>, we lead the way in innovation and sustainability, ensuring that every product we produce meets the most rigorous quality standards. From concept to completion, we provide end-to-end manufacturing solutions that help businesses scale efficiently. We pride ourselves on offering cutting-edge technology and environmentally responsible manufacturing practices to create products that perform and last.
  </p>
  <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
    Join the <span className="font-bold text-red-700">Revel</span> family today and experience firsthand why we are recognized as one of the best manufacturers in the industry. Let us be your trusted partner in creating high-quality products that stand the test of time. Connect with us today and discover how our custom manufacturing solutions can help you succeed in an ever-evolving market.
  </p>
</div>

</div>
        <h2 className="text-3xl font-bold text-center text-black my-6">Our Mission</h2>
        <p className="text-lg leading-relaxed text-gray-700 text-center mb-6">
          Our mission is to empower goalkeepers and football players of all levels with innovative, durable, and high-performance products.
        </p>

        <h2 className="text-3xl font-bold text-center text-black my-6">Who We Are</h2>
        <p className="text-lg leading-relaxed text-gray-700 text-center mb-6">
        <span className="font-bold text-red-700">Revel</span> is a passionate team of sports enthusiasts, engineers, and designers who share a common goal: to revolutionize football equipment.
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
