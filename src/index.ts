import 'reflect-metadata'

import { createConnection } from 'typeorm';
import app from './app'
import dotenv from 'dotenv';

dotenv.config();

const main = async () => {
  try {
    await createConnection();
    console.log('Connected to Postgres');
    app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to db")
  }
}

main();