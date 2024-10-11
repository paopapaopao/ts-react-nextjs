import Post from "./Post";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  posts: Post[];
}

export default User;
