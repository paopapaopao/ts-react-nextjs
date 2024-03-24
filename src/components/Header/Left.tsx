import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const Left = ({ children, className = '' }: Props): ReactNode => {
  const classNames = clsx('left', className);

  return <div className={classNames}>{children}</div>;
};

export default Left;