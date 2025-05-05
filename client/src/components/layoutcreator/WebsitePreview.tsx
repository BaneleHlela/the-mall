import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menubar from '../storecomponents/Menubar';
import { setInitialLayout } from '../../features/layouts/layoutSettingsSlice';
import { RootState } from '../../app/store';
import RecursiveRenderer from './pages/RecursiveRenderer';
import ScribblerComponent from '../ScribblerComponent';

const WebsitePreview = () => {
  const dispatch = useDispatch();
  const layoutSettings = useSelector((state: RootState) => state.layoutSettings);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.layoutSettings) {
        dispatch(setInitialLayout(event.data.layoutSettings));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch]);

  return (
    <div>
      {/* Render your menubar */}
      <Menubar layoutSettingsFrom={layoutSettings.menubar} />

      {/* Dynamically render RecursiveRenderer for each page */}
      {layoutSettings.pages && Object.entries(layoutSettings.pages).map(([pageName, pageSettings]) => (
        <div key={pageName}>
          <RecursiveRenderer settings={pageSettings} />
        </div>
      ))}
      <ScribblerComponent />
      {/* You can remove the <p>Hey, I am the DynamicDiv</p> now */}
    </div>
  );
};

export default WebsitePreview;
