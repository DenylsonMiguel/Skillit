import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";
import "dotenv/config";

if (!process.env.HOST)
    throw new Error("Host not defined");

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
      },
    ],
  },
  apis: ["dist/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
    try {
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        console.log("Swagger started \n");
    } catch (err) {
        throw new Error("Error on start Swagger: " + err);
    }
}