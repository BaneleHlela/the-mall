import React, { createContext, useState, ReactNode, useContext } from 'react';

interface HamburgerContextProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const HamburgerContext = createContext<HamburgerContextProps | undefined>(undefined);

export const HamburgerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(prevState => !prevState);

  return (
    <HamburgerContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </HamburgerContext.Provider>
  );
};

export const useHamburger = (): HamburgerContextProps => {
  const context = useContext(HamburgerContext);
  if (!context) {
    throw new Error('useHamburger must be used within a HamburgerProvider');
  }
  return context;
};
