'use client';

import { ReactNode, useState } from 'react';
import CollapseContext from './CollapseContext';

type Props = {
  children: ReactNode;
};

const CollapseProvider = ({ children }: Props): ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (): void => setIsOpen((isOpen) => !isOpen);
  const close = (): void => setIsOpen(false);

  return (
    <CollapseContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </CollapseContext.Provider>
  );
};

export default CollapseProvider;
