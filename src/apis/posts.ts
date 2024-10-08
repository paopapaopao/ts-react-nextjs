import { type Post } from '@/types';

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

const getPost = async (postId: number | string): Promise<Post | null> => {
  let post: Post | null = null;

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting post.');
    }

    post = await response.json();
  } catch (error) {
    console.error(error);
  }

  return post;
};

const getUserPosts = async (userId: number | string): Promise<Post[]> => {
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

export { getPosts, getPost, getUserPosts, getUserPost };
