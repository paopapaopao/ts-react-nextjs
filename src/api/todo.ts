import type { Todo } from '@/types';

const getTodos = async (userId: number): Promise<Todo[]> => {
  let todos: Todo[] = [];

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting todos.');
    }

    todos = await response.json();
  } catch (error) {
    console.error(error);
  }

  return todos;
};

export { getTodos };
