import type { Post } from '@/types';

const getPosts = async (): Promise<Post[]> => {
  let posts: Post[] = [];

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error('An error occurred while getting posts.');
    }

    posts = await response.json();
  } catch (error) {
    console.error(error);
  }

  return posts;
};

const getUserPosts = async (userId: number): Promise<Post[]> => {
  let userPosts: Post[] = [];

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting user posts.');
    }

    userPosts = await response.json();
  } catch (error) {
    console.error(error);
  }

  return userPosts;
};

export { getPosts, getUserPosts };
