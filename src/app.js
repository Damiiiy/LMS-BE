// Main app configuration

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerSpecs from './config/swagger.js';
import authRoutes from './routes/authRoutes.js';

const app = express();


// Middleware

app.use(express.json());

app.use(
  express.urlencoded({
    extended:true
  })
);


// Swagger documentation route

app.use(

  '/api-docs',

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

  '/api-docs.json',

  (req,res)=>{

    res.setHeader(
      'Content-Type',
      'application/json'
    );

    res.send(swaggerSpecs);

  }

);


// Routes

app.use(
  '/api/auth',
  authRoutes
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

        auth:'/api/auth'

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