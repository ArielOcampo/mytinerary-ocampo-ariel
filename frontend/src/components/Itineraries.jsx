import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/itinerariesDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions';
import itinerariesActions from '../redux/actions/itinerariesActions';
import ItinerariesDetails from './ItinerariesDetails';
import { Link as Linkrouter } from 'react-router-dom'
import noItineraries from '../images/no-itineraries.svg'



function Itineraries() {
  const { id } = useParams()


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(citiesActions.getOneCity(id))
    dispatch(itinerariesActions.getItinerariesById(id))
    // eslint-disable-next-line
  }, []);
  // const city = useSelector(store => store.citiesReducer.oneCity)

  const itineraries = useSelector(store => store.itinerariesReducer.getItinerariesByCity)
  console.log(itineraries)




  return (


    <div className="itineraries-background flex flex-wrap items-center justify-center w-full ">
      {itineraries.length > 0 ? (itineraries.map((item, index) => <ItinerariesDetails key={index} city={item} />)) :

        // eslint-disable-next-line jsx-a11y/alt-text
        (<div className='no-itineraries'><img src={noItineraries} /> <p>No Itineraries yet!</p><div className='button-back-cities'><Linkrouter to='/cities'
          className="font-itineraries flex justify-center focus:outline-none ml-0 md:ml-5 bg-indigo-700 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-3 md:px-6 py-2 text-sm mr-3"
          href="/contact">Back to cities </Linkrouter ></div> </div>)
      }
    </div >

  );
}
export default Itineraries;
