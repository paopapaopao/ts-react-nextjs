import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Post } from '@/types';
import { capitalizeFirstLetter } from '@/utils';
import styles from './PostCard.module.css';

type Props = {
  className?: string;
  isLink?: boolean;
  post: Post | null;
};

/**
 * TODOs:
 *  - Fix rendering of post
 */

const PostCard = ({ className, isLink = true, post }: Props): ReactNode => {
  const classNames = clsx(
    'post-card',
    `px-8 py-4 flex flex-col bg-white rounded-lg shadow-lg ${isLink && 'hover:shadow-xl'}`,
    styles['post-card'],
    isLink && styles['post-card-link'],
    className
  );

  return isLink ? (
    <Link href={`/posts/${post?.id}`} className={classNames}>
      <h4 className={clsx('text-lg font-bold text-black', styles['title'])}>
        {capitalizeFirstLetter(post?.title || '')}
      </h4>
      <p className="text-base text-gray-800">
        {capitalizeFirstLetter(post?.body || '')}.{' '}
        {capitalizeFirstLetter(post?.body || '')}.
      </p>
    </Link>
  ) : (
    <div className={classNames}>
      <h4 className={clsx('text-lg font-bold text-black')}>
        {capitalizeFirstLetter(post?.title || '')}
      </h4>
      <p className="text-base text-gray-800">
        {capitalizeFirstLetter(post?.body || '')}.{' '}
        {capitalizeFirstLetter(post?.body || '')}.
      </p>
    </div>
  );
};

export default PostCard;
