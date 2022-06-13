import '../styles/cards.css'
import data from '../data.json';
import { useState, useEffect } from 'react';
import { Link as Linkrouter } from "react-router-dom";


export default function Cards() {

  const [search, setSearch] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCities(data)

    let citieFilter = data.filter(item => item.citie.toLocaleLowerCase().startsWith(search.trim().toLocaleLowerCase()) || item.country.toLocaleLowerCase().startsWith(search.trim().toLocaleLowerCase()))
    setCities(citieFilter)
  }, [search]);

  // const searchText = (event) => {
  //   setFilter(event.target.value);
  // }


  return (
    <>

      {//input Search
      }

      <div className="search flex items-center mt-10">
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative ">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onKeyUp={e => { setSearch(e.target.value) }} placeholder="Search" required />
        </div>
        <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>

      </div>

      {/* Cards Map */}
      <div className="cities-container">
        <div className="cards mb-8" >
          {cities.length > 0 ? (

            cities.map(item =>
              <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-5" key={item.id}>
                <a href="wwww.google.com">
                  <img className="rounded-t-lg img-cards" src={item.image} alt="" />
                </a>
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.citie}<p className='font-medium'>({item.country})</p></h5>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  <Linkrouter to={`/Citie/${item.id}`} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                  </Linkrouter>
                </div>
              </div >
            )
          ) : (<p>No se econtraron resultados</p>)}
        </div >
      </div>
    </>
  )
}