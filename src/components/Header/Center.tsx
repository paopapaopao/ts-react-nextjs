import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const Center = ({ children, className = '' }: Props): ReactNode => {
  const styleClassNames = 'flex-1 flex justify-center';
  const classNames = clsx('center', styleClassNames, className);

  return <div className={classNames}>{children}</div>;
};

export default Center;
