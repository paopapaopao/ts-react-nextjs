import { PrismaClient } from '@prisma/client';
import { type Comment, type Post, type User } from '@/types';

const prisma = new PrismaClient();

const getUsers = async (): Promise<User[]> => {
  let users: User[] = [];

  try {
    const response = await fetch(
      'https://dummyjson.com/users?limit=0'
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting users.');
    }

    const data = await response.json();
    users = data.users;
  } catch (error) {
    console.error(error);
  }

  return users;
};

const getPosts = async (): Promise<Post[]> => {
  let posts: Post[] = [];

  try {
    const response = await fetch('https://dummyjson.com/posts?limit=0');

    if (!response.ok) {
      throw new Error('An error occurred while getting posts.');
    }

    const data = await response.json();
    posts = data.posts;
  } catch (error) {
    console.error(error);
  }

  return posts;
};

const getComments = async (): Promise<any[]> => {
  let comments = [];

  try {
    const response = await fetch(
      'https://dummyjson.com/comments?limit=0'
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting comments.');
    }

    const data = await response.json();
    comments = data.comments;
  } catch (error) {
    console.error(error);
  }

  return comments;
};

async function main() {
  // *Resets the id to 1
  await prisma.$executeRaw`DELETE FROM Comment;`;
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Comment';`;
  await prisma.$executeRaw`DELETE FROM Post;`;
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Post';`;
  await prisma.$executeRaw`DELETE FROM User;`;
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='User';`;

  const initialUsers: User[] = await getUsers();
  const initialPosts: Post[] = await getPosts();
  const initialComments = await getComments();

  for (const user of initialUsers) {
    await prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        username: user.username,
        posts: {
          create: []
        }
      }
    });
  }

  for (const post of initialPosts) {
    await prisma.post.create({
      data: {
        body: post.body,
        title: post.title,
        userId: post.userId
      }
    });
  }

  for (const comment of initialComments) {
    await prisma.comment.create({
      data: {
        body: comment.body,
        userId: comment.user.id,
        postId: comment.postId
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
