import "dotenv/config";
import express from "express";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  
}));

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
