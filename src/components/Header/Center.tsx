import clsx from 'clsx';
import React, { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Center = ({ children, className = '' }: Props): ReactNode => {
  const classNames: string = clsx('center', 'flex-1', className);

  return <div className={classNames}>{children}</div>;
};

export default Center;
