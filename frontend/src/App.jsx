import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Room from "./components/Room";
import Dashboard from "./components/Dashboard";
import Toolbar from './components/Toolbar';
import CanvasRoot from './components/Infinite Canvas/CanvasRoot';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Room />} />

        <Route path="/Room" element={<Room />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Toolbar" element={<Toolbar />} />
        <Route path="/CanvasRoot" element={<CanvasRoot />} />
      </Routes>
    </Router>
  );
};

export default App;
