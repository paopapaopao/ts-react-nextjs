import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const Center = ({ children, className = '' }: Props): ReactNode => {
  const classNames = clsx('center', 'flex-1', className);

  return <div className={classNames}>{children}</div>;
};

export default Center;
