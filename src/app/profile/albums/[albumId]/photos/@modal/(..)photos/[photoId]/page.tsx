'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Photo } from '@/types';
import { capitalizeFirstLetter } from '@/utils';

/**
 * TODOs:
 *  - Update photo type / default value
 *  - Add close button
 *  - Stop background automatic scroll when opening/closing modal
 *  - Check null!
 */

const AlbumPhoto = (): ReactNode => {
  const { albumId, photoId } = useParams();
  const { back } = useRouter();

  const [albumPhoto, setAlbumPhoto] = useState<Photo>({
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

        const albumPhoto = await response.json();

        setAlbumPhoto(albumPhoto[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbumPhoto();
  }, []);

  useEffect(() => {
    const dialogRef = ref.current;

    dialogRef.addEventListener('close', back);

    return () => dialogRef.removeEventListener('close', back);
  }, []);

  useEffect(() => {
    const dialogRef = ref.current;

    if (dialogRef) {
      dialogRef.showModal();
    }
  }, [ref.current]);

  const classNames = clsx(
    'album-photo-modal',
    'p-8 flex flex-col items-center gap-4 rounded-2xl'
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
          back();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          back();
        }
      }}
      ref={ref}
      className={classNames}
    >
      <Image
        src={albumPhoto.url}
        alt={albumPhoto.title}
        width={600}
        height={600}
        className="flex justify-center items-center"
      />
      <i className="text-xl">{capitalizeFirstLetter(albumPhoto.title)}</i>
    </dialog>
  );
};

export default AlbumPhoto;
