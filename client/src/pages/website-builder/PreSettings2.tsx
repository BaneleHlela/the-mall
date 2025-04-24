import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { createLayout, getLayout } from '../../features/layouts/layoutSlice.ts';
import { setInitialLayout } from '../../features/layouts/layoutSettingsSlice.ts';
import defaultLayoutConfig from '../../utils/default_layout/defaultLayoutConfig.ts';
import { useNavigate } from 'react-router-dom';

const PreSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [layoutId, setLayoutId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const status = useSelector((state: RootState) => state.layout.status);
  const activeLayout = useSelector((state: RootState) => state.layout.activeLayout);

  const handleLoadLayout = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const result = await dispatch(getLayout(layoutId)).unwrap();
      dispatch(setInitialLayout(result));
      navigate('/layout-creator'); 
    } catch (error) {
      setErrorMsg('Failed to load layout. Please check the ID.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewLayout = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const result = await dispatch(createLayout(defaultLayoutConfig)).unwrap();
      dispatch(setInitialLayout(result)); 
      navigate('/layout-creator'); 
    } catch (error) {
      console.error('Error creating layout:', error);
      setErrorMsg('Failed to create layout.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Layout PreSettings</h2>
      <p className="text-gray-600 mb-6">
        Welcome to the website builder. Before we begin, please select whether you want to create a new layout or load a pre-built one.
      </p>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter layout ID"
          value={layoutId}
          onChange={(e) => setLayoutId(e.target.value)}
          disabled={loading}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        />
        <button
          onClick={handleLoadLayout}
          disabled={loading || !layoutId}
          className={`w-full p-2 bg-blue-500 text-white font-semibold rounded transition ${
            loading || !layoutId ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          Load Layout
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={handleCreateNewLayout}
          disabled={loading}
          className={`w-full p-2 bg-green-500 text-white font-semibold rounded transition ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
          }`}
        >
          Create New Layout
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {activeLayout && (
        <p className="text-gray-700">
          Active Layout ID: <span className="font-medium">{activeLayout._id}</span>
        </p>
      )}
    </div>
  );
};

export default PreSettings;
