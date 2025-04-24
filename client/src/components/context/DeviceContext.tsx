// components/context/DeviceContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Device = 'mobile' | 'tablet' | 'desktop';

interface DeviceContextProps {
  device: Device;
  setDevice: (device: Device) => void;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

export const useDevice = (): DeviceContextProps => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};

export const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [device, setDevice] = useState<Device>('mobile');
  return (
    <DeviceContext.Provider value={{ device, setDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};
