import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.js";
import About from "./About.js";
import Contact from "./Contact.js";
import Posts from "./Posts";
import Login from "./Login.js";
import Counter from "./Counter";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <h1>PAGE NOT FOUND</h1>,
  },

  {
    path: "/about",
    element: <About></About>,
  },

  {
    path: "/contact",
    element: <Contact></Contact>,
  },

  {
    path: "/posts/:postId",
    element: <Posts></Posts>,
  },

  {
    path: "/posts",
    element: <h1>All Posts</h1>,
  },

  {
    path: "/Login",
    element: <Login></Login>,
  },

  {
    path: "/counter",
    element: <Counter></Counter>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
);
