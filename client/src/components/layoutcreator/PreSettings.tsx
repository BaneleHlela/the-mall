import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setInitialLayout } from '../../features/layouts/layoutSettingsSlice';
import { getLayout, createLayout } from '../../features/layouts/layoutSlice';
import { Layout } from '../../types/layoutTypes';
import defaultLayoutConfig from '../../utils/default_layout/defaultLayoutConfig';

const PreSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [layoutId, setLayoutId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const status = useSelector((state: RootState) => state.layout.status);
  const activeLayout = useSelector((state: RootState) => state.layout.activeLayout);

  const handleLoadLayout = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const result = await dispatch(getLayout(layoutId)).unwrap();
      dispatch(setInitialLayout(result)); // assuming menubar is part of Layout
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
      const newLayout: Layout = {
        name: 'New Layout',
        menubar: defaultLayoutConfig,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Layout;

      const result = await dispatch(createLayout(newLayout)).unwrap();
      dispatch(setInitialLayout(result));
    } catch (error) {
      setErrorMsg('Failed to create layout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Layout PreSettings</h2>
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Enter layout ID"
          value={layoutId}
          onChange={(e) => setLayoutId(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleLoadLayout} disabled={loading || !layoutId}>
          Load Layout
        </button>
      </div>

      <div>
        <button onClick={handleCreateNewLayout} disabled={loading}>
          Create New Layout
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {activeLayout && <p>Active Layout ID: {activeLayout._id}</p>}
    </div>
  );
};

export default PreSettings;
