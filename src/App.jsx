import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import Todo from "./components/Todo";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/" element={<Todo />} />
      </Routes>
    </div>
  );
};

export default App;
