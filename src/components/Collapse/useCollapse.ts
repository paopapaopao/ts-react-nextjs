import { useContext } from 'react';
import CollapseContext from './CollapseContext';

type Value = {
  isOpen: boolean;
  close: () => void;
  toggle: () => void;
};

const useCollapse = (): Value => {
  const context = useContext<Value | null>(CollapseContext);

  if (!context) {
    throw new Error('useCollapse must be used within CollapseProvider');
  }

  return context;
};

export default useCollapse;
