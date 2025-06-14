import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import productRoutes from './routes/product.route.js';
import { connectDB } from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Serve API
app.use("/api/products", productRoutes);

// ✅ Serve static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// ✅ Fallback for React Router
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
