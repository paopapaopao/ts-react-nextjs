import clsx from 'clsx';
import React from 'react';
// import { type Post } from '@prisma/client';
import { updatePost } from '@/apis';
import { PostForm } from '@/components';
import { prisma } from '@/lib';
// import { type Comment } from '@/types';
import styles from './PostDetails.module.css';

// Add this function to generate static parameters for your dynamic route
export async function generateStaticParams() {
  const postIds = await prisma.post.findMany({
    select: {
      id: true
    }
  });

  return postIds.map((postId) => ({
    postId: postId.toString() // Convert to string as the route expects string params
  }));
}

interface Props {
  params: {
    postId: string;
  };
}

const Page = async ({ params: { postId } }: Props): Promise<JSX.Element> => {
  // const post: Post | null = await readPost(parseInt(postId));
  // const postComments = await prisma.comment.findMany({
  //   where: {
  //     postId: parseInt(postId)
  //   }
  // });

  const updatePostAction = async (formData: FormData): Promise<void> => {
    'use server';

    const title = formData.get('title');
    const body = formData.get('body');

    const data = {
      id: parseInt(postId),
      title: title as string,
      body: body as string
    };

    await updatePost(data);
  };

  const classNames: string = clsx(
    'post-details-page',
    styles['post-details-page'],
    'p-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <PostForm action={updatePostAction} />
      <h1 className="text-xl font-bold">Post {postId}</h1>
      {/* <PostCard post={post} comments={postComments} /> */}
    </main>
  );
};

export default Page;
