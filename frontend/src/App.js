import React from "react";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <NavBar />
        <AppRouter />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
