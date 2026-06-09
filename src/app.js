// Main app configuration

import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import redoc from 'redoc-express';

import swaggerSpecs from './config/swagger.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import adminRoutes from './routes/admin/index.js';
import { authenticate, requireAdmin } from './middleware/authMiddleware.js';

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended:true
  })
);


// Swagger documentation route
app.use(

  '/swagger',

  swaggerUi.serve,

  swaggerUi.setup(

    swaggerSpecs,

    {
      explorer:true,

      customCss:
      '.swagger-ui .topbar { display: none }',

      customSiteTitle:
      'FutureForge LMS API Documentation'

    }

  )

);


// JSON endpoint for swagger spec

app.get(

  '/swagger.json',

  (req,res)=>{

    res.setHeader(
      'Content-Type',
      'application/json'
    );

    res.send(swaggerSpecs);

  }

);

// Redoc documentation route
app.get('/redoc', redoc({
  title: 'FutureForge LMS API Docs',
  specUrl: '/swagger.json'
}));


import mongoose from 'mongoose';

// Debug endpoint for database connection
app.get('/api/test-db', (req, res) => {
  const state = mongoose.connection.readyState;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  
  const uri = process.env.MONGODB_URI || '';
  const maskedUri = uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
  
  res.json({
    success: true,
    state: states[state] || state,
    rawState: state,
    uri: maskedUri,
    hasSecret: !!process.env.JWT_SECRET
  });
});

// Routes
app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/users',
  userRoutes
);

app.use(
  '/api/dashboard',
  dashboardRoutes
);

app.use(
  '/api/resources',
  resourceRoutes
);

app.use(
  '/api/admin',
  authenticate,
  requireAdmin,
  adminRoutes
);


// Health

app.get(

  '/health',

  (req,res)=>{

    res.json({

      status:'ok',

      timestamp:
      new Date().toISOString()

    });

  }

);


// API root

app.get(

  '/api',

  (req,res)=>{

    res.json({

      name:'FutureForge LMS API',

      version:'1.0.0',

      documentation:'/api-docs',

      endpoints:{
        auth:'/api/auth',
        users:'/api/users',
        dashboard:'/api/dashboard',
        resources:'/api/resources',
        admin:'/api/admin'
      }

    });

  }

);


// Global error handler

app.use(

(err,req,res,next)=>{

console.error(
  err.stack
);

res.status(500).json({

success:false,

message:
'Something went wrong!'

});

}

);


export default app;