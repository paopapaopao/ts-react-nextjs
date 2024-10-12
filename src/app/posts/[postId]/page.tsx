import clsx from 'clsx';
import React from 'react';
import { PostCard } from '@/components';
import { prisma } from '@/lib';
import { type Comment, type Post } from '@/types';
import styles from './PostDetails.module.css';

interface Props {
  params: {
    postId: string;
  };
}

const Page = async ({ params: { postId } }: Props): Promise<JSX.Element> => {
  const post: Post | null = await prisma.post.findUnique({
    where: {
      id: parseInt(postId)
    }
  });

  const postComments: Comment[] = await prisma.comment.findMany({
    where: {
      postId: parseInt(postId)
    }
  });

  const classNames: string = clsx(
    'post-details-page',
    styles['post-details-page'],
    'p-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <h1>paolo</h1>
      <h1 className="text-xl font-bold">Post {postId}</h1>
      <PostCard post={post} comments={postComments} />
    </main>
  );
};

export default Page;
