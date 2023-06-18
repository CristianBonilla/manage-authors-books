import nconf from 'nconf';
import { connect } from 'mongoose';
import { MONGO_CONFIG_KEY } from '@const/config';
import { MongoConfig } from '@interfaces/mongo';
import { logger } from 'src/logger';

export async function mongoConnect() {
  const { url, database }: MongoConfig = nconf.get(MONGO_CONFIG_KEY);
  try {
    const connected = await connect(url);
    logger.info(`[DB] Mongo "${database}" database connected...`);

    return connected.connection;
  } catch(error) {
    logger.error(`[DB] Cannot connect to the "${database}" database\n${error}`);
  }

  return null;
}
