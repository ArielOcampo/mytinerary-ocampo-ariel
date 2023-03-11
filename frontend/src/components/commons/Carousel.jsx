import React from "react";
import Carousel from "react-grid-carousel";
import "../../styles/carousel.css";

import { useSelector } from "react-redux";

const CarouselHome = () => {
  const cities = useSelector((store) => store.citiesReducer.cities);

  return (
    <div className="carousel-container">
      <h2 className="titulo-carousel">Popular Mytineraries</h2>
      <Carousel
        showDots={true}
        dotColorActive="#0050af"
        dotColorInactive="#fff"
        mobileBreakpoint={250}
        responsiveLayout={[
          {
            breakpoint: 1920,
            cols: 2,
            rows: 2,
            gap: 10,
            loop: true,
            autoplay: 3000,
          },
          {
            breakpoint: 1024,
            cols: 2,
            rows: 2,
            gap: 10,
            loop: true,
            autoplay: 3000,
          },
          {
            breakpoint: 768,
            cols: 2,
            rows: 2,
            gap: 10,
            loop: true,
            autoplay: 4000,
          },
          {
            breakpoint: 500,
            cols: 1,
            rows: 4,
            gap: 10,
            loop: true,
            autoplay: 4000,
          },
        ]}
      >
        {cities?.map((item) => (
          <Carousel.Item key={item._id}>
            <div className="block overflow-hidden rounded-2xl">
              <img
                className="object-cover w-full h-56"
                src={item.image}
                alt={item.country}
              />
              <div className=" text-carousel">
                <h5 className="titulo text-xl text-white">{item.name}</h5>
                <p className="parrafo mt-1 text-sm text-gray-400">
                  {item.country}
                </p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};
export default CarouselHome;
