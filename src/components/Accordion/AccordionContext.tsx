'use client';

import { Dispatch, SetStateAction, createContext } from 'react';

type Value = {
  toggledItemIndex: number;
  setToggledItemIndex: Dispatch<SetStateAction<number>>;
};

const AccordionContext = createContext<Value | null>(null);

export default AccordionContext;
