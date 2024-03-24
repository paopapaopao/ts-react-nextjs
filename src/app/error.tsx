'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Button } from '@/components';
import styles from './App.module.css';

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props): ReactNode => {
  const router = useRouter();

  const classNames = clsx(
    'error-page',
    styles['error-page'],
    'py-8 flex flex-col items-center gap-8'
  );

  const handleClick = (): void => router.push('/');

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold text-red-600">Error</h1>
      <p className="text-lg">
        {error.name}: {error.message}
      </p>
      <Button onClick={reset}>Try again</Button>
      <div className="flex gap-4">
        <Button onClick={handleClick}>Go to Home page</Button>
        <Button onClick={router.back}>Return to previous page</Button>
      </div>
    </main>
  );
};

export default Error;
