import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$connect();
    console.log('Connection to database successfully!');
  } catch (error) {
    console.error('Connection to database down:', error);
  }
  // No disconnect here, keep the connection open for server operations
})();

export default prisma;
