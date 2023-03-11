import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link as Linkrouter } from "react-router-dom";

import ItinerariesDetails from "./ItinerariesDetails";
import { CitiesActions, ItinerariesActions } from "../../redux/actions";
import "../../styles/itinerariesDetails.css";
import { NoItineraries } from "../../images/";

function Itineraries() {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CitiesActions.getOneCity(id));
    dispatch(ItinerariesActions.getItinerariesById(id));
    // eslint-disable-next-line
  }, []);

  const itineraries = useSelector(
    (store) => store.itinerariesReducer.getItinerariesByCity
  );

  return (
    <div className="itineraries-background flex flex-wrap items-center justify-center w-full ">
      {itineraries?.length > 0 ? (
        itineraries?.map((item, index) => (
          <ItinerariesDetails key={index} city={item} cityId={id} />
        ))
      ) : (
        // eslint-disable-next-line jsx-a11y/alt-text
        <div className="no-itineraries">
          <img src={NoItineraries} alt="No found itineraries" />
          <p>No Itineraries yet!</p>
          <div className="button-back-cities">
            <Linkrouter
              to="/cities"
              className="font-itineraries flex justify-center focus:outline-none ml-0 md:ml-5 bg-indigo-700 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-3 md:px-6 py-2 text-sm mr-3"
              href="/contact"
            >
              Back to cities
            </Linkrouter>
          </div>
        </div>
      )}
    </div>
  );
}
export default Itineraries;
