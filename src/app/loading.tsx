import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './App.module.css';

const Loading = (): ReactNode => {
  const classNames = clsx(
    'loading-page',
    styles['loading-page'],
    'py-8 flex flex-col items-center'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold text-yellow-400 italic">Loading...</h1>
    </main>
  );
};

export default Loading;
