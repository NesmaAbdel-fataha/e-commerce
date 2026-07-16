import { createHashRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Movie from "./components/Movie";
import Details from "./components/Details";
import Favorites from "./components/Favorites";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";

const basename =
  import.meta.env.BASE_URL && import.meta.env.BASE_URL !== "/"
    ? import.meta.env.BASE_URL.replace(/\/$/, "")
    : undefined;

export const router = createHashRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "movies", element: <Movie /> },
        { path: "movies/:id", element: <Details /> },
        {
          path: "favorites",
          element: (
            <RequireAuth>
              <Favorites />
            </RequireAuth>
          ),
        },
        { path: "login", element: <Login /> },
      ],
    },
  ]
);




