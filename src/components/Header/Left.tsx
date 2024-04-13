import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Left = ({ children, className = '' }: Props): ReactNode => {
  const classNames: string = clsx('left', className);

  return <div className={classNames}>{children}</div>;
};

export default Left;
