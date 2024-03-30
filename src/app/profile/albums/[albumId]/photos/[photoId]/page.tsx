'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { Photo } from '@/types';
import { capitalizeFirstLetter } from '@/utils';
import styles from './Photo.module.css';

/**
 * TODOs:
 *  - Update photo type / default value
 */

const Photo = (): ReactNode => {
  const { albumId, photoId } = useParams();

  const [photo, setPhoto] = useState<Photo>({
    albumId: -1,
    id: -1,
    thumbnailUrl: '',
    title: '',
    url: ''
  });

  useEffect(() => {
    const fetchAlbumPhoto = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&id=${photoId}`
        );

        if (!response.ok) {
          throw new Error('An error occurred while getting album photo.');
        }

        const photo = await response.json();

        setPhoto(photo[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbumPhoto();
  }, []);

  const classNames = clsx(
    'photo-page',
    styles['photo-page'],
    'py-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold">
        Photo {photoId} of Album {albumId}
      </h1>
      <Image
        src={photo.url}
        alt={photo.title}
        width={600}
        height={600}
        className="flex justify-center items-center"
      />
      <i className="text-xl">{capitalizeFirstLetter(photo.title)}</i>
    </main>
  );
};

export default Photo;
