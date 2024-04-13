'use client';

import { type ReactNode, useState } from 'react';
import CollapseContext from './CollapseContext';

interface Props {
  children: ReactNode;
}

const CollapseProvider = ({ children }: Props): ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (): void => setIsOpen((isOpen) => !isOpen);
  const close = (): void => setIsOpen(false);

  return (
    <CollapseContext.Provider value={{ isOpen, close, toggle }}>
      {children}
    </CollapseContext.Provider>
  );
};

export default CollapseProvider;
