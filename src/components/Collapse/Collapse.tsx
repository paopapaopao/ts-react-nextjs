import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import CollapseProvider from './CollapseProvider';
import Content from './Content';
import Toggle from './Toggle';

type Props = {
  children: ReactNode;
  className?: string;
};

type ToggleProps = {
  children: ReactNode;
  className?: string;
  isToggled?: boolean;
  onClick?: () => void;
};

interface CollapseComponent extends FC<Props> {
  Content: FC<Props>;
  Toggle: FC<ToggleProps>;
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
