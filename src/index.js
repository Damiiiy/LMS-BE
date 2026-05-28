import app from './app.js';
import { env } from './config/env.js';

const port = env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${env.NODE_ENV} mode.`);
});


process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });1 
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated!');
  });
});
