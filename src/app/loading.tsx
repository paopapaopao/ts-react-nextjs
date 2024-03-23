import clsx from 'clsx';
import React, { ReactNode } from 'react';
import styles from './App.module.css';

const Loading = (): ReactNode => {
  const styleClassNames = 'py-8 flex flex-col items-center';
  const classNames = clsx(
    'loading-page',
    styleClassNames,
    styles['loading-page']
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold text-yellow-400 italic">Loading...</h1>
    </main>
  );
};

export default Loading;
