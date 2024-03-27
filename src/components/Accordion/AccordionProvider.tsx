'use client';

import { ReactNode, useState } from 'react';
import AccordionContext from './AccordionContext';

type Props = {
  children: ReactNode;
};

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
