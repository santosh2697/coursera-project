import React from "react";
import "./Footer.css";
import FooterLogo from "../../assets/footer logo.png";

const Footer = () => {
  return (
    <footer>
      <img src={FooterLogo} alt="Little lemon logo" />
      <div className="footer-text">Copyrights Little Lemon™</div>
    </footer>
  );
};

export default Footer;
