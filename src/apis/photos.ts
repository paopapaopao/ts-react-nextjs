import { type Photo } from '@/types';

const getAlbumPhotos = async (albumId: number | string): Promise<Photo[]> => {
  let albumPhotos: Photo[] = [];

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting album photos.');
    }

    albumPhotos = await response.json();
  } catch (error) {
    console.error(error);
  }

  return albumPhotos;
};

/**
 * TODOs:
 *  - Update photo type / default value
 */

const getAlbumPhoto = async (
  albumId: number | string,
  photoId: number | string
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

export { getAlbumPhotos, getAlbumPhoto };
