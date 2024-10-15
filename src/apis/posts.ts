import { revalidatePath } from 'next/cache';
import { Prisma, type Post as PrismaPost } from '@prisma/client';
import { prisma } from '@/lib';

const createPost = async (payload: Prisma.PostUncheckedCreateInput): Promise<PrismaPost | null> => {
  const { body, title, userId } = payload;
  let response: PrismaPost | null = null;

  try {
    response = await prisma.post.create({
      data: {
        body,
        title,
        user: {
          connect: {
            id: userId
          }
        },
        comments: {
          create: []
        }
      }
    });

    revalidatePath('/');
  } catch (error) {
    console.error(error);
  }

  return response;
}

export { createPost };
