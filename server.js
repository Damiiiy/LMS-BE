// server.js
import dns from 'node:dns';

// Force Node.js to use Google's reliable DNS servers
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Server entry point

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './src/config/database.js';
import app from './src/app.js';
import Session from './src/models/Session.js';

const PORT = process.env.PORT || 5000;


// Schedule expired session cleanup (runs every hour)

setInterval(async () => {

  try {

    const result = await Session.deleteExpiredSessions();

    if (result.deletedCount > 0) {

      console.log(
        `Cleaned up ${result.deletedCount} expired sessions`
      );

    }

  } catch (error) {

    console.error(
      'Session cleanup error:',
      error
    );

  }

}, 60 * 60 * 1000);



async function startServer() {

  await connectDB();

  app.listen(PORT, () => {

    console.log(`

╔═══════════════════════════════════════════════════════╗
║     FutureForge LMS Server Started Successfully      ║
╠═══════════════════════════════════════════════════════╣
║  Server:    http://localhost:${PORT}
║  API:       http://localhost:${PORT}/api
║  Swagger UI: http://localhost:${PORT}/api-docs
║  Health:    http://localhost:${PORT}/health
╚═══════════════════════════════════════════════════════╝

`);

    console.log(
      `Environment: ${process.env.NODE_ENV || 'development'}`
    );

    console.log(
      `Session timeout: 20 minutes inactivity`
    );

  });

}

startServer();