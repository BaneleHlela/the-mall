// context/RenderContext.tsx
import React, { createContext, useContext } from 'react';

type RenderContextType = 'live' | 'websitePreview';

const RenderContext = createContext<RenderContextType>('live');

export const useRenderContext = () => useContext(RenderContext);

interface RenderProviderProps {
  value: RenderContextType;
  children: React.ReactNode;
}

export const RenderProvider: React.FC<RenderProviderProps> = ({ value, children }) => {
  return (
    <RenderContext.Provider value={value}>
      {children}
    </RenderContext.Provider>
  );
};
