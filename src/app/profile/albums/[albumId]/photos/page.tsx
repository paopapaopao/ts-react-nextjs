'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { Photo } from '@/types';
import styles from './AlbumPhotos.module.css';

/**
 * TODOs:
 *  - Add wrapping of photos
 *  - Add search/filter
 */

const AlbumPhotos = (): ReactNode => {
  const { albumId } = useParams();

  const [albumPhotos, setAlbumPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchAlbumPhotos = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
        );

        if (!response.ok) {
          throw new Error('An error occurred while getting album photos.');
        }

        const albumPhotos = await response.json();

        setAlbumPhotos(albumPhotos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbumPhotos();
  }, []);

  const classNames = clsx(
    'album-photos-page',
    styles['album-photos-page'],
    'p-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold">Album {albumId} Photos</h1>
      <div className="grid grid-cols-8 justify-items-center gap-4">
        {albumPhotos.map((albumPhoto) => (
          <Link
            href={`/profile/albums/${albumId}/photos/${albumPhoto.id}`}
            key={albumPhoto.id}
            className="hover:shadow-2xl"
          >
            <Image
              src={albumPhoto.url}
              alt={albumPhoto.title}
              width={150}
              height={150}
            />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default AlbumPhotos;
