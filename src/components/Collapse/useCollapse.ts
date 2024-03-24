import { useContext } from 'react';
import CollapseContext from './CollapseContext';

type Value = {
  isOpen: boolean;
  toggle: () => void;
};

const useCollapse = (): Value => {
  const context = useContext(CollapseContext);

  if (!context) {
    throw new Error('useCollapse must be used within CollapseProvider');
  }

  return context;
};

export default useCollapse;
