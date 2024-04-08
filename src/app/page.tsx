'use client';

import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { PostCard } from '@/components';
import { type Post } from '@/types';
import styles from './App.module.css';

/**
 * TODOs:
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
  const filteredPosts: Post[] = posts.filter(
    (post: Post) =>
      post.title.includes(searchParams.get('query') || '') ||
      post.body.includes(searchParams.get('query') || '')
  );

  const hasFilteredPosts: boolean =
    !searchParams.get('query') ||
    (!!searchParams.get('query') && filteredPosts.length > 0);

  const classNames: string = clsx(
    'home-page',
    styles['home-page'],
    'p-8 flex flex-col items-center gap-4'
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const params: URLSearchParams = new URLSearchParams(searchParams);

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
      {hasFilteredPosts ? (
        filteredPosts.map((post: Post) => (
          <PostCard post={post} key={post.id} />
        ))
      ) : (
        <h1 className="text-xl font-bold">
          No posts with the search query{' '}
          <span className="text-blue-700">'{searchParams.get('query')}'</span>
        </h1>
      )}
    </main>
  );
};

export default Home;
