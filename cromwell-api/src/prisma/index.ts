import { PrismaClient } from '@prisma/client';

import { IPrismaContext } from './IPrismaContext';

const prisma = new PrismaClient();

const prismaContext: IPrismaContext = {
  prisma,
};

export default prismaContext;
