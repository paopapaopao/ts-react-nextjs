import clsx from 'clsx';
import Link from 'next/link';
import React, { type ReactNode } from 'react';
import { SideBar } from '@/components';
import styles from './Profile.module.css';

interface Props {
  children: ReactNode;
}

/**
 * TODOs:
 *  - Fix Sidebar shrinking
 */

const Layout = ({ children }: Props): ReactNode => {
  const classNames: string = clsx('profile-layout', styles['profile-layout']);

  return (
    <div className={classNames}>
      <SideBar>
        <Link href="/profile/posts">Posts</Link>
        <Link href="/profile/todos">TO-DOs</Link>
      </SideBar>
      {children}
    </div>
  );
};

export default Layout;
