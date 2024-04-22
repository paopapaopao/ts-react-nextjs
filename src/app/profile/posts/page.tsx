import clsx from 'clsx';
import { getUserPosts } from '@/apis';
import { PostCard } from '@/components';
import type { Post } from '@/types';

const USER_ID: number = 1;

/**
 * TODOs
 *  - Add search/filter
 */

const UserPosts = async (): Promise<JSX.Element> => {
  const userPosts: Post[] = await getUserPosts(USER_ID);

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

export default UserPosts;
