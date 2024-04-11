'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { PostCard } from '@/components';
import { type Comment, type Post } from '@/types';
import styles from './PostDetails.module.css';

const PostDetails = (): ReactNode => {
  const { postId } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );

        if (!response.ok) {
          throw new Error('An error occurred while getting post.');
        }

        const post = await response.json();

        setPost(post);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
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
