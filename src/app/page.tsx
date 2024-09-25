import clsx from 'clsx';
import React from 'react';
import { getPosts } from '@/apis';
import { PostCard, SearchField } from '@/components';
import { type Post } from '@/types';
import styles from './App.module.css';

/**
 * TODOs:
 *  - Wrap filteredPosts in Suspense
 *  - Add debounce
 */

interface Props {
  searchParams: {
    query: string | undefined;
  };
}

const Page = async ({
  searchParams: { query }
}: Props): Promise<JSX.Element> => {
  const posts: Post[] = await getPosts();

  const filteredPosts: Post[] =
    query !== undefined
      ? posts.filter(
          (post: Post) =>
            post.title.includes(query) || post.body.includes(query)
        )
      : posts;

  const hasFilteredPosts: boolean =
    query === undefined || (query !== undefined && filteredPosts.length > 0);

  const classNames: string = clsx(
    'home-page',
    styles['home-page'],
    'p-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <div className="flex gap-4">
        <label htmlFor="search" className="text-xl">
          Search posts
        </label>
        <SearchField />
      </div>
      {hasFilteredPosts ? (
        filteredPosts.map((post: Post) => (
          <PostCard post={post} isLink key={post.id} />
        ))
      ) : (
        <h1 className="text-xl font-bold">
          No posts with the search query{' '}
          <span className="text-blue-700">&apos;{query}&apos;</span>
        </h1>
      )}
    </main>
  );
};

export default Page;
