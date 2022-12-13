import MDEditor from "@uiw/react-md-editor";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import BackToTop from "../components/BackToTop";
import Comment from "../components/CreateComment";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ShowComments from "../components/ShowComments";
import { useAuthContext } from "../context/Authcontext";
import useFetch from "../hooks/useFetch";
export default function BlogPage() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { data, isLoading, error } = useFetch(
    `http://localhost:1338/api/products/${id}?populate=*`
  );
  console.log(data?.data?.attributes?.comments.data);

  if (isLoading) {
    <Loader />;
  }
  if (error) {
    <h1 className="text-white">{error}</h1>;
  }
  
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center flex-col">
        <div className="container m-7 text-black dark:text-gray-100 bg-gray-200 dark:bg-gray-800 p-7 font-medium rounded-xl lg:w-3/4 ">
          
          <h1 className="text-5xl text-center mb-4 ">
            {" "}
            {data?.data.attributes.title}{" "}
          </h1>
          <h1 className="text-lg text-center mb-12">
            {" "}
            {data?.data.attributes.description}{" "}
          </h1>
          <p className="m-2 font-bold"> <span className="mr-1 font-normal">Auhtor:</span> {data?.data?.attributes?.users_permissions_user.data.attributes.username} <span className="mx-2 font-normal">Date:</span> {data?.data?.attributes?.createdAt} </p>
          <MDEditor.Markdown
            className="text-lg p-12 rounded-xl"
           
            source={data?.data.attributes.yazi}
          
          />
            {user ? (
              <Comment id={data?.data?.id} name={user.username}  />
            ) : (
              <h1 className="text-red-600">
                Please login or register to be able to comment
              </h1>
            )}

            <ShowComments id={data?.data?.id} />

            

        </div>
      </div>
      <BackToTop/>
    </>
  );
}
