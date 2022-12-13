import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API } from "../constant";
import { useAuthContext } from "../context/Authcontext";
import { setToken } from "../helpers/helpers";

export default function SignUp() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const {setUser} = useAuthContext()

  const navigate = useNavigate();

  useEffect(() => {
    console.log(mail);
    console.log(password);
  }, [mail, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const value = {
        identifier: mail,
        password: password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();

      if (data?.error) {
          setErr(data?.error.message);
      }
      else{
        setToken(data.jwt);

        setUser(data.user);

        navigate("/", {replace: true});
      }
     
    } catch (err) {
      setErr(err);
      console.log("hata: " + err);

    }
  };



  return (
    <>

      <Navbar/>
      <section class="bg-gray-300 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    onChange={(e) => setMail(e.currentTarget.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setPassword(e.currentTarget.value)}

                  />
                </div>

                <div class="flex items-start"></div>
                {err ? <span className="text-red-600 ">{err}</span> : null}
                <button
                  type="submit"
                  class="w-full  bg-gray-700 text-white bg-primary-600 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-300 dark:hover:bg-gray-100 dark:focus:ring-primary-800 dark:text-black"
                >
                  Login To Your Account
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't you have an account yet?{" "}
                  <Link
                    to="/SignIn"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2"
                  >
                    Register Here{" "}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
