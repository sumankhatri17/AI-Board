import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Room from "./components/Room";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<h1>Welcome to the Homepage</h1>} />

        {/* Route for the Room */}
        <Route path="/Room" element={<Room />} />
      </Routes>
    </Router>
  );
};

export default App;