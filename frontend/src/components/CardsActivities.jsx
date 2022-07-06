// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import { EffectCube, Pagination } from "swiper";
import '../styles/cardsactivities.css'

const CardsActivities = (props) => {
  let activities = props.props
  return (
    <>

      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Pagination]}
        className="mySwiper"
      >

        {activities?.map(item =>

          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url("${item.img}")`,
                backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"
              }} className="imgCubo"
            >
              <h1>{item.title}</h1>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  )
}

export default CardsActivities