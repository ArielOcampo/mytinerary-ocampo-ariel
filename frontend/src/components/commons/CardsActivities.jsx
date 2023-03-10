// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Autoplay, EffectCube, Pagination, EffectCoverflow } from "swiper";
import "../../styles/cardsactivities.css";

const CardsActivities = (props) => {
  let activities = props.props;

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        autoplay={{
          delay: 2000,
        }}
        className="mySwiper"
      >
        {/* <Swiper

        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,


        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        pagination={true}
        modules={[EffectCube, Pagination, Autoplay]}
        className="mySwiper"
      > */}

        {activities?.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: `url("${item.images}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="imgCubo "
            >
              <h4 className="title-cube">{item.title}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CardsActivities;
