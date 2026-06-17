import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import linkRoutes from "./routes/linkRoutes.js";
import { apiLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 8000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['https://shortlink-mondz.vercel.app'];

app.set("trust proxy", 1);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(apiLimiter);

app.get('/api/health', (_req, res) => {
  console.log("Server is running!");
  res.send({ message: "server is running!" });
});

app.use('/', linkRoutes)


app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
