import React, { useCallback, useState } from "react";
import { useAuthContext } from "../context/Authcontext";

export default function CreateReply(props) {
  const { user } = useAuthContext();

  const [body, setBody] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch("http://localhost:1338/api/subcomments", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          data: {
            name: user.username,
            text: body,
            comment: props.id,
          },
        }),
      });
      setBody("");
    },
    [user.username, body, props.id]
  );

  return (
    <>
      {user ? (
        <span className="w-full  ">
          <form
            className="flex flex-col w-full  gap-2 mt-2 text-white dark:text-black  mb-4 "
            onSubmit={(e) => {
              handleSubmit(e);
              props.show(false);
            }}
          >
            <input
              type="string"
              value={user.username}
              placeholder="Enter Display Name"
              className="dark:bg-gray-200 bg-gray-900  rounded-md p-4 outline-blue-500 hidden"
            />
            <input
              type="string"
              value={body}
              onChange={(e) => setBody(e.currentTarget.value)}
              placeholder="Enter Your Comment"
              className="dark:bg-gray-200 w-full bg-gray-900  rounded-md px-4 py-3 outline-blue-500"
            />
            <button
              disabled={body === ""}
              className="bg-blue-500 p-2 rounded-md self-start text-white "
              type="submit"
            >
              Submit Comment
            </button>
          </form>
        </span>
      ) : null}
    </>
  );
}
