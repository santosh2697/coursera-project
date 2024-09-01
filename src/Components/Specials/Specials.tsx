import React from "react";
import "./Specials.css";
import Scooter from "../../assets/scooter.svg";
import GreekSalad from "../../assets/greek salad.jpg";
import Bruschetta from "../../assets/bruschetta.jpg";
import LemonDessert from "../../assets/LemonDessert.jpg";
import useWindowDimensions from "../utils/useWindowDimensions.ts";

const specialsData = [
  {
    label: "Greek salad",
    image: GreekSalad,
    price: "$13.00",
    description:
      "Greek salad or horiatiki salad is a salad in Greek cuisine generally made with pieces of tomatoes, cucumbers, onion, feta cheese, and olives and dressed with salt, Greek oregano, lemon juice and olive oil.",
  },
  {
    label: "Bruschetta",
    image: Bruschetta,
    price: "$5.20",
    description:
      "Bruschetta is an Italian antipasto consisting of grilled bread often topped with olive oil and salt. Most commonly it is served with toppings of tomato, vegetables, beans, cured meat, and/or cheese.",
  },
  {
    label: "Lemon Desert",
    image: LemonDessert,
    price: "$4.00",
    description:
      "The tender lemon cake and fluffy pink frosting make this cake as tasty as it is pretty. Best of all, there’s a surprise raspberry jam filling inside.",
  },
];

const Cards = ({ isMobile, isDesktop }) => {
  if (isDesktop) {
    return (
      <>
        {specialsData.map((data) => {
          return (
            <article className="special-card">
              <img
                className="card-img"
                src={`${data.image}`}
                alt={`${data.label}`}
              />
              <div className="card-title card-title-font-style">
                <div className="card-heading">{data.label}</div>
                <div className="card-price">{data.price}</div>
              </div>
              <div className="card-description card-description-font-style">
                {data.description}
              </div>
              <div className="card-footer">
                Order a delivery
                <img className="card-scooter" src={Scooter} alt="Scooter" />
              </div>
            </article>
          );
        })}
      </>
    );
  } else if (isMobile) {
    return (
      <>
        {specialsData.map((data) => {
          return (
            <article className="mobile-special-card">
              <div className="mobile-card-container">
                <div className="card-heading card-title-font-style">
                  {data.label}
                </div>
                <div className="card-description card-description-font-style">
                  {data.description}
                </div>
                <div className="card-price card-description-font-style">
                  {data.price}
                </div>
              </div>
              <img
                className="mobile-card-img"
                src={`${data.image}`}
                alt={`${data.label}`}
              />
            </article>
          );
        })}
      </>
    );
  }
};

const Specials = () => {
  const { isMobile, isDesktop } = useWindowDimensions();

  return (
    <section>
      {isDesktop && (
        <div className="specials-heading subtitle-font-style">
          <div>This Weeks Specials</div>
          <button className="menu-button action-btn-font-style">Menu</button>
        </div>
      )}
      {isMobile && (
        <div className="movile-specials-heading section-title-font-style">
          ORDER FOR DELIVERY!
        </div>
      )}
      <div className="card-container">
        <Cards isMobile={isMobile} isDesktop={isDesktop} />
      </div>
    </section>
  );
};

export default Specials;
