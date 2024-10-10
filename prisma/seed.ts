import { PrismaClient } from '@prisma/client';
import { type Post } from '@/types';

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

async function main() {
  const initialPosts: Post[] = await getPosts();

  initialPosts.forEach(async (post) => {
    await prisma.post.create({
      data: {
        body: post.body,
        title: post.title
      }
    });
  });
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
