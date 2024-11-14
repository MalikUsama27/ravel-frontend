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
    <p className="text-lg font-semibold md:text-xl text-gray-800 leading-relaxed text-justify">
      Welcome to <span className="font-bold text-red-700">Revel</span>, your premier partner in exceptional travel experiences. With over 12 years of expertise in the travel industry, we have established ourselves as a leading provider of high-quality travel services, connecting travelers worldwide. Based in both Pakistan and the US, we proudly serve clients from all corners of the globe.
    </p>
    <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
      Our commitment to excellence has earned the trust of over 100 satisfied customers, who rely on us for unforgettable journeys. Our experienced team of travel professionals is dedicated to crafting personalized itineraries that cater to your unique needs, whether you're planning a solo adventure, a family vacation, or a corporate retreat.
    </p>
    <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
      At  <span className="font-bold text-red-700">Revel</span>, we prioritize innovation, sustainability, and customer satisfaction, ensuring that every aspect of your travel experience meets the highest standards of quality and comfort. From guided tours to bespoke travel packages, we offer a diverse range of services designed to exceed your expectations.
    </p>
    <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
      Join the <span className="font-bold text-red-700">Revel</span> family today and discover the world like never before. Experience the difference with our tailored travel solutions that inspire and enrich your journeys. Let us help you create memories that last a lifetime!
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

        <h2 className="text-3xl font-bold text-center text-black my-6">What We Offer</h2>
        <p className="text-lg leading-relaxed text-gray-700 text-center mb-4">
          Our product range includes:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li className="font-semibold">Goalkeeper Gloves: Designed for maximum grip, comfort, and protection.</li>
          <li className="font-semibold">Footballs: Engineered for superior control, durability, and flight stability.</li>
          <li className="font-semibold">Hosiery Items: Providing comfort and support for peak performance.</li>
        </ul>

        <h2 className="text-3xl font-bold text-center text-black my-6">Why Choose <span className="font-bold text-red-700">Revel</span></h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li className="font-semibold">Quality and Innovation: We constantly innovate to bring you the latest in sports technology.</li>
          <li className="font-semibold">Customer Satisfaction: Your success is our priority.</li>
          <li className="font-semibold">Passion for Excellence: Our dedication to the sport drives us.</li>
        </ul>

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
