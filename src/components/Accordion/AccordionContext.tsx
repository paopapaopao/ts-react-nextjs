'use client';

import { type Dispatch, type SetStateAction, createContext } from 'react';

interface Value {
  toggledItemIndex: number;
  setToggledItemIndex: Dispatch<SetStateAction<number>>;
}

const AccordionContext = createContext<Value | null>(null);

export default AccordionContext;
