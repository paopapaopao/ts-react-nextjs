import { ReactNode } from 'react';
import { Collapse } from '..';

type Props = {
  children: ReactNode;
  className?: string;
};

const Item = ({ children, className = '' }: Props): ReactNode => {
  return <Collapse className={className}>{children}</Collapse>;
};

export default Item;