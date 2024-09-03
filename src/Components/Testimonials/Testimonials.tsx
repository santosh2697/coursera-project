import React from "react";
import "./Testimonials.css";
import UserIcon from "../../assets/user-profile.svg";

const testimonials = [
  {
    image: UserIcon,
    name: "Bruce wayne",
    rating: 4,
    review: "Overcrowded",
  },
  {
    image: UserIcon,
    name: "Joker",
    rating: 1,
    review:
      "Everything is peaceful and quite for my liking, needs some chaos in here to spice it up a lil",
  },
  {
    image: UserIcon,
    name: "Bane",
    rating: 3,
    review: "Too many rich people from gotham vist the place",
  },
  {
    image: UserIcon,
    name: "Poison ivy",
    rating: 2,
    review: "Lack of greenery around the restaurant, kinda bland",
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
            <article className="testimonials-container">
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
