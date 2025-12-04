import Hapi from '@hapi/hapi';
import { makeDb, startDatabase } from './database';
import dotenv from 'dotenv';

const init = async () => {
  dotenv.config();
  const db = makeDb();

  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/tasks',
    handler: async (r, h) => {
      try {
        const { rows } = await db.raw('select * from tasks');
        return h.response(rows).code(200)
      } catch (error) {
        console.error(error);
        return h.response().code(500)        
      }
    } 
  });

  server.route({
    method: 'POST',
    path: '/tasks', 
    handler: async (r, h) => {
      try {
        const { taskContent  } = r.payload as { taskContent ?: string };

        // Basic validation
        if (!taskContent || !taskContent.trim()) {
          return h
            .response({ error: 'Task content is required.' })
            .code(400);
        }

        // Insert into DB and return the inserted row
        const result = await db.raw(
          'insert into tasks (content) values (?) returning *',
          [taskContent.trim()]
        );

        const insertedTask = result.rows[0];

        return h.response(insertedTask).code(201);
      } catch (error) {
        console.error(error);
        return h
          .response({ error: 'Failed to create task.' })
          .code(500);
      }
    } 
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
startDatabase();
