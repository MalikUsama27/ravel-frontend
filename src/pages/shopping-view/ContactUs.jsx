import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

import { Outlet } from "react-router-dom";

const ContactUs = () => {
    const form = useRef();

    const handleSubmit = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm("service_h3y0okv", "template_ozc2wea", form.current, {
          publicKey: "XgtP5s_gJBcHByvGS",
        })
        .then(
          () => {
          
            form.current.reset();
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    };
  
    return (
      <>
     <div className="w-full h-[220px] bg-black flex flex-col items-center justify-center">
  <span className="text-5xl text-white font-semibold">Contact Us</span>
  <span className="text-lg text-white font-semibold mt-2">Home / Contact Us</span>
</div>


        <div style={{ objectFit: "cover" }}>
          {/* <video autoPlay loop muted className="video" style={{ width: "100%" }}>
            <source src={Video} type="video/mp4" />
          </video> */}
        </div>
        <div className="container-fluid m-2 p-2">
          <div
            className="row"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <div className="col-md-7 col-sm-12" style={{ paddingRight: "5%" }}>
              <div style={{ marginLeft: "10%" }}>
                Join over a hundred international customers that already work with  
                <span className="font-bold text-red-700"> Revel</span>.
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "25px",
                  marginTop: "1rem",
                }}
              >
                Contact Us
              </div>
              <form ref={form} onSubmit={handleSubmit}>
                <div style={{ marginBottom: "2rem" }}>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    id="user_name"
                    placeholder="Full Name"
                    required
                    name="user_name"
                  />
                </div>
                <div style={{ marginBottom: "2rem" }}>
                  <input
                    type="email"
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    id="user_email"
                    placeholder="Email"
                    name="user_email"
                    required
                  />
                </div>
  
                <div style={{ marginBottom: "2rem" }}>
                  <textarea
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "12px",
                    border: "none",
                  }}
                >
                  Send
                </button>
              </form>
            </div>
            <div className="col-md-3 col-sm-12 mt-4 mt-md-0">
              <div className="contact-details">
              <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>Contact Details:</h2>
<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
  <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
    <FaPhone style={{ marginRight: "10px" }} />
    <span style={{ fontSize: "16px", color: "#333" }}>{"  "} +92 (333) 740-8106</span>
  </div>
  <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
    <FaEnvelope style={{ marginRight: "10px" }} />
    <span style={{ fontSize: "16px", color: "#333" }}>{" "} info@visionproxports.com</span>
  </div>
  <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
    <FaMapMarkerAlt style={{ marginRight: "5px" }} />
    <span style={{ fontSize: "16px", color: "#333" }} >{" "} Mohallah Darowal Gali Dakhi Shawala 33/353 Sialkot {"  "}Pakistan</span>
  </div>
</div>
                <div
                  style={{
                    border: "2px solid black",
                    width: "100%",
                    maxWidth: "800px",
                    margin: "0 auto",
                    overflow: "hidden",
                  }}
                >
                  
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1000.51005577042!2d74.544336793476!3d32.49137956224123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1731504778964!5m2!1sen!2s"
                    width="100%"
                    height="300"
                    style={{ border: "0", minHeight: "200px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Outlet />
      </>
    );
  };
  
  export default ContactUs