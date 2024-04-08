'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { type Album } from '@/types';
import { capitalizeFirstLetter } from '@/utils';
import styles from './UserAlbums.module.css';

const USER_ID = 1;

/**
 * TODOs
 *  - Add search/filter
 */

const UserAlbums = (): ReactNode => {
  const [userAlbums, setUserAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchUserAlbums = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${USER_ID}/albums`
        );

        if (!response.ok) {
          throw new Error('An error occurred while getting user albums.');
        }

        const userAlbums = await response.json();

        setUserAlbums(userAlbums);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserAlbums();
  }, []);

  const classNames: string = clsx(
    'user-albums-page',
    'p-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold">Albums</h1>
      {userAlbums.map((userAlbum: Album) => (
        <Link
          href={`/profile/albums/${userAlbum.id}/photos`}
          key={userAlbum.id}
          className={clsx(
            styles['album-card'],
            'px-8 py-4 flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl'
          )}
        >
          <h4 className="text-lg font-bold text-black">
            {capitalizeFirstLetter(userAlbum?.title ?? '')}
          </h4>
        </Link>
      ))}
    </main>
  );
};

export default UserAlbums;
