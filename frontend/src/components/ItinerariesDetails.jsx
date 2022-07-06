import React from 'react'
import "../styles/itinerariesDetails.css"
import { useState, useEffect } from 'react';
import Heart from '../images/heart.svg'
import ArrowD from '../images/arrow-down.svg'
import ArrowU from '../images/arrow-up.svg'
import { Link as Linkrouter } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import activitiesActions from '../redux/actions/activitiesActions';
import CardsActivities from '../components/CardsActivities';



const ItinerariesDetails = (city) => {
  console.log(city)
  let data = city.city
  const [show, setShow] = useState(true);
  const [activities, setActivities] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    getActions()
    // eslint-disable-next-line
  }, [])
  async function getActions() {
    let actions = await dispatch(activitiesActions?.findActFromTin(data._id))

    if (actions.response.length > 0) setActivities(actions.response[0]?.activities)
  }
  useEffect(() => {
    getActions()
    // eslint-disable-next-line
  }, [])

  console.log(activities)
  return (

    <div className="itineraries-cards bg-white dark:bg-gray-800 shadow rounded my-10 w-full">
      <div className="relative " >
        <img className="image-itineraries h-96 shadow rounded-t w-full object-cover object-center" src={data.image} alt="Photograpy city" />
        <div className="image-perfil inset-0 m-auto w-24 h-24 absolute bottom-0 -mb-12 xl:ml-10 rounded border-2 shadow border-white">
          <img className=" w-full h-full overflow-hidden object-cover rounded" src={data.creator.image} alt="Photograpy city" />
        </div>
      </div>

      <div className="px-5 xl:px-10 pb-10 ">


        <div className="flex justify-center xl:justify-center w-full pt-16 xl:pt-5">

          <div className="flex items-center">
            <div className="title-itinerary text-white px-10 py-1 font-normal rounded-full  text-4xl">{data.itinerary}</div>
          </div>
        </div>
        <div className="pt-3 xl:pt-5 flex flex-col xl:flex-row items-start xl:items-center justify-between">
          <div className="xl:pr-16 w-full xl:w-2/3">
            <div className=" text-center xl:text-left mb-3 xl:mb-0 flex flex-col xl:flex-row items-center justify-between xl:justify-start">
              <h2 className="text-creator mb-5 xl:mr-4 text-2xl text-white dark:text-gray-100 font-medium tracking-normal">{data.creator.name}</h2>

            </div>
            <p className="hashtags text-center xl:text-left mt-5 text-lg tracking-normal text-white dark:text-gray-400 leading-5">{data.hashtags}</p>
          </div>

          <div className="font-data-itineraries xl:px-10 xl:border-l xl:border-r w-full py-5 flex items-start justify-center ">

            <div className="mr-6 xl:mr-10 ">
              <h2 className="flex flex-grow text-white dark:text-gray-400 font-bold text-md   mb-2 text-center">{data.price}</h2>
              <p className="font-data-itineraries text-white dark:text-gray-100 text-sm xl:text-lg leading-5">Price</p>
            </div>
            <div className="mr-6 xl:mr-10">
              <h2 className="font-data-itineraries text-white dark:text-gray-400 font-bold text-xl xl:text-1xl leading-6 mb-2 text-center">{data.duration}HS</h2>
              <p className="font-data-itineraries flex text-white dark:text-gray-100 text-sm xl:text-lg leading-5">Duration 🕓</p>
            </div>
            <div>
              <h2 className="font-data-itineraries text-white dark:text-gray-400 font-bold text-xl xl:text-1xl leading-6 mb-2 text-center">5</h2>
              <button className="font-data-itineraries text-gray-800 dark:text-gray-100 text-sm xl:text-lg leading-5"><img src={Heart} alt="" /></button>

            </div>
          </div>


          <div className="buttons-itineraries xl:px-10 w-full py-5 flex flex-wrap items-start justify-center " onClick={() => setShow(!show)}>
            <Linkrouter to='/cities'
              className="font-itineraries flex justify-center focus:outline-none ml-0 md:ml-5 bg-indigo-700 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-3 md:px-6 py-2 text-sm mr-3 "
              href="/contact">Back to cities</Linkrouter>
            {show ? (<div ><button className="font-itineraries flex justify-center focus:outline-none ml-0 md:ml-5 bg-indigo-700 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-3 md:px-6 py-2 text-sm mr-3" >View more<img className='ml-3' src={ArrowD} alt="" /> </button> </div>)
              : (<div><button className="font-itineraries flex justify-center focus:outline-none ml-0 md:ml-5 bg-indigo-700 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-3 md:px-6 py-2 text-sm mr-3" >View less<img className='ml-3' src={ArrowU} alt="" /> </button> </div>)}

          </div>


        </div>
      </div>

      {/* VIEW MORE */}

      {!show && (
        <div className='flex ml-12'>
          <div className=' order-first'>
            {activities !== undefined ? (<CardsActivities props={activities} />) : ("No activities yet")}

          </div>
        </div>

      )}
    </div >
  )
}

export default ItinerariesDetails