import React, { useCallback, useState } from 'react'

export default function Comment(props) {

    const [body , setBody] = useState("");
    

    const handleSubmit = useCallback( async (e) => {
        e.preventDefault();
        await fetch("http://localhost:1338/api/comments" , {
            method: "POST",
            headers: {"Content-type": "application/json" },
            body: JSON.stringify({
                data: {
                    name: props.name,
                    text: body,
                    product: props.id,
                }
            })
        });
        setBody("");
    } , [props.name , body , props.id ])
    
  return (
   <form className='flex flex-col max-w-md gap-4 mt-2 text-white dark:text-black  mb-4 mt-12' onSubmit={handleSubmit}>
    <input  type="string" value={props.name}  placeholder='Enter Display Name' className='dark:bg-gray-200 bg-gray-900  rounded-md p-4 outline-blue-500'  />
    <textarea  type="string" value={body} onChange={(e) => setBody(e.currentTarget.value) }  placeholder='Enter Your Comment' className='dark:bg-gray-200 bg-gray-900  rounded-md p-4 outline-blue-500'/>
    <button disabled={ body === ""} className='bg-blue-500 p-4 rounded-md self-start text-white ' type='submit'>Submit Comment</button>
   </form>
  )
}
