'use client';

import { ReactNode, useState } from 'react';
import CollapseContext from './CollapseContext';

type Props = {
  children: ReactNode;
};

const CollapseProvider = ({ children }: Props): ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (): void => setIsOpen((isOpen) => !isOpen);

  return (
    <CollapseContext.Provider value={{ isOpen, toggle }}>
      {children}
    </CollapseContext.Provider>
  );
};

export default CollapseProvider;
