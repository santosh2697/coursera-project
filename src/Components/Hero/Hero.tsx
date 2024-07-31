import React from "react";
import "./Hero.css";
import Food from "../../assets/restauranfood.jpg";
import useWindowDimensions from "../utils/useWindowDimensions.ts";

const Hero = () => {
  const handleClick = () => {};
  const { isMobile, isDesktop } = useWindowDimensions();

  if (isDesktop) {
    return (
      <section className="desktop-hero-container">
        <article className="hero-text">
          <div className="title">Little Lemon</div>
          <div className="sub-title">Chicago</div>
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
      </section>
    );
  }
  if (isMobile) {
    return (
      <section className="mobile-hero-container">
        <div className="title">Little Lemon</div>
        <div className="sub-title">Chicago</div>
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
