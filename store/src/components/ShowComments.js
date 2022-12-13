import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import ComCom from "./Comment";

export default function ShowComments({ id }) {
  const { data, error, isLoading } = useFetch(
    `http://localhost:1338/api/comments?populate=*&filters[product][id][$eq]=${id}`
  );

  console.log(data?.data);

  return (
    <div >
      {data?.data?.map((comment) => (
        <ComCom comment={comment} />
      ))}
    </div>
  );
}
