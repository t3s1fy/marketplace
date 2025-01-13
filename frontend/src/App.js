import React, { useContext, useEffect, useState } from "react";
import "./styles/index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { adminRoutes } from "./routes";
import NavBarAdmin from "./components/NavBarAdmin";
import SideBar from "./components/SideBar";
import MiniNavBar from "./components/MiniNavBar"; // Импорт массива adminRoutes

const AppContent = observer(() => {
  const location = useLocation(); // useLocation доступен внутри BrowserRouter

  // Проверяем, является ли текущий путь админским
  const isAdminRoute = adminRoutes.some(
    (route) => route.path === location.pathname,
  );

  return (
    <div className="wrapper">
      {!isAdminRoute ? <NavBar /> : <NavBarAdmin />}
      <AppRouter></AppRouter>
      {!isAdminRoute && <Footer />}
    </div>
  );
});

const App = observer(() => {
  const { user } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      user.setIsAuth(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        user.setUser(userData);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<AppContent />} />{" "}
        {/* AppContent внутри Router */}
      </Routes>
    </BrowserRouter>
  );
});

export default App;
