import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';
import { SideBar } from '@/components';
import styles from './Profile.module.css';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props): ReactNode => {
  const classNames = clsx('profile-layout', styles['profile-layout']);

  return (
    <div className={classNames}>
      <SideBar>
        <Link href="/profile/posts">Posts</Link>
        <Link href="/profile/albums">Albums</Link>
        <Link href="/profile/todos">TO-DOs</Link>
      </SideBar>
      {children}
    </div>
  );
};

export default Layout;
