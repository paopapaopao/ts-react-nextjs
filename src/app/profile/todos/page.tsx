'use client';

import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';
import type { Todo } from '@/types';
import { capitalizeFirstLetter } from '@/utils';

const USER_ID: number = 1;

const UserTodos = (): ReactNode => {
  const [userTodos, setUserTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchUserTodos = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${USER_ID}/todos`
        );

        if (!response.ok) {
          throw new Error('An error occurred while getting user todos.');
        }

        const userTodos = await response.json();

        setUserTodos(userTodos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserTodos();
  }, []);

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

export default UserTodos;
