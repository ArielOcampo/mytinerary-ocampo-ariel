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
    <div className="w-full max-w-sm mx-auto">
      <textarea value={inputText} onInput={(event) => setInputText(event.target.value)} className="h-24 w-full border rounded-xl overflow-hidden resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-300" placeholder="Your comment here. . . ."></textarea>
      <div className="flex justify-end">
        <button onClick={uploadComment} id={oneItinerary?._id} className="rounded-full py-1 px-2 text-white bg-black">Comment</button>
      </div>
    </div>
  )
}

export default TextArea