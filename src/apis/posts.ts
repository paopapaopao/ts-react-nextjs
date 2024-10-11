import { type Post } from '@/types';

/**
 * TODOs:
 *  - Update post type / default value
 */

const getUserPost = async (userId: number | string, postId: number | string): Promise<Post> => {
  let userPost: Post[] = [
    {
      body: '',
      id: -1,
      title: '',
      userId: -1
    }
  ];

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts?id=${postId}`
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting user post.');
    }

    userPost = await response.json();
  } catch (error) {
    console.error(error);
  }

  return userPost[0];
};

export { getUserPost };
