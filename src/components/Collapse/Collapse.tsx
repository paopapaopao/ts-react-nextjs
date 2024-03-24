'use client';

import clsx from 'clsx';
import { FC, ReactNode, createContext, useContext, useState } from 'react';
import Toggle from './Toggle';
import Content from './Content';

/**
 * TODOs:
 *  - Replace Button in Toggle with div
 */

type Props = {
  children: ReactNode;
  className?: string;
};

type Value = {
  isOpen: boolean;
  toggle: () => void;
};

interface CollapseComponent extends FC<Props> {
  Toggle: FC<Props>;
  Content: FC<Props>;
}

const CollapseContext = createContext<Value | null>(null);

const Collapse: CollapseComponent = ({
  children,
  className = ''
}: Props): ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const styleClassNames = 'flex flex-col';
  const classNames = clsx('collapse-pao', styleClassNames, className);

  const toggle = (): void => setIsOpen((isOpen) => !isOpen);

  return (
    <CollapseContext.Provider value={{ isOpen, toggle }}>
      <div className={classNames}>{children}</div>
    </CollapseContext.Provider>
  );
};

Collapse.Toggle = Toggle;
Collapse.Content = Content;

const useCollapseContext = (): Value => {
  const context = useContext(CollapseContext);

  if (!context) {
    throw new Error(
      'useCollapseContext must be used within CollapseContextProvider'
    );
  }

  return context;
};

export default Collapse;
export { CollapseContext, useCollapseContext };
