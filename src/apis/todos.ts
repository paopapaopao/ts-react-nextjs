import { type Todo } from '@/types';

const getUserTodos = async (userId: number | string): Promise<Todo[]> => {
  let userTodos: Todo[] = [];

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting user todos.');
    }

    userTodos = await response.json();
  } catch (error) {
    console.error(error);
  }

  return userTodos;
};

export { getUserTodos };
