import { revalidatePath } from 'next/cache';
import { type Post as PrismaPost, Prisma} from '@prisma/client';
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

const updatePost = async (payload: Prisma.PostUncheckedUpdateInput): Promise<PrismaPost | null> => {
  const { id, body, title } = payload;
  let response: PrismaPost | null = null;

  try {
    response = await prisma.post.update({
      where: {
        id: id as number
      },
      data: {
        body,
        title
      }
    });

    revalidatePath('/');
  } catch (error) {
    console.error(error);
  }

  return response;
}

export { createPost, updatePost };
