import React from 'react';
import { getUserPostComments } from '@/apis';
import { Dialog, PostCard } from '@/components';
import { prisma } from '@/lib';
import { type Comment, type Post } from '@/types';

interface Props {
  params: {
    postId: string;
  };
}

const USER_ID: number = 1;

const Page = async ({ params: { postId } }: Props): Promise<JSX.Element> => {
  const userPost: Post | null = await prisma.post.findUnique({
    where: {
      id: postId
    }
  });
  const userPostComments: Comment[] = await getUserPostComments(postId);

  return (
    <Dialog className="user-post-modal">
      <PostCard post={userPost} comments={userPostComments} />
    </Dialog>
  );
};

export default Page;
