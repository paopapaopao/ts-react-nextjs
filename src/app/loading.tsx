import clsx from 'clsx';
import { type ReactNode } from 'react';
import styles from './App.module.css';

const Loading = (): ReactNode => {
  const classNames: string = clsx(
    'loading-page',
    styles['loading-page'],
    'p-8 flex flex-col items-center'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold text-yellow-400 italic">Loading...</h1>
    </main>
  );
};

export default Loading;
