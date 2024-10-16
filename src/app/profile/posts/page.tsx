import clsx from 'clsx';
import React from 'react';
import { PostCard } from '@/components';
import { prisma } from '@/lib';

const USER_ID: number = 1;

/**
 * TODOs
 *  - Add search/filter
 */

const Page = async (): Promise<JSX.Element> => {
  const userPosts = await prisma.post.findMany({
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
      {userPosts.map((userPost) => (
        <PostCard post={userPost} isLink key={userPost.id} />
      ))}
    </main>
  );
};

export default Page;
