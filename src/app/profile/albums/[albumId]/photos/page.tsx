import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { getAlbumPhotos } from '@/api';
import type { Photo } from '@/types';

/**
 * TODOs:
 *  - Add wrapping of photos
 *  - Add search/filter
 */

interface Props {
  params: {
    albumId: string;
  };
}

const AlbumPhotos = async ({
  params: { albumId }
}: Props): Promise<JSX.Element> => {
  const albumPhotos: Photo[] = await getAlbumPhotos(albumId);

  const classNames: string = clsx(
    'album-photos-page',
    'p-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold">Album {albumId} Photos</h1>
      <div className="grid grid-cols-8 justify-items-center gap-4">
        {albumPhotos.map((albumPhoto: Photo) => (
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
