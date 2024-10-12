import Comment from './Comment';
import Post from "./Post";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  posts: Post[];
  comments: Comment[];
}

export default User;
