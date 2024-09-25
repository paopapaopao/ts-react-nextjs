import Image from 'next/image';
import React from 'react';
import { getAlbumPhoto } from '@/apis';
import { Dialog } from '@/components';
import { type Photo } from '@/types';
import { capitalizeFirstLetter } from '@/utils';

/**
 * TODOs:
 *  - Stop background automatic scroll when opening/closing modal
 */

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

  return (
    <Dialog className="album-photo-modal">
      <Image
        src={albumPhoto.url}
        alt={albumPhoto.title}
        width={600}
        height={600}
        className="flex justify-center items-center"
      />
      <i className="text-xl">{capitalizeFirstLetter(albumPhoto.title)}</i>
    </Dialog>
  );
};

export default Page;
