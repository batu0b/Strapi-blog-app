import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Authcontext";
import { removeToken } from "../helpers/helpers";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export default function Navbar() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");

    window.location.reload(true);
  };

  return (
    <span>
      <nav className="bg-white border-gray-200 dark:bg-gray-700 w-full">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          <a href="/" className="flex items-center">
            <img
              src="https://www.svgrepo.com/show/429852/architecture-building-busy.svg"
              className="h-6 mr-3 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Center Blog
            </span>
          </a>
          <div className="flex items-center">
            {user ? (
              <>
                <button
                  onClick={() => navigate("/BlogCreate")}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border mx-2 border-blue-700 rounded"
                >
                  Post Blog
                </button>
                <Menu>
                  <MenuHandler>
                    <Button
                      variant="gradient"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border mx-2 border-blue-700 rounded"
                    >
                      Profile
                    </Button>
                  </MenuHandler>
                  <MenuList className="bg-gray-300 dark:bg-gray-800 dark:text-white dark:border-none">
                    <MenuItem
                      className="mb-4 hover:dark:bg-gray-700 hover:bg-gray-200"
                      onClick={() => navigate("/Profile")}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      className="mt-3 hover:dark:bg-gray-700 hover:bg-gray-200"
                    >
                      {" "}
                      <span className="font-bold text-red-600">
                        Logout
                      </span>{" "}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                {" "}
                <Link
                  to={"/SignUp"}
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Login
                </Link>
                <Link
                  to={"/SignIn"}
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline ml-8"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-900 w-full">
        <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
          <div className="flex items-center"></div>
        </div>
      </nav>
    </span>
  );
}
