import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuthContext } from "../context/Authcontext";
import EditPage from "../pages/EditPage";

const BlogPage = React.lazy(() => import("../pages/BlogPage"));
const HomePage = React.lazy(() => import("../pages/HomePage"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const SignUp = React.lazy(() => import("../pages/signUp"));
const CreateBLog = React.lazy(() => import("../pages/CreateBLog"));
const Profile = React.lazy(() => import("../pages/Profile"));

export default function Main() {
  const { user } = useAuthContext();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<Loader />}>
              <HomePage />
            </React.Suspense>
          }
        />
        <Route
          path="/Blogs/:id"
          element={
            <React.Suspense fallback={<Loader />}>
              <BlogPage />
            </React.Suspense>
          }
        />

        {user ? (
          <>
            <Route
              path="/BlogCreate"
              element={
                <React.Suspense fallback={<Loader />}>
                  <CreateBLog />
                </React.Suspense>
              }
            />
            <Route
              path="/Profile"
              element={
                <React.Suspense fallback={<Loader />}>
                  <Profile />
                </React.Suspense>
              }
            />

            <Route
              path="/edit/:id/:name"
              element={
                <React.Suspense fallback={<Loader />}>
                  <EditPage />
                </React.Suspense>
              }
            />
          </>
        ) : (
          <>
            <Route
              path="/SignIn"
              element={
                <React.Suspense fallback={<Loader />}>
                  <SignIn />
                </React.Suspense>
              }
            />
            <Route
              path="/SignUp"
              element={
                <React.Suspense fallback={<Loader />}>
                  <SignUp />
                </React.Suspense>
              }
            />
          </>
        )}
      </Routes>
    </>
  );
}
