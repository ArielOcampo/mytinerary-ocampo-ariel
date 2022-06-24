import '../styles/cards.css'
import { useState } from 'react';
import { Link as Linkrouter } from "react-router-dom";
import Video from '../images/video-cities.mp4'
import Noresults from '../components/Noresults'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import citiesActions from '../redux/actions/citiesActions';

function Cards() {

  const [search, setSearch] = useState('');

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(citiesActions.filterCities(search))


    // eslint-disable-next-line
  }, [search]);

  const cities = useSelector(store => store.citiesReducer.filter)

  return (
    <>

      {//input Search
      }
      <video className='video' autoPlay loop muted playsInline src={Video} />
      <div className="search flex items-center mt-10">
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative ">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-blue-900 dark:text-blue-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onKeyUp={e => { setSearch(e.target.value) }} placeholder="Search" />
        </div>
        <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-900 rounded-lg border border-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>

      </div>

      {/* Cards Map */}
      <div className="cities-container">

        <div className="cards mb-8" >
          {cities.length > 0 ? (

            cities.map(item =>



              <div className="card max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-5" key={item._id}>
                <img className="rounded-t-lg img-cards" src={item.image} alt="Citie" />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white text-center">{item.name}<p className='font-medium'>({item.country})</p></h5>

                  <p className="mb-3 text-cards font-normal text-gray-400 dark:text-gray-400">{item.description}</p>
                  <div className='flex justify-end'>
                    <Linkrouter to={`/citie/${item._id}`} className="flex-inline  justify-end items-center  py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      See more
                    </Linkrouter>
                  </div>
                </div>
              </div >
            )
          ) : (<div><Noresults /></div>)}
        </div >
      </div>
    </>
  )
}
export default Cards

// const mapStateToProps = (state) => {
//   return {
//     cities: state.citiesReducer.cities,
//     auxiliar: state.citiesReducer.auxiliar
//   }
// }
// export default connect(mapStateToProps, null)(Cards)
