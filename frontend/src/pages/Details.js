import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../data.json';
import { useState, useEffect } from 'react';



export default function Details() {
  const { id } = useParams()
  const [citie, setCitie] = useState([]);

  useEffect(() => {
    setCitie(data);
    let singleCitie = data.find(item => item.id === parseInt(id))
    setCitie(singleCitie)
  }, [id]);

  return (
    <>


      <div className="cities-container">
        <div className="cards mb-8" >

          <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-5" key={""}>
            <a href="wwww.google.com">
              <img className="rounded-t-lg img-cards" src={citie.image} alt="" />
            </a>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{citie.country}<p className='font-medium'>({citie.citie})</p></h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}