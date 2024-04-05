'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { Post } from '@/types';
import { capitalizeFirstLetter } from '@/utils';
import styles from './Profile.module.css';

const USER_ID = 1;

/**
 * TODOs:
 *  - Add onClick handler to card posts
 */

const Profile = (): ReactNode => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${USER_ID}/posts`
        );

        if (!response.ok) {
          throw new Error('An error occurred while getting user posts.');
        }

        const userPosts = await response.json();

        setUserPosts(userPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPosts();
  }, []);

  const classNames = clsx(
    'profile-page',
    styles['profile-page'],
    'py-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold">User {USER_ID} posts</h1>
      {userPosts.map((userPost) => (
        <Link
          href={`/posts/${userPost.id}`}
          key={userPost.id}
          className={clsx(
            'px-8 py-4 flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl',
            styles.card
          )}
        >
          <h4 className="text-lg font-bold text-black">
            {capitalizeFirstLetter(userPost?.title)}
          </h4>
          <p className="text-base text-gray-800">
            {capitalizeFirstLetter(userPost?.body)}.{' '}
            {capitalizeFirstLetter(userPost?.body)}.
          </p>
        </Link>
      ))}
    </main>
  );
};

export default Profile;
