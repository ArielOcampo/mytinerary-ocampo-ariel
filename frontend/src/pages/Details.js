import React from 'react';
import '../styles/details.css'
import Itineraries from '../components/Itineraries';
import { useSelector } from 'react-redux';



export default function Details() {
  const cities = useSelector(store => store.citiesReducer.oneCity)


  return (
    <>


      <div className='details-container' style={{ backgroundImage: `url(${cities?.image})` }} >
        <div>
          <h1 className='details-title'>{cities.name}</h1>
        </div>
        <div className='details-description'>
          <p>{cities.description}</p>
        </div>
      </div>
      <Itineraries />

    </>
  )
}