import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const Right = ({ children, className = '' }: Props): ReactNode => {
  const classNames: string = clsx('right', className);

  return <div className={classNames}>{children}</div>;
};

export default Right;
