'use client';

import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Post } from '@/types';
import { PostCard } from '@/components';

const UserPost = (): ReactNode => {
  const { postId } = useParams();
  const { back } = useRouter();

  const [userPost, setUserPost] = useState<Post | null>(null);
  const ref = useRef<HTMLDialogElement>(null!);

  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );

        if (!response.ok) {
          throw new Error('An error occurred while getting post data.');
        }

        const userPost = await response.json();

        setUserPost(userPost);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPost();
  }, []);

  useEffect(() => {
    const dialogRef = ref.current;

    dialogRef.addEventListener('close', back);

    return () => dialogRef.removeEventListener('close', back);
  }, []);

  useEffect(() => {
    const dialogRef = ref.current;

    if (dialogRef) {
      dialogRef.showModal();
    }
  }, [ref.current]);

  const classNames = clsx(
    'user-post-modal',
    'p-8 flex flex-col items-center gap-4 rounded-2xl'
  );

  return (
    <dialog
      onClick={(event) => {
        const dialogDimensions = event.currentTarget.getBoundingClientRect();

        if (
          event.clientX < dialogDimensions.left ||
          event.clientX > dialogDimensions.right ||
          event.clientY < dialogDimensions.top ||
          event.clientY > dialogDimensions.bottom
        ) {
          back();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          back();
        }
      }}
      ref={ref}
      className={classNames}
    >
      <PostCard post={userPost} isLink={false} />
    </dialog>
  );
};

export default UserPost;
