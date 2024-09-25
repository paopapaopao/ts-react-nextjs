import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { getAlbumPhoto } from '@/apis';
import { type Photo } from '@/types';
import { capitalizeFirstLetter } from '@/utils';

interface Props {
  params: {
    albumId: string;
    photoId: string;
  };
}

const Page = async ({
  params: { albumId, photoId }
}: Props): Promise<JSX.Element> => {
  const albumPhoto: Photo = await getAlbumPhoto(albumId, photoId);

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

export default Page;
