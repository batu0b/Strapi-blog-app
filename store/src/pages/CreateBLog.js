import React, { useCallback, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../context/Authcontext";
import axios from "axios";
export default function CreateBLog() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState();
  const { user } = useAuthContext();
  const [preUrl, setPreUrl] = useState(null);

  const handleChange = (e) => {
    setFiles(e.target.files[0]);
    setPreUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("files", files);

    try {
      await axios({
        method: "POST",
        url: "http://localhost:1338/api/upload",
        data: data,
        headers: {},
      }).then(async (res) => {
        const img = res.data[0];
        await fetch("http://localhost:1338/api/products", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            data: {
              description: body,
              title: title,
              img: img,
              yazi: value,
              users_permissions_user: user.id,
            },
          }),
        });
      });

      setBody("");
      setTitle("");
      setValue("");
      setFiles(null);
      setPreUrl(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-full">
      <Navbar />

      <div>
        <form
          className="container flex flex-col justify-center h-full"
          onSubmit={handleSubmit}
        >
          <input value={user.id} className="hidden" required />
          <span className="w-full flex justify-center">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Blog Title"
              className=" dark:bg-gray-700 w-11/12 my-2 p-3 outline-gray-600 rounded-sm  dark:outline-gray-200 dark:text-white dark:placeholder:text-white dark:placeholder:opacity-40"
              required
            />
          </span>
          <span className="w-full flex justify-center">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              type="text"
              placeholder="Blog Description"
              className=" dark:bg-gray-700 w-11/12 my-2 p-3 outline-gray-600 rounded-sm  dark:outline-gray-200 dark:text-white dark:placeholder:text-white dark:placeholder:opacity-40"
            />
          </span>
          <span className="w-full flex justify-center flex-col items-center mb-4">
            <span className="w-11/12">
              {preUrl ? (
                <img
                  src={preUrl}
                  alt=""
                  className="w-52 h-32 rounded-md m-3 "
                />
              ) : null}
            </span>
            <input
              className="block w-11/12  text-sm text-gray-900 border border-black-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              onChange={(e) => handleChange(e)}
              required
            />
            <p
              className="mt-1 text-sm w-11/12 text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              PNG or JPG .
            </p>
          </span>
          <span className="w-11/12 m-auto flex justify-center">
            <span className="w-11/12">
              <MDEditor value={value} onChange={setValue} />
              <MDEditor.Markdown
                source={value}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </span>
          </span>
          <span className="w-11/12 m-auto mt-8">
            <button
              type="submit"
              className="bg-blue-600 p-3 rounded-md text-white shadow-2xl hover:bg-blue-800 "
            >
              Submit
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}
