import app from "./server.js";
import "dotenv/config";
import { connectDB } from "./config/dbConnector.js";
import { setupSwagger } from "./config/swagger.js";

if (!process.env.PORT)
    throw new Error("PORT not found");

const PORT: number = parseInt(process.env.PORT);

app.listen(PORT, () => console.log(`Server started on: ${process.env.HOST ?? PORT} \n ${process.env.HOST? "" : "[WARN] HOST not found"}`));

await connectDB();
await setupSwagger(app);