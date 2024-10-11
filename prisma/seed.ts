import { PrismaClient } from '@prisma/client';
import { type Post, type User } from '@/types';

const prisma = new PrismaClient();

const getPosts = async (): Promise<Post[]> => {
  let posts: Post[] = [];

  try {
    const response = await fetch('https://dummyjson.com/posts');

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

const getUser = async (): Promise<User | null> => {
  const USER_ID = 1;
  let user: User | null = null;

  try {
    const response = await fetch(
      `https://dummyjson.com/users/${USER_ID}`
    );

    if (!response.ok) {
      throw new Error('An error occurred while getting user.');
    }

    user = await response.json();
  } catch (error) {
    console.error(error);
  }

  return user;
};

async function main() {
  const initialUser: User | null = await getUser();
  const initialPosts: Post[] = await getPosts();

  const user: User = await prisma.user.create({
    data: {
      email: initialUser?.email as string,
      firstName: initialUser?.firstName as string,
      lastName: initialUser?.lastName as string,
      password: initialUser?.password as string,
      username: initialUser?.username as string,
      posts: {
        create: []
      }
    }
  });

  for (const post of initialPosts) {
    await prisma.post.create({
      data: {
        userId: user.id,
        body: post.body,
        title: post.title
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
