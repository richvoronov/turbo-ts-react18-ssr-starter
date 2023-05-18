import { FastifyInstance } from 'fastify';
import { createServer as createViteServer } from "vite";
import { renderStream } from './renderStream.ts';

interface LocalApp {
  server: FastifyInstance
  htmlTemplate: string
  devEntryPath: string
}

export async function getLocalApp({ server, htmlTemplate, devEntryPath }: LocalApp): Promise<FastifyInstance> {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  server.use(vite.middlewares);

  server.get('*', async (request, reply) => {
    reply.header('cache-control', 'no-store');

    try {
      const template = await vite.transformIndexHtml(request.url, htmlTemplate);
      const { default: ServerEntry } = await vite.ssrLoadModule(devEntryPath);

      await renderStream(reply, { htmlTemplate: template, appEntry: ServerEntry, })
    } catch (error: any) {
      vite.ssrFixStacktrace(error);
      console.log('\u001B[36m%s\u001B[0m', 'Error ->', error);
      reply.status(500);
      return error?.stack;
    }
  });

  return server;
}