import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menubar from '../storecomponents/Menubar';
import { setInitialLayout } from '../../features/layouts/layoutSettingsSlice';
import { RootState } from '../../app/store';
import RecursiveRenderer from './pages/RecursiveRenderer';

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
      {/* render your layout using layoutSettings from Redux */}
      {/* <Menubar layoutSettingsFrom={layoutSettings}/> */}
      <RecursiveRenderer settings={layoutSettings.pages.welcome} />
      <p>Hey, I am the DynamicDiv</p>
    </div>
  );
};

export default WebsitePreview;
