// Config - Swagger documentation setup
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FutureForge LMS API',
      version: '1.0.0',
      description: 'Express + MongoDB Learning Management System',
      contact: {
        name: 'FutureForge Team'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}/api`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token from login response'
        }
      },
      schemas: {
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'forger@example.com'
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'password123'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'object',
              properties: {
                token: { type: 'string' },
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    fullName: { type: 'string' },
                    email: { type: 'string' },
                    nickname: { type: 'string' },
                    phoneNumber: { type: 'string' },
                    role: { type: 'string', enum: ['forger', 'admin'] },
                    isApproved: { type: 'boolean' },
                    trackId: { type: 'string', nullable: true }
                  }
                },
                expiresAt: { type: 'string', format: 'date-time' },
                message: { type: 'string' }
              }
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' }
          }
        },
        UserProfile: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            fullName: { type: 'string' },
            email: { type: 'string' },
            nickname: { type: 'string' },
            phoneNumber: { type: 'string' },
            role: { type: 'string' },
            isApproved: { type: 'boolean' },
            trackId: { type: 'string', nullable: true }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'Login, logout, and session management'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

export default swaggerJsdoc(options);