import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { adminRoutes, authRoutes, publicRoutes, sellerRoutes } from "../routes";
import { LOGIN_ROUTE, PAGE_NOT_FOUND_ROUTE } from "../utils/consts";
import { Context } from "../index";

const AppRouter = () => {
  const { user } = useContext(Context);

  console.log(user);
  return (
    <Routes>
      {user.isAdmin &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {(user.isSeller || user.isAdmin) &&
        sellerRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {(user.isAuth || user.isSeller || user.isAdmin) &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      {!user.isAuth && (
        <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
      )}

      <Route path="*" element={<Navigate to={PAGE_NOT_FOUND_ROUTE} />} />
    </Routes>
  );
};

export default AppRouter;
