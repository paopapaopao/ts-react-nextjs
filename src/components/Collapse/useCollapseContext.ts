import { useContext } from 'react';
import { CollapseContext } from './Collapse';

type Value = {
  isOpen: boolean;
  toggle: () => void;
};

const useCollapseContext = (): Value => {
  const context = useContext(CollapseContext);

  if (!context) {
    throw new Error(
      'useCollapseContext must be used within CollapseContextProvider'
    );
  }

  return context;
};

export default useCollapseContext;
