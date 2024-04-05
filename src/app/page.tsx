'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { Post } from '@/types';
import { capitalizeFirstLetter } from '@/utils';
import styles from './App.module.css';

/**
 * TODOs:
 *  - Move card component to its own file
 *  - Wrap filteredPosts in Suspense
 *  - Add debounce
 */

const Home = (): ReactNode => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        );

        if (!response.ok) {
          throw new Error('An error occurred while getting posts.');
        }

        const posts = await response.json();

        setPosts(posts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  // TODO: Remove ||
  const filteredPosts = posts.filter(
    (post) =>
      post.title.includes(searchParams.get('query') || '') ||
      post.body.includes(searchParams.get('query') || '')
  );

  const classNames = clsx(
    'home-page',
    styles['home-page'],
    'py-8 flex flex-col items-center gap-4'
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <main className={classNames}>
      <div className="flex gap-4">
        <label htmlFor="search" className="text-xl">
          Search posts
        </label>
        <input
          type="text"
          defaultValue={searchParams.get('query')?.toString()}
          id="search"
          className="border"
          onChange={handleChange}
        />
      </div>
      {filteredPosts.map((post) => (
        <Link
          href={`/posts/${post.id}`}
          className="hover:shadow-xl"
          key={post.id}
        >
          <div
            className={clsx(
              'px-8 py-4 flex flex-col bg-white rounded-lg shadow-lg',
              styles.card
            )}
          >
            <h4 className="text-lg font-bold text-black">
              {capitalizeFirstLetter(post?.title)}
            </h4>
            <p className="text-base text-gray-800">
              {capitalizeFirstLetter(post?.body)}.{' '}
              {capitalizeFirstLetter(post?.body)}.
            </p>
          </div>
        </Link>
      ))}
    </main>
  );
};

export default Home;
