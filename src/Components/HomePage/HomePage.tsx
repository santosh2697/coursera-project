import React from "react";
import Header from "../Header/Header.tsx";
import Specials from "../Specials/Specials.tsx";
import Testimonials from "../Testimonials/Testimonials.tsx";
import About from "../About/About.tsx";
import Footer from "../Footer/Footer.tsx";

const HomePage = () => {
  return (
    <div className="home-container">
      <Header />
      <main>
        <Specials />
        <Testimonials />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
