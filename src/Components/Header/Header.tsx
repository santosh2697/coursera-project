import React from "react";
import useWindowDimensions from "../utils/useWindowDimensions.ts";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { ReactComponent as Basket } from "../../assets/Basket.svg";
import { ReactComponent as Hamburger } from "../../assets/hamburger-menu.svg";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { isMobile, isDesktop } = useWindowDimensions();
  const links = [
    { label: "Home", route: "/" },
    { label: "Menu", route: "/" },
    { label: "About", route: "/" },
    { label: "Reservations", route: "/booking" },
    { label: "Order Online", route: "/booking" },
  ];
  if (isDesktop) {
    return (
      <header className="desktop-header-container">
        <figure>
          <Logo />
        </figure>
        <nav className="nav-items">
          {links?.map((link, index) => (
            <Link key={index} to={link.route}>
              {link.label}
            </Link>
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
