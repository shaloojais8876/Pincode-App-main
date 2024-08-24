import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./Components/Form";
import PostOffices from "./Components/PostOffices";

function App() {
  return (
    // Setting up the routes.
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="pincode/:pincode" element={<PostOffices />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
