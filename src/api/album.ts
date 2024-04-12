import type { Album } from '@/types';

const getUSerAlbums = async (userId: number): Promise<Album[]> => {
  let userAlbums: Album[] = [];

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/albums`
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting user albums.');
    }

    userAlbums = await response.json();
  } catch (error) {
    console.error(error);
  }

  return userAlbums;
};

export { getUSerAlbums };
