import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

// Create a connection pool for NeonDB
const neon = new Pool({ connectionString: process.env.DATABASE_URL });

// Instantiate PrismaNeon adapter
const adapter = new PrismaNeon(neon);

// Create Prisma client instance with a custom PrismaNeon adapter (this will need to be manually wired)
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL // Use the URL for the connection
    }
  }
});

// Use `prisma` for operations, this doesn't require the `adapter` to be passed directly
export default prisma;
