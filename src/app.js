import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

const app = express();

// Global Middleware
app.use(helmet());


// Development logging
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Enable CORS
app.use(cors());


// Routes
app.use('/api/v1', apiRoutes);



// Unhandled Routes
app.use(notFoundHandler);

// ERROR HANDLER
app.use(errorHandler);

export default app;
