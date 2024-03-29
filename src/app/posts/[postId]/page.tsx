'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { Post } from '@/types';
import { capitalizeFirstLetter } from '@/utils';
import styles from './Post.module.css';

/**
 * TODOs:
 *  - Fix rendering of post
 */

const Post = (): ReactNode => {
  const { postId } = useParams();

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );

        if (!response.ok) {
          throw new Error('An error occurred while getting posts.');
        }

        const post = await response.json();

        setPost(post);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, []);

  const classNames = clsx(
    'post-page',
    styles['post-page'],
    'py-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold">Post {postId}</h1>
      <div
        className={clsx(
          'px-8 py-4 flex flex-col bg-white rounded-lg shadow-lg',
          styles.card
        )}
      >
        <h4 className="text-lg font-bold text-black">
          {capitalizeFirstLetter(post?.title ?? '')}
        </h4>
        <p className="text-base text-gray-800">
          {capitalizeFirstLetter(post?.body ?? '')}.{' '}
          {capitalizeFirstLetter(post?.body ?? '')}.
        </p>
      </div>
    </main>
  );
};

export default Post;
