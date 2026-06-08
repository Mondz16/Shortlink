import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import linkRoutes from "./routes/linkRoutes.js";
import { apiLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(cors());
app.use(express.json());
app.use(apiLimiter);

app.use('/', linkRoutes)

app.get('/health', (req, res) => {
  console.log("Server is running!");
  res.send({ message: "server is running!" });
});


app.listen(PORT, () => {
  console.log(`Listening to port: http://localhost:${PORT}`);
});
