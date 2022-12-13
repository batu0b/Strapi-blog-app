import React from "react";
import BackToTop from "../components/BackToTop";
import ImgCard from "../components/ImgCard";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";

export default function HomePage() {
  const { isLoading, error, data } = useFetch(
    "http://localhost:1338/api/products?populate=*"
  );

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <div className="h-full bg-gray-300 dark:bg-gray-900 w-full">
      <Navbar />
      <div className="  m-6 flex flex-row justify-around flex-wrap  justify-items-center ">
        {data.data?.map((product) => {
          const url = product.attributes.img.data.attributes.url;
          return (
            <span key={product.id}>
              <ImgCard
                id={product.id}
                title={product.attributes.title}
                description={product.attributes.description}
                imgUrl={url}
              />
            </span>
          );
        })}
      </div>
        <BackToTop/>
    </div>

  );
}
