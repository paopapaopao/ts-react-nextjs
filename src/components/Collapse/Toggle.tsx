import clsx from 'clsx';
import { ReactNode } from 'react';
import { Button } from '..';
import useCollapse from './useCollapse';

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * TODOs:
 *  - Replace Button in Toggle with div
 */

const Toggle = ({ children, className = '' }: Props): ReactNode => {
  const { toggle } = useCollapse();

  const classNames = clsx('toggle', className);

  return (
    <Button className={classNames} onClick={toggle}>
      {children}
    </Button>
  );
};

export default Toggle;
