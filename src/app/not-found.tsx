'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { type ReactNode } from 'react';
import { Button } from '@/components';
import styles from './App.module.css';

const NotFound = (): ReactNode => {
  const { back, push } = useRouter();

  const classNames: string = clsx(
    'not-found-page',
    styles['not-found-page'],
    'p-8 flex flex-col items-center gap-8'
  );

  const handleClick = (): void => {
    push('/');
  };

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold text-red-600">Not Found</h1>
      <p className="text-lg">Could not find requested resource</p>
      <div className="flex gap-4">
        <Button onClick={back}>Return to previous page</Button>
        <Button onClick={handleClick}>Go to Home page</Button>
      </div>
    </main>
  );
};

export default NotFound;
