import { FastifyInstance } from 'fastify';
import { renderStream } from './renderStream.ts';

interface LocalApp {
  server: FastifyInstance
  htmlTemplate: string
  buildPath: string
}

export async function getApp({ server, htmlTemplate, buildPath }: LocalApp): Promise<FastifyInstance> {
  await server.register(import('@fastify/compress'), { 
    threshold: 2048,
  });

  await server.register(import('@fastify/static'), {
    root: `${buildPath}/client`,
    index: false,
    wildcard: false,
  });
  
  const { default: ServerEntry } = await import(
    /* @vite-ignore */
    `${buildPath}/server/entryServer.js`
  );

  server.get('*', async (_request, reply) => {
    try {
      await renderStream(reply, { htmlTemplate, appEntry: ServerEntry })
    } catch (error: any) {
      console.log('\u001B[36m%s\u001B[0m', 'ERROR', error);
      reply.status(500);
      return error?.stack;
    }
  });

  return server;
}