import React from "react";
import { Routes, Route } from "react-router";
import Layout from "../layouts/Layout.tsx";
import { routes } from "./routes.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map((route, i) => {
          return <Route path={route.path} index={route.index} element={route.element} key={i} />
        })}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
