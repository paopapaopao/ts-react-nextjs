import clsx from 'clsx';
import { ReactNode } from 'react';
import useCollapseContext from './useCollapseContext';

type Props = {
  children: ReactNode;
  className?: string;
};

const Content = ({ children, className = '' }: Props): ReactNode => {
  const { isOpen } = useCollapseContext();

  const classNames = clsx('content', className, isOpen ? 'block' : 'hidden');

  return <div className={classNames}>{children}</div>;
};

export default Content;
