import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchStoreById } from '../../features/stores/storeSlice';
import StorePage from '../StorePage.tsx';
import PreSettings2 from './PreSettings2';
import WebsiteBuilder from './WebsiteBuilder';

const LayoutsSection: React.FC = () => {
  const dispatch = useDispatch();
  const storeId = "673b12d6bc4d7c110af208ac";

  useEffect(() => {
    if (storeId) {
      dispatch(fetchStoreById(storeId));
    }
  }, [dispatch, storeId]);

  return (
    <Routes>
      <Route path="/" element={<PreSettings2 />} />
      <Route path="/layout-creator" element={<WebsiteBuilder />} />
      <Route path="/preview" element={<StorePage storeId={storeId} />} />
    </Routes>
  );
};

export default LayoutsSection;
