/* eslint-disable no-undef */
/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';
import config from './config/index';

const main = async () => {
  try {
    const server: Server = app.listen(config.port, () => {
      console.log(`Server running on port: ${config.port}`);
    });

    const exitHandler = () => {
      if (server) {
        server.close(() => {
          console.log('Server closed');
        });
      }
      process.exit(1);
    };

    const unexpectedErrorHandler = (error: unknown) => {
      console.log(error);
      exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);

    process.on('SIGTERM', () => {
      console.log('SIGTERM received');
      if (server) {
        server.close();
      }
    });
  } catch (error) {
    console.log(error);
  }
};

main();
