import type Comment from './Comment';
import type User from './User';

interface Post {
  id: number;
  body: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  userId: number;
  comments: [];
}

export default Post;
