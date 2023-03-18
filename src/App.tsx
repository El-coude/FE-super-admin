import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Signin, Dashboard } from "./routes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
