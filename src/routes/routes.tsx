import React from "react"
import Home from "../views/Home.tsx";
import CartList from "../views/CartList.tsx";
import { RouteProps } from "react-router";

export const routes: RouteProps[] = [
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/cart",
    element: <CartList />,
  }
];
