import type User from './User';

interface Todo {
  id: number;
  completed: boolean;
  todo: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  userId: number;
}

export default Todo;
