const express = require('express');

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { VercelRequest, VercelResponse } from '@vercel/node';

// Create the express server instance
const server = express();

// This function sets up the NestJS app with the Express adapter
const createNestServer = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({
    origin: "*",
    methods: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // If you need to send cookies
  });
  await app.init();  // Initialize the app
  return server;
};

// Vercel handler for serverless deployment
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const nestServer = await createNestServer();
  nestServer(req, res);  // Handles request and sends response
}

// Run locally for development
if (process.env.NODE_ENV !== 'production') {
  createNestServer().then((server) => {
    const port = 3000;
    server.listen(port, () => {
      console.log(`NestJS app is running on http://localhost:${port}`);
    });
  });
}
