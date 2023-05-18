import { readFile } from 'node:fs/promises';
import path from 'node:path';
import Fastify, { FastifyInstance } from 'fastify';
import { getLocalApp } from './getLocalApp.ts';
import { getApp } from './getApp.ts';

const initialSourceFiles = {
  buildPath: path.join(process.cwd(), '/dist'),
  devIndexHtml: path.join(process.cwd(), '/index.html'),
  devEntryPath: path.join(process.cwd(), '/src/entryServer.tsx'),
}

export async function createServer(isProduction = process.env['NODE_ENV'] === "production"): Promise<FastifyInstance> {
  const { devIndexHtml, devEntryPath, buildPath } = initialSourceFiles;

  const server = Fastify();
  await server.register(import('@fastify/middie'));

  const htmlTemplate = await readFile(isProduction ? `${buildPath}/client/index.html` : devIndexHtml, { encoding: "utf8" });

  if (!isProduction) {
    return getLocalApp({ server, htmlTemplate, devEntryPath });
  }

  if (isProduction) {
    return getApp({ server, htmlTemplate, buildPath });
  }

  return server;
}