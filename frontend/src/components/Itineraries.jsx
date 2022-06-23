import React from 'react';
// import Data from '../data.json'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/itinerariesDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions';
import itinerariesActions from '../redux/actions/itinerariesActions';
import ItinerariesDetails from './ItinerariesDetails';
import { Link as Linkrouter } from 'react-router-dom'



function Itineraries() {
  const { id } = useParams()
  // const [show, setShow] = useState(true);

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

        (<div className='no-itineraries'><p>No itineraries yet</p><Linkrouter to='/cities'
          className="inline-block  px-12 py-3 mt-8 text-sm font-medium text-white bg-blue-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring"
          href="/contact">Back to cities</Linkrouter></div>)
      }
    </div>

  );
}
export default Itineraries;
