import clsx from 'clsx';
import { ReactNode } from 'react';
import { Button } from '..';
import useCollapseContext from './useCollapseContext';

type Props = {
  children: ReactNode;
  className?: string;
};

const Toggle = ({ children, className = '' }: Props): ReactNode => {
  const { toggle } = useCollapseContext();

  const classNames = clsx('toggle', className);

  return (
    <Button className={classNames} onClick={toggle}>
      {children}
    </Button>
  );
};

export default Toggle;
