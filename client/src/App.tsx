import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutsSection from './pages/website-builder/LayoutsSection.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<LayoutsSection />} />
        {/* Removed ScribblerComponent route */}
      </Routes>
    </Router>
  );
};

export default App;
