import nconf from 'nconf';
import { MONGO_CONFIG_KEY } from '@const/config';
import { MongoConfig } from '@interfaces/mongo';

const database = 'manage-authors-books';

const mongoConnection: MongoConfig = {
  url: `mongodb://127.0.0.1:27017/${database}?directConnection=true&serverSelectionTimeoutMS=2000`,
  database
};

nconf.set(MONGO_CONFIG_KEY, mongoConnection);
