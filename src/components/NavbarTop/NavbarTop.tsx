import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

const NavbarTop = (): ReactNode => {
  const classNames = clsx(
    'navbar-top',
    'flex-1 px-8 py-4 flex justify-evenly gap-4'
  );

  return (
    <nav className={classNames}>
      <Link href="/profile">Profile</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/comments">Comments</Link>
      <Link href="/albums">Albums</Link>
      <Link href="/photos">Photos</Link>
      <Link href="/todos">Todos</Link>
      <Link href="/users">Users</Link>
    </nav>
  );
};

export default NavbarTop;
