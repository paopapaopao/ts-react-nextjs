'use client';

import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '@/utils';
import styles from './Posts.module.css';

type Post = {
  title: string;
  body: string;
  id: string;
  userId: string;
};

/**
 * TODOs:
 *  - Move card component to its own file
 */

const Posts = (): ReactNode => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        );

        if (!response.ok) {
          throw new Error('An error occurred while fetching posts.');
        }

        const posts = await response.json();

        setPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const styleClassNames = 'py-8 flex flex-col items-center gap-4';
  const classNames = clsx('posts-page', styleClassNames, styles['posts-page']);

  return (
    <main className={classNames}>
      <h1 className="text-xl">All posts</h1>
      {posts.map((post) => (
        <div
          className={clsx(
            'px-8 py-4 flex flex-col bg-white rounded-lg shadow-lg',
            styles.card
          )}
        >
          <h4 className="text-lg font-bold text-black">
            {capitalizeFirstLetter(post?.title)}
          </h4>
          <p className="text-base text-gray-800">
            {capitalizeFirstLetter(post?.body)}.{' '}
            {capitalizeFirstLetter(post?.body)}.
          </p>
        </div>
      ))}
    </main>
  );
};

export default Posts;
