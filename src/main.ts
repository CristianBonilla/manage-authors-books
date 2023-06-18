import nconf from 'nconf';
import async from 'async';
import dotenv from 'dotenv';
import { Server } from '@config/server';
import { ServerMessageHandler } from '@interfaces/server';
import { logger } from 'src/logger';

dotenv.config();

nconf.use('memory');
nconf.argv();
nconf.env();

require(`@env/${ nconf.get('NODE_ENV') }`);

logger.info('[APP] Starting server initilization...');

(async () => {
  try {
    const results = await async.series([
      (startServer: ServerMessageHandler) => {
        const server = new Server(startServer);
        server.start();
      }
    ]);
    results.forEach(logger.verbose);
    logger.info('[APP] initialized SUCCESSFULLY');
  } catch (error) {
    logger.error(`[APP] initialization failed:\n${error}`);
  }
})();
