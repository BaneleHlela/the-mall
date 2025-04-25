import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreById } from '../../features/stores/storeSlice';
import StorePage from '../StorePage.tsx';
import PreSettings2 from './PreSettings2';
import WebsiteBuilder from './WebsiteBuilder';
import WebsitePreview from "../../components/layoutcreator/WebsitePreview.tsx";
import { RootState } from "../../app/store.ts";

const LayoutsSection: React.FC = () => {
  const dispatch = useDispatch();
  const storeId = "673b12d6bc4d7c110af208ac";
  const settings = useSelector((state: RootState) => state.layoutSettings);

  useEffect(() => {
    if (storeId) {
      dispatch(fetchStoreById(storeId));
    }
  }, [storeId]);

  useEffect(() => {
    const iframe = document.querySelector('iframe');
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ layoutSettings: settings }, '*');
    }
  }, [settings]);
  

  return (
    <Routes>
      <Route path="/" element={<PreSettings2 />} />
      <Route path="/layout-creator" element={<WebsiteBuilder />} />
      <Route path="/layout-creator/preview" element={<WebsitePreview />} />
    </Routes>
  );
};

export default LayoutsSection;
