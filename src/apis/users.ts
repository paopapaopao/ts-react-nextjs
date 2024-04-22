import type { User } from '@/types';

const getUser = async (userId: number): Promise<User | null> => {
  let user: User | null = null;

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting user.');
    }

    user = await response.json();
  } catch (error) {
    console.error(error);
  }

  return user;
};

export { getUser };
