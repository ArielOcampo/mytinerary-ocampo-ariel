import React from 'react'
import "../styles/itinerariesDetails.css"
import { useState, useEffect } from 'react';
import Heart from '../images/heart.svg'
import ArrowD from '../images/arrow-down.svg'
import ArrowU from '../images/arrow-up.svg'
import { Link as Linkrouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import activitiesActions from '../redux/actions/activitiesActions';
import CardsActivities from '../components/CardsActivities';
import itinerariesActions from '../redux/actions/itinerariesActions';
import Comments from '../components/Comments';
import TextArea from '../components/TextArea';


const ItinerariesDetails = ({ city, cityId }) => {

  let data = city
  const [show, setShow] = useState(true);
  const [activities, setActivities] = useState()
  const [reload, setReload] = useState(false)
  const [oneItinerary, setOneItinerary] = useState()
  const dispatch = useDispatch()
  const itineraries = useSelector(store => store.itinerariesReducer.getItinerariesByCity)
  const userLogin = localStorage.getItem('token')


  //Funcion para traer las actividades
  async function getActions() {
    let actions = await dispatch(activitiesActions?.findActFromTin(data._id))
    setActivities(actions.response[0]?.activities)
  }

  //Función para Likes que se ejecuta con onclick
  async function likeDislike() {
    await dispatch(itinerariesActions.likeDislike(data._id))
    setReload(!reload)
  }
  async function getItinerary() {
    const res = await dispatch(itinerariesActions.getItinerary(city._id))
    setOneItinerary(res)
  }

  //UseEffect para poder actualizar los likes en pantalla(reload escucha cuando algo cambia)
  useEffect(() => {
    dispatch(itinerariesActions.getItinerariesById(cityId))
    // eslint-disable-next-line
  }, [reload])

  //UseEffect que ejecuta la función de las actividades y [itineraries] escucha los cambios y renderiza las imagenes de esas actividades
  useEffect(() => {
    getActions()
    getItinerary()
    // eslint-disable-next-line
  }, [itineraries])


  return (

    <div className="itineraries-cards bg-white dark:bg-gray-800 shadow rounded my-10 w-full">
      <div className="relative " >
        <img className="image-itineraries h-96 shadow rounded-t w-full object-cover object-center" src={data.image} alt="Photograpy city" />
        <div className="image-perfil inset-0 m-auto w-24 h-24 absolute bottom-0 -mb-12 xl:ml-10 rounded border-2 shadow border-white">
          <img className=" w-full h-full overflow-hidden object-cover rounded" src={data.creator?.image} alt="Photograpy city" />
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
              <h2 className="font-data-itineraries text-white dark:text-gray-400 font-bold text-xl xl:text-1xl leading-6 mb-2 text-center">{data?.likes.length}</h2>
              <button onClick={likeDislike} className="font-data-itineraries text-gray-800 dark:text-gray-100 text-sm xl:text-lg leading-5"><img src={Heart} alt="" /></button>
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

      {
        !show && (
          <div className=' flex flex-col items-center  justify-between   '>
            <div className=' div-cube order-first'>
              {activities !== undefined ? (<CardsActivities props={activities} />) : ("No activities yet")}
            </div>
            <div className=' md:mt-0 mt-16 md:mx-5 '>
              <h3 className="mb-4 text-lg font-semibold text-white-900">Comments</h3>
              <div className='container-comments'>
                {oneItinerary?.data.response.comments.map((item, index) => <Comments key={index} comments={item} data={oneItinerary} />

                )}
              </div>
            </div>
            {userLogin ? <div className='mt-10'>
              <TextArea data={oneItinerary} />
            </div> : null}

          </div>
        )
      }
    </div >
  )
}

export default ItinerariesDetails