'use client';

import { createContext } from 'react';

type Value = {
  isOpen: boolean;
  toggle: () => void;
};

const CollapseContext = createContext<Value | null>(null);

export default CollapseContext;
