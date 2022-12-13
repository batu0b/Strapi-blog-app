import React, { useState } from "react";
import { useAuthContext } from "../context/Authcontext";
import CreateReply from "./CreateReply";
export default function ComCom({ comment }) {
  const [show, setShow] = useState(false);
  const [subShow, setSubShow] = useState(false);
  const { user } = useAuthContext();


  const handleShow = () => {
    setShow(!show);
    setSubShow(true);

  }
  const handleSubShow = () => {
    setSubShow(!subShow);
  }

  

  return (
    <>
      <article
        key={comment.id}
        className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900"
      >
        <footer class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              {comment.attributes.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <p>{comment.attributes.createdAt}</p>
            </p>
          </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">
          {comment.attributes.text}
        </p>
        <div className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
            onClick={handleShow}
            disabled={!user}
          >
            <svg
              aria-hidden="true"
              class="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            Reply
          </button>
          <button
            type="button"
            class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
            onClick={handleSubShow}
          >
            <svg
              aria-hidden="true"
              class="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            Show Subcomments
          </button>
        </div>
      </article>

      {show  ? <CreateReply show={handleShow} id={comment.id}  /> : null}

      {subShow ? comment?.attributes.subcomments.data.map((x) => (
        <article
          key={x.id}
          className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900"
        >
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                {x.attributes.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {x.attributes.createdAt}
              </p>
            </div>
          </footer>
          <p className="text-gray-500 dark:text-gray-400">
            {x.attributes.text}
          </p>
        </article>
      )) : null}

     
    </>
  );
}
