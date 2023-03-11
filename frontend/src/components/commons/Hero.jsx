import { Link as LinkRouter } from "react-router-dom";

import "../../styles/hero.css";
import { VideoHero } from "../../images/";

const Hero = () => {
  return (
    <>
      <div className="hero-container">
        <video
          className="video"
          autoPlay
          loop
          muted
          playsInline
          src={VideoHero}
        />
        <div className="texto">
          <h1 className="font-bold ">MyTinerary</h1>
          <p className="mb-5 text-start ">
            Find your perfect trip, designed by insiders who know and love their
            cities!
          </p>
          <LinkRouter to="/cities" href="#">
            <button className="button">
              <span className="button_lg">
                <span className="button_sl"></span>
                <span className="button_text">Find your next experience</span>
              </span>
            </button>
          </LinkRouter>
        </div>
      </div>
    </>
  );
};
export default Hero;
