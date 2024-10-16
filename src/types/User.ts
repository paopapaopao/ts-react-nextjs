// import type Comment from './Comment';
import type Post from './Post';
import type Todo from './Todo';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
  comments: [];
  todos: Todo[];
}

export default User;
