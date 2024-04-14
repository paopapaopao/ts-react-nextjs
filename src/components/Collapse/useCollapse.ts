import { useContext } from 'react';
import CollapseContext from './CollapseContext';

interface Value {
  isOpen: boolean;
  close: () => void;
  toggle: () => void;
}

const useCollapse = (): Value => {
  const context = useContext<Value | null>(CollapseContext);

  if (context === null) {
    throw new Error('useCollapse must be used within CollapseProvider');
  }

  return context;
};

export default useCollapse;
