import { Dispatch, SetStateAction, useContext } from 'react';
import AccordionContext from './AccordionContext';

interface Value {
  toggledItemIndex: number;
  setToggledItemIndex: Dispatch<SetStateAction<number>>;
}

const useAccordion = (): Value => {
  const context = useContext<Value | null>(AccordionContext);

  if (!context) {
    throw new Error('useAccordion must be used within AccordionProvider');
  }

  return context;
};

export default useAccordion;
