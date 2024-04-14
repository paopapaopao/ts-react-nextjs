import clsx from 'clsx';
import Link from 'next/link';
import { type ReactNode } from 'react';

const TopBar = (): ReactNode => {
  const classNames: string = clsx(
    'top-bar',
    'flex-1 px-8 py-4 flex justify-evenly gap-4 bg-zinc-800'
  );

  return (
    <nav className={classNames}>
      <Link href="/" className="">
        Home
      </Link>
      <Link href="/profile">Profile</Link>
      <Link href="/users">Users</Link>
    </nav>
  );
};

export default TopBar;
