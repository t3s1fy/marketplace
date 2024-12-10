import React, { useContext, useEffect, useState } from "react";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { observer } from "mobx-react-lite";
import { Context } from "./index";

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
  }, [user]);
  return (
    <BrowserRouter>
      <div className="wrapper">
        <NavBar />
        <AppRouter />
        <Footer />
      </div>
    </BrowserRouter>
  );
});

export default App;
