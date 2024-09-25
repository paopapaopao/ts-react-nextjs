import clsx from 'clsx';
import React from 'react';
import { getUserTodos } from '@/apis';
import { type Todo } from '@/types';
import { capitalizeFirstLetter } from '@/utils';

const USER_ID: number = 1;

const Page = async (): Promise<JSX.Element> => {
  const userTodos: Todo[] = await getUserTodos(USER_ID);

  const classNames: string = clsx(
    'user-todos-page',
    'p-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold">TO-DOs</h1>
      {userTodos.map((userTodo: Todo) => (
        <div key={userTodo.id} className="self-start flex gap-4">
          <input type="checkbox" checked={userTodo.completed} />
          <span className={userTodo.completed ? 'line-through' : ''}>
            {capitalizeFirstLetter(userTodo.title)}
          </span>
        </div>
      ))}
    </main>
  );
};

export default Page;
