import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './SideBar.module.css';

interface Props {
  children: ReactNode;
  className?: string;
}

/**
 * *NOTEs
 *  - Left Sidebar
 */

const SideBar = ({ children, className = '' }: Props): ReactNode => {
  const classNames: string = clsx(
    'side-bar',
    styles['side-bar'],
    'sticky p-8 flex flex-col gap-8 bg-zinc-800 border-r whitespace-nowrap',
    className
  );

  return <div className={classNames}>{children}</div>;
};

export default SideBar;
