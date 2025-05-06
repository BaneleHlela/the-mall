import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateSetting } from '../../../features/layouts/layoutSettingsSlice.ts';
import { RootState } from '../../../app/store.ts';
import UploadLogo from '../../UploadLogo.tsx';
import BackgroundEditor from "./background/BackgroundEditor.tsx";
import TextEditor from "./text/TextEditor.tsx";

const LogoSettings: React.FC = ({ storeId }) => {
    const dispatch = useDispatch();
    const settings = useSelector((state: RootState) => state.layoutSettings);

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    return (
        <div className="bg-blue-400 p-7">
            <h1 className="text-9xl">Logo Settings</h1>
            <UploadLogo storeId={storeId} />
            <div>
                <label>Position</label>
                <select
                    value={settings.menubar.logoStyle.placement.isAbsolute ? 'absolute' : 'static'}
                    onChange={(e) =>
                        handleSettingChange('menubar.logoStyle.placement.isAbsolute', e.target.value === 'absolute')
                    }
                >
                    <option value="absolute">Absolute</option>
                    <option value="static">Static</option>
                </select>
                <span>top</span>
                <input
                    type="text"
                    placeholder="top (e.g., 150px)"
                    value={settings.menubar.logoStyle.placement.topMargin}
                    onChange={(e) => handleSettingChange('menubar.logoStyle.placement.topMargin', e.target.value)}
                />
            </div>
            <BackgroundEditor
                objectPath="menubar.logoStyle.background"
                settings={settings}
                handleSettingChange={handleSettingChange}
            />
            <TextEditor
                objectPath="menubar.logoStyle.text"
                settings={settings}
                handleSettingChange={handleSettingChange}
            />
            <div>
                <label>Border Settings</label> <br />
                <div>
                    <label>Border Direction</label>
                    <input
                        type="text"
                        value={settings?.menubar?.logoStyle?.border?.borderDirection}
                        onChange={(e) =>
                            handleSettingChange('menubar.logoStyle.border.borderDirection', e.target.value)
                        }
                        placeholder="e.g., all, top, right, bottom, left"
                    />
                </div>

                <input
                    type="text"
                    placeholder="Border Style (e.g., solid)"
                    value={settings?.menubar?.logoStyle?.border?.borderStyle}
                    onChange={(e) => handleSettingChange('menubar.logoStyle.border.borderStyle', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Border Width (e.g., 2px)"
                    value={settings?.menubar?.logoStyle?.border?.borderWidth}
                    onChange={(e) => handleSettingChange('menubar.logoStyle.border.borderWidth', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Border Radius (e.g., 8px)"
                    value={settings?.menubar?.logoStyle?.border?.borderRadius}
                    onChange={(e) => handleSettingChange('menubar.logoStyle.border.borderRadius', e.target.value)}
                />
                <input
                    type="color"
                    value={settings?.menubar?.logoStyle?.border?.color}
                    onChange={(e) => handleSettingChange('menubar.logoStyle.border.color', e.target.value)}
                />
            </div>
        </div>
    );
};

export default LogoSettings;
