import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../styles/comments.css";
import { DeleteSvg, EditSvg } from "../../images";
import { CommentsActions, ItinerariesActions } from "../../redux/actions";

const Comments = ({ comments, data }) => {
  const [editComment, setEditComment] = useState();
  const [isShowing, setIsShowing] = useState(false);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();

  const { city } = data.data.response;
  const userLogin = localStorage.getItem("token");

  const deleteComment = async (event) => {
    const commentDelete = await dispatch(
      CommentsActions.deleteComment(event.target.id)
    );

    toast.success(commentDelete.data.message);
    setReload(!reload);
  };

  const modifyComment = async (event) => {
    const comment = {
      commentId: event.target.id,
      comment: editComment,
    };
    const commentModify = await dispatch(
      CommentsActions.modifyComment(comment)
    );

    toast.success(commentModify.data.message);

    setReload(!reload);
  };

  useEffect(() => {
    dispatch(ItinerariesActions.getItinerariesById(city));
    // eslint-disable-next-line
  }, [reload]);

  const dataUser = useSelector((store) => store.userReducer.user);

  return (
    <div className=" antialiased  mb-5">
      <div className="space-y-4">
        <div className="flex" key={comments._id}>
          <div className="flex-shrink-0 mr-3">
            <img
              className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
              src={comments?.user?.userPhoto}
              alt="User profile"
            />
          </div>
          <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 ">
            <p className="text-sm">
              {comments?.user?.firstName}
              <span className="text-xs text-gray-400">
                {new Date(comments?.date).toUTCString().slice(4, -12)}
              </span>
            </p>
            {/* CONDICIÓN USUARIO LOGUEADO PERMITE VER BOTONES DE EDITAR Y BORRAR */}
            {userLogin && dataUser?.user?.id === comments?.user._id ? (
              <div className="text-comments ">
                <span
                  onClick={() => setIsShowing((isShowing) => !isShowing)}
                  onInput={(event) =>
                    setEditComment(event.currentTarget.textContent)
                  }
                  suppressContentEditableWarning={true}
                  contentEditable
                >
                  <strong>{comments?.comment}</strong>
                </span>{" "}
                <div className="flex justify-end">
                  <Transition
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    show={isShowing}
                  >
                    <button className="rounded-full py-1 px-2 text-white">
                      <img
                        id={comments?._id}
                        onClick={modifyComment}
                        src={EditSvg}
                        alt=""
                        className="h-5 w-5"
                      />{" "}
                    </button>
                    <button className="rounded-full py-1 px-2 text-white ">
                      <img
                        id={comments?._id}
                        onClick={deleteComment}
                        className="h-6 w-6"
                        src={DeleteSvg}
                        alt=""
                      />{" "}
                    </button>
                  </Transition>
                </div>{" "}
              </div>
            ) : (
              // Not log
              <div className="text-comments">
                <span
                  onClick={() => setIsShowing((isShowing) => !isShowing)}
                  onInput={(event) =>
                    setEditComment(event.currentTarget.textContent)
                  }
                  suppressContentEditableWarning={true}
                >
                  <strong>{comments?.comment}</strong>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
