import clsx from 'clsx';
import { getPost, getPostComments } from '@/api';
import { PostCard } from '@/components';
import type { Comment, Post } from '@/types';
import styles from './PostDetails.module.css';

interface Props {
  params: {
    postId: string;
  };
}

const PostDetails = async ({
  params: { postId }
}: Props): Promise<JSX.Element> => {
  const post: Post | null = await getPost(postId);
  const postComments: Comment[] = await getPostComments(postId);

  const classNames: string = clsx(
    'post-details-page',
    styles['post-details-page'],
    'p-8 flex flex-col items-center gap-4'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold">Post {postId}</h1>
      <PostCard post={post} comments={postComments} />
    </main>
  );
};

export default PostDetails;
