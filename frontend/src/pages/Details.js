import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link as Linkrouter } from 'react-router-dom'


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


      <div >
        <div className="cards mb-8 " >
          <section>
            <div className="px-4 py-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
                <div className="relative z-10 lg:py-16">
                  <div className="relative h-64 sm:h-80 lg:h-full">
                    <img
                      className="absolute inset-0 object-cover w-full h-full"
                      src={city.image}
                      alt="Citie"
                    />
                  </div>
                </div>

                <div className="relative flex items-center bg-gray-100">
                  <span
                    className="hidden lg:inset-y-0 lg:absolute lg:w-16 lg:bg-gray-100 lg:block lg:-left-16"
                  ></span>

                  <div className="p-8 sm:p-16 lg:p-24">
                    <h2 className="text-2xl font-bold sm:text-3xl">
                      {city.name}
                    </h2>
                    <p>{city.country}</p>

                    <p className="mt-4 text-gray-600">
                      {city.description}
                    </p>

                    <Linkrouter to='/cities'
                      className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring"
                      href="/contact"
                    >
                      Back to cities
                    </Linkrouter>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-5" key={""}>
            <a href="wwww.google.com">
              <img className="rounded-t-lg img-cards" src={citie.image} alt="" />
            </a>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{citie.country}<p className='font-medium'>({citie.citie})</p></h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>

            </div>
          </div> */}

        </div>
      </div>
    </>
  )
}