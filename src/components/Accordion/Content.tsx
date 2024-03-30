import { ReactNode } from 'react';
import CollapseContent from '../Collapse/Content';

type Props = {
  children: ReactNode;
  className?: string;
};

const Content = ({ children, className = '' }: Props): ReactNode => {
  return <CollapseContent className={className}>{children}</CollapseContent>;
};

export default Content;