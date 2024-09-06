import React from "react";
import "./Testimonials.css";
import UserIcon from "../../assets/user-profile.svg";

const testimonials = [
  {
    image: UserIcon,
    name: "Bruce wayne",
    rating: 4,
    review: "Overcrowded and missing catwoman",
  },
  {
    image: UserIcon,
    name: "Joker",
    rating: 1,
    review: "Everything is peaceful for my liking, needs some chaos in here",
  },
  {
    image: UserIcon,
    name: "Bane",
    rating: 3,
    review: "Too many corrupt rich people in Gotham. Gotham must be destroyed!",
  },
  {
    image: UserIcon,
    name: "Poison ivy",
    rating: 2,
    review: "Lack of greenery around the restaurant",
  },
];

const Testimonials = () => {
  const stars = "⭐";
  return (
    <section className="testimonials-section">
      <div className="testimonials-heading section-title-font-style">
        What our customers say!
      </div>

      <div className="testimonials-wrapper">
        {testimonials?.map((data) => {
          return (
            <article className="testimonials-container" key={data.name}>
              {stars.repeat(data.rating)}
              <div className="user-name-container">
                <img src={data.image} alt="user" />
                <div className="user-name card-title-font-style">
                  {data.name}
                </div>
              </div>
              <div className="user-review card-description-font-style">
                {data.review}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;
