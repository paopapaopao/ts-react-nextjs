import { Photo } from '@/types';

/**
 * TODOs:
 *  - Update photo type / default value
 */

const getAlbumPhoto = async (
  albumId: string,
  photoId: string
): Promise<Photo> => {
  let albumPhoto: Photo[] = [
    {
      albumId: -1,
      id: -1,
      thumbnailUrl: '',
      title: '',
      url: ''
    }
  ];

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&id=${photoId}`
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting album photo.');
    }

    albumPhoto = await response.json();
  } catch (error) {
    console.error(error);
  }

  return albumPhoto[0];
};

export { getAlbumPhoto };
