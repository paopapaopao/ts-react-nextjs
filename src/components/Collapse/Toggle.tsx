'use client';

import clsx from 'clsx';
import React, { type ReactNode, useEffect } from 'react';
import { Button } from '..';
import useCollapse from './useCollapse';

interface Props {
  children: ReactNode;
  className?: string;
  isToggled?: boolean;
  onClick?: () => void;
}

/**
 * TODOs:
 *  - Replace Button in Toggle with div
 */

const Toggle = ({
  children,
  className = '',
  isToggled = false,
  onClick = () => {}
}: Props): ReactNode => {
  const { isOpen, close, toggle } = useCollapse();

  useEffect(() => {
    if (isOpen && !isToggled) {
      close();
    }
  }, [isToggled]);

  const handleClick = (): void => {
    toggle();
    onClick();
  };

  const classNames: string = clsx('toggle', className);

  return (
    <Button onClick={handleClick} className={classNames}>
      {children}
    </Button>
  );
};

export default Toggle;
