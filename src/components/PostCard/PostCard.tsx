import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';
import { capitalizeFirstLetter } from '@/utils';
import styles from './PostCard.module.css';
import { Post } from '@/types';

type Props = {
  className?: string;
  post: Post;
};

const PostCard = ({ className, post }: Props): ReactNode => {
  const classNames = clsx(
    'post-card',
    'px-8 py-4 flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl',
    styles['post-card'],
    className
  );

  return (
    <Link href={`/posts/${post.id}`} className={classNames}>
      <h4 className="text-lg font-bold text-black">
        {capitalizeFirstLetter(post?.title)}
      </h4>
      <p className="text-base text-gray-800">
        {capitalizeFirstLetter(post?.body)}. {capitalizeFirstLetter(post?.body)}
        .
      </p>
    </Link>
  );
};

export default PostCard;
