'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';
import type { Photo } from '@/types';
import { capitalizeFirstLetter } from '@/utils';

/**
 * TODOs:
 *  - Update photo type / default value
 */

const AlbumPhoto = (): ReactNode => {
  const { albumId, photoId } = useParams();

  const [albumPhoto, setAlbumPhoto] = useState<Photo>({
    albumId: -1,
    id: -1,
    thumbnailUrl: '',
    title: '',
    url: ''
  });

  useEffect(() => {
    const fetchAlbumPhoto = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&id=${photoId}`
        );

        if (!response.ok) {
          throw new Error('An error occurred while getting album photo.');
        }

        const albumPhoto = await response.json();

        setAlbumPhoto(albumPhoto[0]);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchAlbumPhoto();
  }, []);

  const classNames: string = clsx(
    'album-photo-page',
    'p-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold">
        Photo {photoId} (Album {albumId})
      </h1>
      <Image
        src={albumPhoto.url}
        alt={albumPhoto.title}
        width={600}
        height={600}
        className="flex justify-center items-center"
      />
      <i className="text-xl">{capitalizeFirstLetter(albumPhoto.title)}</i>
    </main>
  );
};

export default AlbumPhoto;
