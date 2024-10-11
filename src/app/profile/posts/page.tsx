import clsx from 'clsx';
import React from 'react';
import { PostCard } from '@/components';
import { prisma } from '@/lib';
import { type Post } from '@/types';

const USER_ID: string = 'cm246gpof0000pb5nyumjfd3g';

/**
 * TODOs
 *  - Add search/filter
 */

const Page = async (): Promise<JSX.Element> => {
  const userPosts: Post[] = await prisma.post.findMany({
    where: {
      userId: USER_ID
    }
  });

  const classNames: string = clsx(
    'user-posts-page',
    'p-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold">Posts</h1>
      {userPosts.map((userPost: Post) => (
        <PostCard post={userPost} isLink key={userPost.id} />
      ))}
    </main>
  );
};

export default Page;
