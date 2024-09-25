import React from 'react';
import { getUserPost, getUserPostComments } from '@/apis';
import { Dialog, PostCard } from '@/components';
import { type Comment, type Post } from '@/types';

interface Props {
  params: {
    postId: string;
  };
}

const USER_ID: number = 1;

const Page = async ({ params: { postId } }: Props): Promise<JSX.Element> => {
  const userPost: Post = await getUserPost(USER_ID, postId);
  const userPostComments: Comment[] = await getUserPostComments(postId);

  return (
    <Dialog className="user-post-modal">
      <PostCard post={userPost} comments={userPostComments} />
    </Dialog>
  );
};

export default Page;
