import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";

export default function EditPage() {
  const [values, setValues] = useState({
    title: "",
    description: "",
    imgUrl: null,
  });
  const [yazi, setYazi] = useState("");
  const [files, setFiles] = useState(null);
  const [preUrl, setPreUrl] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useFetch(
    `http://localhost:1338/api/products/${id}?populate=*`
  );

  useEffect(() => {
    setValues({
      title: data?.data.attributes.title,
      description: data?.data.attributes.description,
      imgUrl: data?.data.attributes.img.data.attributes.url,
    });
    setYazi(data?.data.attributes.yazi);
    console.log(data);
  }, [data]);

  const handleChange = (e) => {
    setFiles(e.target.files[0]);
    setPreUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files) {
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
          await fetch(`http://localhost:1338/api/products/${id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              data: {
                description: values.description,
                title: values.title,
                img: img,
                yazi: yazi,
              },
            }),
          }).then(() => {
            navigate("/profile");
          });
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await fetch(`http://localhost:1338/api/products/${id}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            data: {
              description: values.description,
              title: values.title,
              yazi: yazi,
            },
          }),
        }).then(() => {
          navigate("/profile");
        });
      } catch (err) {}
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-full">
      <Navbar />

      <div>
        <form
          className="container flex flex-col justify-center h-full"
          onSubmit={handleSubmit}
        >
          <span className="w-full flex justify-center">
            <input
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              value={values.title}
              type="text"
              placeholder="Blog Title"
              className=" dark:bg-gray-700 w-11/12 my-2 p-3 outline-gray-600 rounded-sm  dark:outline-gray-200 dark:text-white dark:placeholder:text-white dark:placeholder:opacity-40"
              required
            />
          </span>
          <span className="w-full flex justify-center">
            <textarea
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
              value={values.description}
              type="text"
              placeholder="Blog Description"
              className=" dark:bg-gray-700 w-11/12 my-2 p-3 outline-gray-600 rounded-sm  dark:outline-gray-200 dark:text-white dark:placeholder:text-white dark:placeholder:opacity-40"
            />
          </span>
          <span className="w-full flex justify-center flex-col items-center mb-4">
            <span className="w-11/12"></span>

            <span className="w-11/12">
              {preUrl ? (
                <img
                  className="w-52 h-32 rounded-md m-3 "
                  src={preUrl}
                  alt=""
                />
              ) : (
                <img
                  className="w-52 h-32 rounded-md m-3 "
                  src={`http://localhost:1338${values.imgUrl}`}
                  alt=""
                />
              )}
            </span>
            <input
              onChange={handleChange}
              className="block w-11/12  text-sm text-gray-900 border border-black-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
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
              <MDEditor onChange={setYazi} value={yazi} />
              <MDEditor.Markdown
                source={yazi}
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
