'use client';

import React, { type ReactNode, useState } from 'react';
import AccordionContext from './AccordionContext';

interface Props {
  children: ReactNode;
}

const AccordionProvider = ({ children }: Props): ReactNode => {
  const [toggledItemIndex, setToggledItemIndex] = useState<number>(-1);

  return (
    <AccordionContext.Provider
      value={{ toggledItemIndex, setToggledItemIndex }}
    >
      {children}
    </AccordionContext.Provider>
  );
};

export default AccordionProvider;
