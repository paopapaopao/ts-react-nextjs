'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import { getUserPost, getUserPostComments } from '@/apis';
import { PostCard } from '@/components';
import type { Comment, Post } from '@/types';

interface Props {
  params: {
    postId: string;
  };
}

const USER_ID: number = 1;

const UserPost = ({ params: { postId } }: Props): ReactNode => {
  const { back } = useRouter();

  const [userPost, setUserPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const ref = useRef<HTMLDialogElement>(null!);

  useEffect(() => {
    const fetchUserPost = async (): Promise<void> => {
      const userPost: Post = await getUserPost(USER_ID, postId);

      setUserPost(userPost);
    };

    void fetchUserPost();
  }, []);

  useEffect(() => {
    const fetchPostComments = async (): Promise<void> => {
      const postComments: Comment[] = await getUserPostComments(postId);

      setPostComments(postComments);
    };

    void fetchPostComments();
  }, []);

  useEffect(() => {
    const dialogRef: HTMLDialogElement = ref.current;

    dialogRef.addEventListener('close', back);

    return (): void => {
      dialogRef.removeEventListener('close', back);
    };
  }, []);

  useEffect(() => {
    const dialogRef: HTMLDialogElement = ref.current;

    if (dialogRef !== null) {
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
