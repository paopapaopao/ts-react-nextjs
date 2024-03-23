'use client';

import clsx from 'clsx';
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState
} from 'react';
import { Button } from '..';

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

const Toggle = ({ children, className = '' }: Props): ReactNode => {
  const context = useContext(CollapseContext);

  if (!context) {
    throw new Error('Error');
  }

  const { toggle } = context;

  const classNames = clsx('toggle', className);

  return (
    <Button className={classNames} onClick={toggle}>
      {children}
    </Button>
  );
};

const Content = ({ children, className = '' }: Props): ReactNode => {
  const context = useContext(CollapseContext);

  if (!context) {
    throw new Error('Error');
  }

  const { isOpen } = context;

  const classNames = clsx('content', className, isOpen ? 'block' : 'hidden');

  return <div className={classNames}>{children}</div>;
};

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

export default Collapse;
