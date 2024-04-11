import clsx from 'clsx';
import { ReactNode } from 'react';
import useCollapse from './useCollapse';

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * TODOs:
 *  - Add transition styles
 */

const Content = ({ children, className = '' }: Props): ReactNode => {
  const { isOpen } = useCollapse();

  const classNames: string = clsx(
    'content',
    isOpen ? 'block' : 'hidden',
    className
  );

  return <div className={classNames}>{children}</div>;
};

export default Content;
