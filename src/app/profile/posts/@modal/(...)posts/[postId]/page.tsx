import React from 'react';
import { Dialog, PostCard } from '@/components';
import { prisma } from '@/lib';
import { type Comment, type Post } from '@/types';

interface Props {
  params: {
    postId: string;
  };
}

const Page = async ({ params: { postId } }: Props): Promise<JSX.Element> => {
  const userPost: Post | null = await prisma.post.findUnique({
    where: {
      id: parseInt(postId)
    }
  });
  const userPostComments: Comment[] = await prisma.comment.findMany({
    where: {
      postId: parseInt(postId)
    }
  });

  return (
    <Dialog className="user-post-modal">
      <PostCard post={userPost} comments={userPostComments} />
    </Dialog>
  );
};

export default Page;
