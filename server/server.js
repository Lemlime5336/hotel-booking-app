import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "../configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "../controllers/clerkWebhooks.js";
import serverless from "serverless-http";

// Connect to your database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => res.send("API functional"));

// Export as serverless handler for Vercel
export const handler = serverless(app);

// Optional: allow local development with app.listen()
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}