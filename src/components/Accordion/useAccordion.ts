import { type Dispatch, type SetStateAction, useContext } from 'react';
import AccordionContext from './AccordionContext';

interface Value {
  toggledItemIndex: number;
  setToggledItemIndex: Dispatch<SetStateAction<number>>;
}

const useAccordion = (): Value => {
  const context = useContext<Value | null>(AccordionContext);

  if (context === null) {
    throw new Error('useAccordion must be used within AccordionProvider');
  }

  return context;
};

export default useAccordion;
