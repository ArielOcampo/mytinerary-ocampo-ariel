import React from 'react'
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import commentsActions from '../redux/actions/commentsActions';
import itinerariesActions from '../redux/actions/itinerariesActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TextArea = ({ data }) => {
  const [inputText, setInputText] = useState("")
  const dispatch = useDispatch()
  const [reload, setReload] = useState(false)

  let oneItinerary = data?.data.response
  let cityId = data?.data.response.city

  //FUNCIÓN PARA HACER COMENTARIOS
  async function uploadComment(event) {
    event.preventDefault()
    const comment = {
      itineraryId: event.target.id,
      comment: inputText
    }
    let commentAdd = await dispatch(commentsActions.addComment(comment))
    toast.success(commentAdd.data.message)
    setInputText("")
    setReload(!reload)

  }

  useEffect(() => {
    dispatch(itinerariesActions.getItinerariesById(cityId))
    // eslint-disable-next-line
  }, [reload])

  return (
    <div className=" max-w-sm mr-10 ml-10 container-text-area">
      <textarea value={inputText} onInput={(event) => setInputText(event.target.value)} className="text-area text-xs md:text-lg h-24  border rounded-xl overflow-hidden resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-300" placeholder="Your comment here. . . ."></textarea>
      <div className="flex justify-center md:justify-end ">
        <button onClick={uploadComment} id={oneItinerary?._id} className="font-itineraries flex justify-center focus:outline-none  ml-0 md:ml-5 bg-indigo-700 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-3 md:px-6 py-2 text-sm ">Comment</button>
      </div>
    </div>
  )
}

export default TextArea