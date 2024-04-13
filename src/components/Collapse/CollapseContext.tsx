'use client';

import { createContext } from 'react';

interface Value {
  isOpen: boolean;
  close: () => void;
  toggle: () => void;
}

const CollapseContext = createContext<Value | null>(null);

export default CollapseContext;
