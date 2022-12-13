import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BackToTop from "../components/BackToTop";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useAuthContext } from "../context/Authcontext";
import useFetch from "../hooks/useFetch";
export default function Profile() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { data, error, isLoading } = useFetch(
    `http://localhost:1338/api/products?populate=*&filters[users_permissions_user][id][$eq]=${user.id}`
  );
  console.log(user);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:1338/api/products/${id}`, {
      method: "DELETE",
    }).then((res) => {
      window.location.reload(true);
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center flex-col">
        <div className="container m-7 text-black dark:text-gray-100 bg-gray-200 dark:bg-gray-800 p-7 font-medium rounded-xl lg:w-3/4 max-h-screen overflow-y-scroll non-scrol ">
          {data?.data?.map((x) => (
            <>
              <div
                key={x.attributes.id}
                class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1"
              >
                <div class="bg-green-500 border rounded shadow p-2">
                  <div class="flex flex-row items-center">
                    <div class="flex-1 text-left pr-1">
                      <h5 class="text-white"> {x.attributes.title} </h5>
                    </div>
                    <div className="flex flex-col">
                      <button
                        onClick={() => navigate(`/edit/${x.id}/${x.title}`)}
                        className="hover:text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(x.id)}
                        className="hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <BackToTop />
    </>
  );
}
