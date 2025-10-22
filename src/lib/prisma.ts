import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient({
  datasourceUrl: import.meta.env.DATABASE_URL,
}).$extends(withAccelerate());

export default prisma;
