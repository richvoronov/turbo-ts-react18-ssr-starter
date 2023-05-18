import { createServer } from '@myproject/ssr';

const HOST = '127.0.0.1';
const PORT = 3000;

createServer()
  .then((server) => {
    server.listen({
      port: PORT,
      host: HOST,
    },
      (error, address) => {
        if (error) {
          console.log('server catch error', error);
          process.exit(1);
        } else {
          console.log('\u001B[36m%s\u001B[0m', `Listening on ${address}`);
        }
      },
    );
  }).catch((error) => {
    console.log('server catch error', error);
    process.exit(1);
  });
