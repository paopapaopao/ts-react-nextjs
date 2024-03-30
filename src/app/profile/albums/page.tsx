'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { Album } from '@/types';
import { capitalizeFirstLetter } from '@/utils';
import styles from './Albums.module.css';

const USER_ID = 1;

const Albums = (): ReactNode => {
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

  const classNames = clsx(
    'albums-page',
    styles['albums-page'],
    'py-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold">User {USER_ID} albums</h1>
      {userAlbums.map((userAlbum) => (
        <Link
          href={`/profile/albums/${userAlbum.id}`}
          key={userAlbum.id}
          className="hover:shadow-xl"
        >
          <div
            className={clsx(
              'px-8 py-4 flex flex-col bg-white rounded-lg shadow-lg',
              styles.card
            )}
          >
            <h4 className="text-lg font-bold text-black">
              {capitalizeFirstLetter(userAlbum?.title ?? '')}
            </h4>
          </div>
        </Link>
      ))}
    </main>
  );
};

export default Albums;