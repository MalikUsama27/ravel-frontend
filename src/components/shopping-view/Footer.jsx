import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { FaFacebookF, FaWhatsapp, FaYoutube, FaInstagram } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';
import "./Footer.css"; // Import the CSS file
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

function Footer() {
  return (
    <MDBFooter className="footer-bg text-center text-lg-start text-muted">
      {/* Social Media Section */}
      <section className="footer-social-buttons">
  <span className="text-white me-auto">Get connected with us on social networks:</span>
  <div className="d-flex">
    <div className="social-btn fb-btn me-2" role="button">
      <a href="https://www.facebook.com/" className="text-white"><FaFacebookF /></a>
    </div>
    <div className="social-btn whatsapp-btn me-2" role="button">
      <a href="https://wa.me/message/WUXHS6D4O5ERF1" className="text-white"><FaWhatsapp /></a>
    </div>
    <div className="social-btn me-2" role="button">
      <a href="https://youtube.com/" className="text-white"><FaYoutube /></a>
    </div>
    <div className="social-btn insta-btn" role="button">
      <a href="https://www.instagram.com/" className="text-white"><FaInstagram /></a>
    </div>
  </div>
</section>

      <section className="text-white">
        <MDBContainer className="text-center text-md-start mt-5">
          <div className="footer-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {/* Company Info Column */}
            <div className="footer-col" style={{ flex: '1 1 30%', margin: '0 20px' }}>
              <h6 className="text-uppercase fw-bold mb-4">VISION PRO PVT LTD.</h6>
              <p style={{ textAlign: "justify" }}>
                Vision Pro is a premier sports apparel company with over 15+ years of experience, prominent for our commitment to quality and modernization. We serve clients internationally.
              </p>
            </div>

            {/* Useful Links Column */}
            <div className="footer-col" style={{ flex: '1 1 20%', margin: '0 10px' }}>
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Link to="/shop/about-us" className="nav-link footer-link">About Us</Link>
                <Link to="/shop/contact-us" className="nav-link footer-link">Get in Touch</Link>
                <Link to="/shop/category" className="nav-link footer-link">Products</Link>
              </div>
            </div>

            {/* Contact Column */}
            <div className="footer-col" style={{ flex: '1 1 30%', margin: '0 10px' }}>
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p style={{ display: 'flex', alignItems: 'center' }}>
                <MdLocationOn className="me-2" />
                9A Small Industrial Area Sialkot, Pakistan
              </p>
              <p style={{ display: 'flex', alignItems: 'center' }}>
                <MdEmail className="me-3" />
                info@visionprosports.com
              </p>
              <p style={{ display: 'flex', alignItems: 'center' }}>
                <MdPhone className="me-3" /> +92 (328) 933-6625
              </p>
              <p style={{ display: 'flex', alignItems: 'center' }}>
                <MdPhone className="me-3" /> +1 (929) 676‑8256
              </p>
            </div>
          </div>
        </MDBContainer>
      </section>

      <div className="text-center p-4 text-white ">
        © 2024 Copyright:{" "}
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          Revel
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
