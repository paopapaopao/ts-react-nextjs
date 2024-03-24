import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import CollapseProvider from './CollapseProvider';
import Content from './Content';
import Toggle from './Toggle';

type Props = {
  children: ReactNode;
  className?: string;
};

interface CollapseComponent extends FC<Props> {
  Content: FC<Props>;
  Toggle: FC<Props>;
}

/**
 * TODOs:
 *  - Replace className
 */

const Collapse: CollapseComponent = ({
  children,
  className = ''
}: Props): ReactNode => {
  const classNames = clsx('collapsible', 'flex flex-col', className);

  return (
    <CollapseProvider>
      <div className={classNames}>{children}</div>
    </CollapseProvider>
  );
};

Collapse.Content = Content;
Collapse.Toggle = Toggle;

export default Collapse;
