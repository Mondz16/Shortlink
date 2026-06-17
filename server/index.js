import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import linkRoutes from "./routes/linkRoutes.js";
import { apiLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const API_URL = process.env.API_URL ?? 8000;

app.set("trust proxy", 1);
app.use(cors({
  origin: 'https://shortlink-mondz.vercel.app',
  credentials: true,
}));
app.use(express.json());
app.use(apiLimiter);

app.get('/api/health', (_req, res) => {
  console.log("Server is running!");
  res.send({ message: "server is running!" });
});

app.use('/', linkRoutes)


app.listen(API_URL, () => {
  console.log(`Listening to port: ${API_URL}`);
});
