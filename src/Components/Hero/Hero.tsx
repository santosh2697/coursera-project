import React from "react";
import "./Hero.css";
import Food from "../../assets/restauranfood.jpg";
import useWindowDimensions from "../utils/useWindowDimensions.ts";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigateToUrl = useNavigate();
  const { isMobile, isDesktop } = useWindowDimensions();

  const handleClick = () => {
    navigateToUrl("/booking");
  };

  if (isDesktop) {
    return (
      <section className="desktop-hero-container">
        <article className="hero-text">
          <div className="title title-font-style">Little Lemon</div>
          <div className="sub-title subtitle-font-style">Chicago</div>
          <div className="description">
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </div>
          <button
            className="reserve-btn action-btn-font-style"
            onClick={handleClick}
          >
            Reserve a table
          </button>
        </article>
        <figure>
          <img src={Food} alt="Food" className="food" />
        </figure>
      </section>
    );
  }
  if (isMobile) {
    return (
      <section className="mobile-hero-container">
        <div className="title title-font-style">Little Lemon</div>
        <div className="sub-title subtitle-font-style">Chicago</div>
        <div className="hero-wrapper">
          <article className="hero-text">
            <div className="description">
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </div>
            <button className="reserve-btn" onClick={handleClick}>
              Reserve a table
            </button>
          </article>
          <figure>
            <img src={Food} alt="Food" className="food" />
          </figure>
        </div>
      </section>
    );
  }
};

export default Hero;
