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
        <h1 className="text-4xl text-center font-bold text-black mb-4">About Us</h1>
        <p className="mt-4 mb-2 text-lg leading-relaxed text-gray-700 text-center">
          REVEL INDUSTRY was established in 2012 with our primary goal to provide high-quality products and competitive pricing with on-time delivery using major carriers and tracking.
        </p>
        <p className="text-lg leading-relaxed text-gray-700 text-center mb-6">
        REVEL INDUSTRY is your best source of Custom Team Apparel:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 text-center mb-6">
          <li>Basketball Uniforms</li>
          <li>American Football Uniforms</li>
          <li>Soccer Uniforms</li>
          <li>Baseball Uniforms</li>
          <li>Women’s Fastpitch Softball Uniforms</li>
          <li>Slowpitch Softball Uniforms</li>
          <li>Hoodies</li>
          <li>Polo Shirts</li>
          <li>Reversible jerseys and shorts for most sports</li>
          <li>Track suits and warmups</li>
          <li>Training suits</li>
        </ul>
        <p className="text-lg leading-relaxed text-gray-700 text-center mb-6">
          We make all our apparel using professional processes and equipment, providing you the best quality at reasonable prices with on-time delivery and customer service to ensure your success.
        </p>

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
