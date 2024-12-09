import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Room from "./components/Room";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<h1>James madarchod</h1>} />

        {/* Route for the Room */}
        <Route path="/Room" element={<Room />} />
        <Route path="/Dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
};

export default App;