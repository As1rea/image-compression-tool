import type { Express } from 'express';
import type { Server } from 'http';

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // No backend routes required for this purely static client-side application
  return httpServer;
}
