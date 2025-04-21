import { PrismaClient } from '../generated/prisma/index.js';

const globalForPrisma = globalThis;

// Create the client only once
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const db = prisma;
