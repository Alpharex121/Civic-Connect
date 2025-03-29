import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import ReactDOM from "react-dom/client";
import Homepage from "./components/Homepage/Homepage.jsx";
import SignUp from "./components/Auth/SignUp.jsx";
import SignIn from "./components/Auth/SignIn.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import CorporationPanel from "./components/CorporationPanel/CorporationPanel.jsx";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path:"/signup",
        element:<SignUp/>,
      },
      {
        path:"/signin",
        element:<SignIn/>,
      },
      {
        path:"/user",
        element:<UserDashboard/>,
      },
      {
        path:"/corporation",
        element:<CorporationPanel/>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <RouterProvider router={appRouter} />
  </>
  // </React.StrictMode>,
);
