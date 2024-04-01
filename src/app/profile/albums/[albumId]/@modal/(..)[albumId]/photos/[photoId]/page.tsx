'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Photo } from '@/types';
import { capitalizeFirstLetter } from '@/utils';
import styles from './Photo.module.css';

/**
 * TODOs:
 *  - Update photo type / default value
 *  - Add close button
 */

const Photo = (): ReactNode => {
  const { albumId, photoId } = useParams();
  const router = useRouter();

  const [photo, setPhoto] = useState<Photo>({
    albumId: -1,
    id: -1,
    thumbnailUrl: '',
    title: '',
    url: ''
  });
  const ref = useRef<HTMLDialogElement>(null!);

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

  useEffect(() => {
    const dialogRef = ref.current;

    dialogRef.addEventListener('close', router.back);

    return () => dialogRef.removeEventListener('close', router.back);
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, [ref.current]);

  const classNames = clsx(
    'photo-modal',
    styles['photo-modal'],
    'py-8 px-8 flex flex-col items-center gap-4 rounded-2xl'
  );

  return (
    <dialog
      onClick={(event) => {
        const dialogDimensions = event.currentTarget.getBoundingClientRect();

        if (
          event.clientX < dialogDimensions.left ||
          event.clientX > dialogDimensions.right ||
          event.clientY < dialogDimensions.top ||
          event.clientY > dialogDimensions.bottom
        ) {
          router.back();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          router.back();
        }
      }}
      ref={ref}
      className={classNames}
    >
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
    </dialog>
  );
};

export default Photo;
