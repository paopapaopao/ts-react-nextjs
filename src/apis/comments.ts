import { type Comment } from '@/types';

const getPostComments = async (postId: number | string): Promise<Comment[]> => {
  let postComments: Comment[] = [];

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting post comments.');
    }

    postComments = await response.json();
  } catch (error) {
    console.error(error);
  }

  return postComments;
};

const getUserPostComments = async (postId: number | string): Promise<Comment[]> => {
  let userPostComments: Comment[] = [];

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting user post comments.');
    }

    userPostComments = await response.json();
  } catch (error) {
    console.error(error);
  }

  return userPostComments;
};

export { getPostComments, getUserPostComments };
