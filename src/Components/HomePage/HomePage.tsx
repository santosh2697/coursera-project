import React from "react";
import Header from "../Header/Header";
import Specials from "../Specials/Specials";
import Testimonials from "../Testimonials/Testimonials";
import About from "../About/About";
import Footer from "../Footer/Footer";

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
