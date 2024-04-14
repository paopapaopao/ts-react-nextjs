'use client';

import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import { PostCard } from '@/components';
import type { Comment, Post } from '@/types';

const USER_ID: number = 1;

const UserPost = (): ReactNode => {
  const { postId } = useParams();
  const { back } = useRouter();

  const [userPost, setUserPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const ref = useRef<HTMLDialogElement>(null!);

  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${USER_ID}/posts?id=${postId}`
        );

        if (!response.ok) {
          throw new Error('An error occurred while getting user post.');
        }

        const userPost = await response.json();

        setUserPost(userPost[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPost();
  }, []);

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );

        if (!response.ok) {
          throw new Error('An error occurred while getting post comments.');
        }

        const postComments = await response.json();

        setPostComments(postComments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostComments();
  }, []);

  useEffect(() => {
    const dialogRef: HTMLDialogElement = ref.current;

    dialogRef.addEventListener('close', back);

    return (): void => dialogRef.removeEventListener('close', back);
  }, []);

  useEffect(() => {
    const dialogRef: HTMLDialogElement = ref.current;

    if (dialogRef) {
      dialogRef.showModal();
    }
  }, [ref.current]);

  const classNames: string = clsx(
    'user-post-modal',
    'p-8 flex flex-col items-center gap-4 rounded-2xl'
  );

  const handleClick = (event: MouseEvent): void => {
    const dialogDimensions = event.currentTarget.getBoundingClientRect();

    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      back();
    }
  };

  return (
    <dialog
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          back();
        }
      }}
      ref={ref}
      className={classNames}
    >
      <PostCard post={userPost} comments={postComments} />
    </dialog>
  );
};

export default UserPost;
