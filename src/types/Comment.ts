import type Post from './Post';
import type User from './User';

interface Comment {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  userId: number;
  post: Post;
  postId: number;
}

export default Comment;
