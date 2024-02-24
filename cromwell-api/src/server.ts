import { createServer } from 'http';

import config from './config';
import { app } from './services/express';
import { Prisma } from './services/prisma';
import healthcheck from './routes/healthcheck';
import { userRoutes } from './routes/user';

const launchServer = async () => {
  const httpServer = createServer(app);

  // Launch db connection
  const prisma = new Prisma();
  await prisma.start();

  // Healthcheck endpoint
  app.get('/health', healthcheck);

  // User endpoints
  app.use('/user', userRoutes);

  new Promise<void>((resolve) => httpServer.listen({ port: config.port }, resolve))
    .then(() => {
      console.log(`🚀 Cromwell REST API Server running on port: ${config.port}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

launchServer();
