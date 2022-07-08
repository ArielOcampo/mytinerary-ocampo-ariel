import React from 'react'
import '../styles/comments.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import commentsActions from '../redux/actions/commentsActions'
import itinerariesActions from '../redux/actions/itinerariesActions'



const Comments = ({ comments }) => {
  const [inputText, setInputText] = useState("")
  const [editComment, setEditComment] = useState()
  const [focus, setFocus] = useState(false)

  const dispatch = useDispatch()
  const [reload, setReload] = useState(false)

  let cityId = comments.data.response.city
  let oneItinerary = comments?.data.response
  let comment = oneItinerary?.comments
  console.log(comment)


  //FUNCIÓN PARA HACER COMENTARIOS
  async function uploadComment(event) {
    event.preventDefault()
    const comment = {
      itineraryId: event.target.id,
      comment: inputText
    }
    dispatch(commentsActions.addComment(comment))
    setInputText("")
    setReload(!reload)


  }
  async function deleteComment(event) {
    await dispatch(commentsActions.deleteComment(event.target.id))
    setReload(!reload)
  }

  async function modifyComment(event) {
    const comment = {
      commentId: event.target.id,
      comment: editComment
    }

    await dispatch(commentsActions.modifyComment(comment))

    setReload(!reload)
  }
  useEffect(() => {
    dispatch(itinerariesActions.getItinerariesById(cityId))

    // eslint-disable-next-line
  }, [reload])

  const handleInputFocus = () => {
    setFocus(true);
  }

  return (
    <div class="container antialiased mx-auto max-w-screen-sm w-full">
      <h3 class="mb-4 text-lg font-semibold text-white-900">Comments</h3>

      <div class="space-y-4">
        {comment?.map(item =>
          <div class="flex">

            <div class="flex-shrink-0 mr-3">
              <img class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={item?.user.userPhoto} alt="" />
            </div>
            <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
              <p class="text-sm">
                {item?.user.firstName}
                <span class="text-xs text-gray-400">{new Date(item?.date).toUTCString().slice(4, -12)}</span>
              </p>

              <span onFocus={handleInputFocus} onInput={(event) => setEditComment(event.currentTarget.textContent)} suppressContentEditableWarning={true} contentEditable><strong>{item?.comment}</strong></span>
              {focus ? <div class="flex justify-end">

                <button id={item?._id} onClick={modifyComment} class="rounded-full py-1 px-2 text-white bg-black"> Edit </button>
                <button id={item?._id} onClick={deleteComment} class="rounded-full py-1 px-2 text-white bg-black"> Delete </button>
              </div> : null}

            </div>
          </div>)}
        <div class="w-full max-w-sm mx-auto">
          <textarea value={inputText} onInput={(event) => setInputText(event.target.value)} class="h-24 w-full border rounded-xl overflow-hidden resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-300" placeholder="Your comment here. . . ."></textarea>
          <div class="flex justify-end">
            <button onClick={uploadComment} id={oneItinerary?._id} class="rounded-full py-1 px-2 text-white bg-black">Comment</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments