import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";
import "dotenv/config";

if (!process.env.HOST)
  throw new Error("HOST not defined in environment variables");

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Skillit API",
      version: "1.0.0",
      description: "Skillit API documentation",
    },
    servers: [
      {
        url: process.env.HOST,
        description: "Main server",
      },
    ],
  },
  apis: [
    "src/routes/**/*.ts",
    "dist/routes/**/*.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
  try {
    app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger UI available at: /api \n");
  } catch (err) {
    console.error("Error starting Swagger:", err);
    throw new Error("Error starting Swagger: " + err);
  }
}