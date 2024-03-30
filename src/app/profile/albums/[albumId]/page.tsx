'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { Photo } from '@/types';
import styles from './Album.module.css';

const Album = (): ReactNode => {
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
    'album-page',
    styles['album-page'],
    'py-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold">Album {albumId} photos</h1>
      <div className="grid grid-cols-8 justify-items-center gap-4">
        {albumPhotos.map((albumPhoto, index) => (
          <Image
            src={albumPhoto.url}
            alt={albumPhoto.title}
            width={150}
            height={150}
            key={index}
          />
        ))}
      </div>
    </main>
  );
};

export default Album;
