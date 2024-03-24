'use client';

import clsx from 'clsx';
import { FC, ReactNode, createContext, useState } from 'react';
import Content from './Content';
import Toggle from './Toggle';

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
  Content: FC<Props>;
  Toggle: FC<Props>;
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

Collapse.Content = Content;
Collapse.Toggle = Toggle;

export default Collapse;
export { CollapseContext };
