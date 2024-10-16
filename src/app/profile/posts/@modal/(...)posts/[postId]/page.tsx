import React from 'react';
import { type Post } from '@prisma/client';
import { readPost } from '@/apis';
import { Dialog, PostCard } from '@/components';
import { prisma } from '@/lib';
// import { type Comment } from '@/types';

export async function generateStaticParams(): Promise<
  Array<{ postId: string }>
> {
  const postIds = await prisma.post.findMany({
    select: {
      id: true
    }
  });

  return postIds.map((postId) => ({
    postId: postId.id.toString() // Convert to string as the route expects string params
  }));
}

interface Props {
  params: {
    postId: string;
  };
}

const Page = async ({ params: { postId } }: Props): Promise<JSX.Element> => {
  const userPost: Post | null = await readPost(parseInt(postId));
  // const userPostComments = await prisma.comment.findMany({
  //   where: {
  //     postId: parseInt(postId)
  //   }
  // });

  return (
    <Dialog className="user-post-modal">
      <PostCard post={userPost} />
    </Dialog>
  );
};

export default Page;
