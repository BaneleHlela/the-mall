import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store'; // Adjust the path based on your file structure
import { fetchStoreById } from '../features/stores/storeSlice';
import Menubar from '../components/storecomponents/Menubar';
import RecursiveRenderer from '../components/layoutcreator/pages/RecursiveRenderer';
// import Sidebar from "../components/storecomponents/Sidebar.tsx"; // Import the thunk

interface StorePageProps {
  storeId: string; // Expecting storeId as a prop
}

const StorePage: React.FC<StorePageProps> = ({ storeId}) => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.stores.currentStore);
  const loading = useSelector((state: RootState) => state.stores.loading);
  const error = useSelector((state: RootState) => state.stores.error);
  const layoutSettings = useSelector((state: RootState) => state.layoutSettings);

  // Dispatch the fetchStoreById action when the component mounts
  useEffect(() => {
    if (storeId) {
      dispatch(fetchStoreById(storeId)); // Fetch store by the provided storeId
    }
  }, [dispatch, storeId]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle case where store is not found or loading is complete
  if (!store) {
    return <div>No store found</div>;
  }
  console.log(layoutSettings.pages?.welcome)

  return (
    <div>
      <Menubar layoutId='67f3c49ab85a241913de1815' />
      <RecursiveRenderer settings={layoutSettings.pages?.welcome} />
      <p>{store?.name}</p>
    </div>
  );
};

export default StorePage;
