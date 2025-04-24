import React from 'react';
import TextEditor from "./TextEditor.tsx";
import BackgroundEditor from "./components/background/BackgroundEditor.tsx";
import SpecialLinksSettings from "./SpecialLinksSettings.tsx";
import {useDispatch, useSelector} from "react-redux";
import { updateSetting } from '../../features/layouts/layoutSettingsSlice.ts';
import { RootState } from '../../app/store.ts';

interface LinksSettingsProps {
  linkItems: string[]; // Array of link items
}

const LinksSettings: React.FC<LinksSettingsProps> = ({ linkItems }) => {
  const dispatch  = useDispatch();
  const settings = useSelector((state: RootState) => state.layoutSettings);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };


  return (
      <>
        <div className="bg-slate-500 text-lg">
          Links Wide Container
          <TextEditor
              objectPath="menubar.textStyle"
              settings={settings}
              handleSettingChange={handleSettingChange}
          />
          <BackgroundEditor
              objectPath="menubar.linksStyle.wide.background"
              settings={settings}
              handleSettingChange={handleSettingChange}
          />
        </div>
        <div className="bg-blue-950 text-lg">
          Links
          <BackgroundEditor
              objectPath="menubar.linksStyle.wide.links.all.background"
              settings={settings}
              handleSettingChange={handleSettingChange}
          />
          <SpecialLinksSettings linkItems={linkItems}/>
        </div>
        <div className="bg-blue-950 text-lg">
          Mobile Links
          <BackgroundEditor
              objectPath="menubar.linksStyle.mobile"
              settings={settings}
              handleSettingChange={handleSettingChange}
          />
        </div>
      </>
  );
};

export default LinksSettings;
