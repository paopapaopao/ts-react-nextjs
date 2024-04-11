import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import type { Comment, Post } from '@/types';
import { capitalizeFirstLetter } from '@/utils';
import styles from './PostCard.module.css';

type Props = {
  className?: string;
  comments?: Comment[];
  isLink?: boolean;
  post: Post | null;
};

/**
 * TODOs:
 *  - Fix rendering of post
 */

const PostCard = ({
  className = '',
  comments = [],
  isLink = false,
  post
}: Props): ReactNode => {
  const classNames = clsx(
    'post-card',
    styles['post-card'],
    isLink && styles['post-card-link'],
    `px-8 py-4 flex flex-col gap-4 bg-white rounded-lg shadow-lg ${isLink && 'hover:shadow-xl'}`,
    className
  );

  return isLink ? (
    <Link href={`/posts/${post?.id}`} className={classNames}>
      <h4 className={clsx('text-lg font-bold', styles['title'])}>
        {capitalizeFirstLetter(post?.title)}
      </h4>
      <p className="text-base text-gray-800">
        {capitalizeFirstLetter(post?.body)}.
      </p>
    </Link>
  ) : (
    <div className={classNames}>
      <h4 className={clsx('text-lg font-bold')}>
        {capitalizeFirstLetter(post?.title)}
      </h4>
      <p className="text-base text-gray-800">
        {capitalizeFirstLetter(post?.body)}.
      </p>
      {comments.map((comment: Comment) => (
        <div className="flex gap-4">
          <Image
            src="https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png"
            alt="Default profile photo"
            width={48}
            height={48}
            className={clsx(styles['profile-picture'], 'self-start')}
          />
          <div className="flex flex-col gap-2">
            <h5 className="text-sm font-bold">{comment.email}</h5>
            <p className="text-sm text-gray-800">
              {capitalizeFirstLetter(comment?.body)}.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
