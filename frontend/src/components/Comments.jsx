import React from 'react'
import '../styles/comments.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import commentsActions from '../redux/actions/commentsActions'
import itinerariesActions from '../redux/actions/itinerariesActions'
import { Transition } from '@headlessui/react'
import { Flip, toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Delete from '../images/delete.svg'
import Edit from '../images/edit.svg'






const Comments = ({ comments, data }) => {

  const [editComment, setEditComment] = useState()
  const [isShowing, setIsShowing] = useState(false)
  const dispatch = useDispatch()
  const [reload, setReload] = useState(false)
  let cityId = data.data.response.city
  const userLogin = localStorage.getItem('token')


  //FUNCION PARA BORRAR COMENTARIOS
  async function deleteComment(event) {
    let commentDelete = await dispatch(commentsActions.deleteComment(event.target.id))

    toast.success(commentDelete.data.message)
    setReload(!reload)
  }

  //FUNCION PARA MODIFICAR COMENTARIOS
  async function modifyComment(event) {
    const comment = {
      commentId: event.target.id,
      comment: editComment
    }
    let commentModify = await dispatch(commentsActions.modifyComment(comment))
    toast.success(commentModify.data.message)

    setReload(!reload)
  }

  //RE-RENDERIZADO DE LOS COMPONENTES
  useEffect(() => {
    dispatch(itinerariesActions.getItinerariesById(cityId))

    // eslint-disable-next-line
  }, [reload])

  const dataUser = useSelector(store => store.userReducer.user)



  return (

    <div className=" antialiased  mb-5">
      {/* <h3 className="mb-4 text-lg font-semibold text-white-900">Comments</h3> */}

      <div className="space-y-4">
        <div className="flex" key={comments._id}>
          <div className="flex-shrink-0 mr-3" >
            <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={comments?.user.userPhoto} alt="" />
          </div>
          <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 ">
            <p className="text-sm">
              {comments?.user.firstName}
              <span className="text-xs text-gray-400">{new Date(comments?.date).toUTCString().slice(4, -12)}</span>
            </p>
            {/* CONDICIÓN USUARIO LOGUEADO PERMITE VER BOTONES DE EDITAR Y BORRAR */}
            {userLogin && dataUser?.user.id === comments?.user._id ? <div className='text-comments '>
              <span onClick={() => setIsShowing((isShowing) => !isShowing)} onInput={(event) => setEditComment(event.currentTarget.textContent)} suppressContentEditableWarning={true} contentEditable><strong>{comments?.comment}</strong></span> <div className="flex justify-end">
                <Transition enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0" show={isShowing}><button className="rounded-full py-1 px-2 text-white"><img id={comments?._id} onClick={modifyComment} src={Edit} alt="" className='h-5 w-5' />  </button>
                  <button className="rounded-full py-1 px-2 text-white "><img id={comments?._id} onClick={deleteComment} className='h-6 w-6' src={Delete} alt="" />  </button></Transition>
              </div> </div> :
              // SI NO ESTA LOGUEADO LE SACAMOS EL CONTENT EDITABLE Y LOS BOTONES DE EDITAR Y BORRAR
              <div className='text-comments'>

                <span onClick={() => setIsShowing((isShowing) => !isShowing,)} onInput={(event) => setEditComment(event.currentTarget.textContent)} suppressContentEditableWarning={true} ><strong>{comments?.comment}</strong></span>

              </div>}

            {/* {userLogin && dataUser?.user.id === comments?.user._id ? <div className="flex justify-end">
              <Transition enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0" show={isShowing}><button id={comments?._id} onClick={modifyComment} className="rounded-full py-1 px-2 text-white bg-black"> Edit </button>
                <button id={comments?._id} onClick={deleteComment} className="rounded-full py-1 px-2 text-white bg-black"> Delete </button></Transition>
            </div> : null} */}


          </div>
        </div>
      </div>
    </div>

  )
}

export default Comments