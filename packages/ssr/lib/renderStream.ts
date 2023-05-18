import { FastifyReply } from 'fastify';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';

interface RenderOptions {
  htmlTemplate: string
  appEntry: React.FC
}

const ABORT_DELAY = 10_000;

export async function renderStream(reply: FastifyReply, { appEntry, htmlTemplate }: RenderOptions) {
  const [templateStart, templateEnd] = htmlTemplate.split('<!--ssr-->');

  let didError = false;

  const rootNode = React.createElement(appEntry);

  return new Promise((_resolve, reject) => {
    const stream = renderToPipeableStream(
      rootNode,
      {
        onShellReady() {
          reply.statusCode = didError ? 500 : 200;
          reply.header('content-type', 'text/html');
          reply.raw.write(templateStart);
          stream.pipe(reply.raw);
        },
        onAllReady() {
          reply.raw.write(templateEnd);
        },
        onShellError() {
          reply.statusCode = 500;
          reply.header('content-type', 'text/html');
          reply.send('<h1>Something went wrong</h1>'); 
        },
        onError() {
          didError = true;
          reject();
        },
      },
    );

    setTimeout(() => {
      stream.abort();
      reject('stop.pipe');
    }, ABORT_DELAY);
  });
}