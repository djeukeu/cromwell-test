import { User } from '@prisma/client';
import prismaContext from 'src/prisma';

const { user } = prismaContext.prisma;

export const createUser = async (data: User): Promise<User> => {
  const response = await user.create({ data });
  return response;
};

export const readUserByEmail = async (email: string): Promise<User | null> => {
  const response = await user.findUnique({
    where: { email },
  });
  return response;
};

export const readUserById = async (id: string): Promise<User | null> => {
  const response = await user.findUnique({
    where: { id },
  });
  return response;
};
