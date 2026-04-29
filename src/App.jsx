// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Login from "./components/Login";

import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/feed";
import Card from "./components/Card";
import Connections from "./components/connections";
import Request from "./components/Request";
import Signup from "./components/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/feed",
        element: <Feed/>,
      },
      {
        path: "/connections",
        element: <Connections/>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup/>,
      },
      {
        path: "/request",
        element: <Request />,
      },
      {
        path: "/card",
        element: <Card />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
