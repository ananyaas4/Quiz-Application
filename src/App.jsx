import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result/:userId" element={<Result />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;