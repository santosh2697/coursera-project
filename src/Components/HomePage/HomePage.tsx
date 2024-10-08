import React from "react";
import Header from "../Header/Header.tsx";
import Specials from "../Specials/Specials.tsx";
import Testimonials from "../Testimonials/Testimonials.tsx";
import Footer from "../Footer/Footer.tsx";
import Hero from "../Hero/Hero.tsx";

const HomePage = () => {
  return (
    <div className="home-container">
      <Header />
      <main>
        <Hero />
        <Specials />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
