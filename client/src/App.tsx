import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutsSection from './pages/website-builder/LayoutsSection.tsx';
import ScribblerComponent from "./components/ScribblerComponent.tsx";
import WebsitePreview from "./components/layoutcreator/WebsitePreview.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<LayoutsSection />} />
        <Route path="/scribbler" element={<ScribblerComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
