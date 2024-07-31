import React from "react";
import useWindowDimensions from "../utils/useWindowDimensions.ts";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as Basket } from "../../assets/Basket.svg";
import { ReactComponent as Hamburger } from "../../assets/hamburger-menu.svg";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { isMobile, isDesktop } = useWindowDimensions();
  const links = ["Home", "About", "Menu", "Reservations", "Order Online"];
  if (isDesktop) {
    return (
      <header className="desktop-header-container">
        <figure>
          <Logo />
        </figure>
        <nav className="nav-items">
          {links?.map((link) => (
            <Link to="/">{link}</Link>
          ))}
        </nav>
        <figure>
          <Basket />
        </figure>
      </header>
    );
  }

  if (isMobile) {
    return (
      <header className="mobile-header-container">
        <figure>
          <Hamburger />
        </figure>
        <figure>
          <Logo />
        </figure>
        <figure>
          <Basket />
        </figure>
      </header>
    );
  }
};

export default Header;
