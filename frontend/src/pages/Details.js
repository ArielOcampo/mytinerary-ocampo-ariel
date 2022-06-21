import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link as Linkrouter } from 'react-router-dom'
import '../styles/details.css'
import Itineraries from '../components/Itineraries';


export default function Details() {
  const { id } = useParams()
  const [city, setCity] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/cities/${id}`)
      .then(response => setCity(response.data.response))
    console.log()

  }, [id]);

  return (
    <>


      <div className='details-container' >
        <div className="cards mb-8  " >
          {/* <section >
            <div className="px-4 py-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 ">
                <div className="relative z-10 lg:py-16">
                  <div className="relative h-64 sm:h-80 lg:h-full ">
                    <img
                      className="absolute inset-0 object-cover w-full h-full "
                      src={city.image}
                      alt="Citie"
                    />
                  </div>
                </div>

                <div className="b-1 relative  flex items-center bg-gray-50  ">
                  <span
                    className="b-2 hidden lg:inset-y-0 lg:absolute lg:w-16 lg:bg-gray-50 lg:block lg:-left-16"
                  ></span>

                  <div className="p-8 sm:p-16 lg:p-24">
                    <h2 className="text-2xl font-bold sm:text-5xl">
                      {city.name}
                    </h2>
                    <p className='sm:text-xl'>{city.country}</p>

                    <p className="mt-4 text-gray-900">
                      {city.description}
                    </p>
                    <div className='flex justify-end'>
                      <Linkrouter to='/cities'
                        className="inline-block  px-12 py-3 mt-8 text-sm font-medium text-white bg-blue-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring"
                        href="/contact"
                      >
                        Back to cities
                      </Linkrouter>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}




        </div>
        <div><Itineraries /></div>
      </div>
    </>
  )
}