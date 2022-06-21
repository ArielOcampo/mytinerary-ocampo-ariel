import React from 'react';
// import Data from '../data.json'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Watch from '../images/watch.svg';
import Heart from '../images/heart.svg'
import ArrowD from '../images/arrow-down.svg'
import ArrowU from '../images/arrow-up.svg'
import '../styles/itineraries.css'
function Itineraries() {
  const { id } = useParams()
  const [city, setCity] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/cities/${id}`)
      .then(response => setCity(response.data.response))
    console.log()

  }, [id]);


  return (

    <>
      <div className="flex items-center justify-center w-93 py-8 mx-10 ">
        {/* Card code block start */}
        <div className="bg-white dark:bg-gray-800 shadow rounded">
          <div className="relative ">
            <img className="image-itineraries h-96 shadow rounded-t w-full object-cover object-center" src={city.image} alt="Photograpy city" />
            <div className="inset-0 m-auto w-24 h-24 absolute bottom-0 -mb-12 xl:ml-10 rounded border-2 shadow border-white">
              <img className="w-full h-full overflow-hidden object-cover rounded" src="https://images.generated.photos/hLlFz-TruYMHM7NRL0OHGc2s8WFKLqug0h4B7lIM8ts/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy90cmFu/c3BhcmVudC8wMzQw/NjYyLnBuZw.png" alt="Photograpy city" />
            </div>
          </div>
          <div className="px-5 xl:px-10 pb-10">
            <div className="flex justify-center xl:justify-center w-full pt-16 xl:pt-5">

              <div className="flex items-center">
                <div className="text-4xl  text-gray px-10 py-1 font-normal rounded-full">Burj Khalifa</div>
              </div>
            </div>
            <div className="pt-3 xl:pt-5 flex flex-col xl:flex-row items-start xl:items-center justify-between">
              <div className="xl:pr-16 w-full xl:w-2/3">
                <div className="text-center xl:text-left mb-3 xl:mb-0 flex flex-col xl:flex-row items-center justify-between xl:justify-start">
                  <h2 className="mb-3 xl:mb-0 xl:mr-4 text-2xl text-gray-800 dark:text-gray-100 font-medium tracking-normal">Yusuf Cairns</h2>

                </div>
                <p className="text-center xl:text-left mt-2 text-sm tracking-normal text-gray-600 dark:text-gray-400 leading-5">{city.description}</p>
              </div>

              <div className="xl:px-10 xl:border-l xl:border-r w-full py-5 flex items-start justify-center xl:w-1/2">

                <div className="mr-6 xl:mr-10">
                  <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">5</h2>
                  <p className="text-gray-800 dark:text-gray-100 text-sm xl:text-xl leading-5">Price</p>
                </div>
                <div className="mr-6 xl:mr-10">
                  <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">2 hs</h2>
                  <p className="flex text-gray-800 dark:text-gray-100 text-sm xl:text-xl leading-5">Duration <img src={Watch} alt="" /></p>
                </div>
                <div>
                  <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">5</h2>
                  <button className="text-gray-800 dark:text-gray-100 text-sm xl:text-xl leading-5"><img src={Heart} alt="" /></button>
                </div>
              </div>

              <div className="w-full xl:w-2/3 flex-col md:flex-row justify-center xl:justify-end flex md:pl-6" onClick={() => setShow(!show)}>
                {show ? (<div ><button className="font-itineraries flex justify-center focus:outline-none ml-0 md:ml-5 bg-indigo-700 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-3 md:px-6 py-2 text-sm mr-3" >View more<img className='ml-3' src={ArrowD} alt="" /> </button> </div>)
                  : (<div><button className="font-itineraries flex justify-center focus:outline-none ml-0 md:ml-5 bg-indigo-700 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-3 md:px-6 py-2 text-sm mr-3" >View less<img className='ml-3' src={ArrowU} alt="" /> </button> </div>)}

              </div>

            </div>
          </div>

          {/* VIEW MORE */}

          {!show && (
            <div className="w-full flex items-center justify-center">
              <div className="py-4 sm:py-6 md:py-8 bg-white shadow rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 xl:px-10 gap-y-8 gap-x-12 2xl:gap-x-28">
                  <div className="w-full">
                    <p className="text-xs md:text-sm font-medium leading-none text-gray-500 uppercase">Sales</p>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-3 md:mt-5">89.5%</p>
                    <div className="flex flex-col md:w-64">
                      <div className="w-full flex justify-end">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                            <path d="M8 3.33334V12.6667" stroke="#16A34A" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 7.33334L8 3.33334" stroke="#16A34A" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 7.33334L8 3.33334" stroke="#16A34A" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p className="text-xs leading-none text-green-600">4.3%</p>
                        </div>
                      </div>
                      <div className="mt-2.5">
                        <div className="w-full h-1 bg-gray-200 rounded-full">
                          <div className="w-1/2 h-1 bg-blue-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <p className="mt-1.5 text-xs leading-3 text-gray-400">Yearly target</p>
                  </div>
                  <div className="w-full">
                    <p className="text-xs md:text-sm font-medium leading-none text-gray-500 uppercase">revenue</p>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-3 md:mt-5">$75,000</p>
                    <div className="flex flex-col">
                      <div className="h-4" />
                      <div className="md:w-64 mt-2.5">
                        <div className="w-full h-1 bg-gray-200 rounded-full">
                          <div className="w-40 h-1 bg-lime-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <p className="mt-1.5 text-xs leading-3 text-gray-400">Yearly target</p>
                  </div>
                  <div className="w-full">
                    <p className="text-xs md:text-sm font-medium leading-none text-gray-500 uppercase">customers</p>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-3 md:mt-5">3922</p>
                    <div className="flex flex-col md:w-64">
                      <div className="w-full flex justify-end">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                            <path d="M8 3.33334V12.6667" stroke="#16A34A" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 7.33334L8 3.33334" stroke="#16A34A" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 7.33334L8 3.33334" stroke="#16A34A" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p className="text-xs leading-none text-green-600">9.1%</p>
                        </div>
                      </div>
                      <div className="mt-2.5">
                        <div className="w-full h-1 bg-gray-200 rounded-full">
                          <div className="w-44 h-1 bg-yellow-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <p className="mt-1.5 text-xs leading-3 text-gray-400">Yearly target</p>
                  </div>
                </div>
              </div>
            </div>)}
        </div>

        {/* Card code block end */}

      </div>



    </>
  );
}
export default Itineraries;
