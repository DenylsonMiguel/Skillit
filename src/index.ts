import app from "./server.js";
import "dotenv/config";
import { connectDB } from "./config/dbConnector.js";
import { setupSwagger } from "./config/swagger.js";

if (!process.env.PORT)
  throw new Error("PORT not found");
const PORT = parseInt(process.env.PORT);

if (!process.env.ADMIN_PASS)
  throw new Error("ADMIN_PASS not found");

await connectDB();
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server started on: ${process.env.HOST ?? PORT} \n`);
  if (!process.env.HOST) console.warn("[WARN] HOST not found \n");
});