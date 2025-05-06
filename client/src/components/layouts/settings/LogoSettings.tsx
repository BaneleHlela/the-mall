import React from 'react';

interface LogoSettingsProps {
  logo: {
    url: string;
    text: string;
    slogan: string;
    position: {
      isAbsolute: boolean;
      height: string;
      width: string;
      border: {
        borderStyle: string;
        borderWidth: string;
        borderRadius: string;
        borderDirection: string;
        color: string;
      };
    };
  };
  onChange: (field: string, value: any) => void;
}

const LogoSettings: React.FC<LogoSettingsProps> = ({ logo, onChange }) => {
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <div className="space-y-4 p-4 border rounded-md shadow-sm bg-gray-50">
      <h3 className="text-lg font-bold">Logo Settings</h3>

      {/* Logo Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Logo Image URL</label>
        <input
          type="text"
          value={logo.url}
          onChange={handleInputChange('logo.url')}
          placeholder="Enter image URL"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Fallback Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Fallback Text</label>
        <input
          type="text"
          value={logo.text}
          onChange={handleInputChange('logo.text')}
          placeholder="Enter fallback text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Slogan */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Slogan</label>
        <input
          type="text"
          value={logo.slogan}
          onChange={handleInputChange('logo.slogan')}
          placeholder="Enter slogan (optional)"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Position Settings */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Position</label>
        <select
          value={logo.position.isAbsolute ? 'absolute' : 'static'}
          onChange={handleInputChange('logo.position.isAbsolute')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="absolute">Absolute</option>
          <option value="static">Static</option>
        </select>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Height</label>
          <input
            type="text"
            value={logo.position.height}
            onChange={handleInputChange('logo.position.height')}
            placeholder="e.g., 100px"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Width</label>
          <input
            type="text"
            value={logo.position.width}
            onChange={handleInputChange('logo.position.width')}
            placeholder="e.g., 100px"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Border Settings */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Border Settings</label>
        <input
          type="text"
          value={logo.position.border.borderStyle}
          onChange={handleInputChange('logo.position.border.borderStyle')}
          placeholder="Border style (e.g., solid)"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <input
          type="text"
          value={logo.position.border.borderWidth}
          onChange={handleInputChange('logo.position.border.borderWidth')}
          placeholder="Border width (e.g., 2px)"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <input
          type="text"
          value={logo.position.border.borderRadius}
          onChange={handleInputChange('logo.position.border.borderRadius')}
          placeholder="Border radius (e.g., 5px)"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <input
          type="text"
          value={logo.position.border.borderDirection}
          onChange={handleInputChange('logo.position.border.borderDirection')}
          placeholder="Border direction (e.g., all, top, left)"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <input
          type="color"
          value={logo.position.border.color}
          onChange={handleInputChange('logo.position.border.color')}
          className="block w-full"
        />
      </div>
    </div>
  );
};

export default LogoSettings;
