import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import demoRoutes from "./routes/demoRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import incomingCallRoutes from "./routes/incomingCallRoutes.js";
import outgoingCallRoutes from "./routes/outgoingCallRoutes.js";
import billingCallRoutes from "./routes/billingCallRoutes.js";
import fileUploadRoutes from "./routes/fileUploadRoutes.js";

import incomingMessageRoutes from "./routes/incomingMessageRoutes.js";
import outgoingMessageRoutes from "./routes/outgoingMessageRoutes.js";
import billingMessageRoutes from "./routes/billingMessageRoutes.js";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/demo", demoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/incoming-calls", incomingCallRoutes);
app.use("/api/outgoing-calls", outgoingCallRoutes);
app.use("/api/billing-logs", billingCallRoutes);

app.use("/api/files",fileUploadRoutes);

app.use("/api/incoming-messages", incomingMessageRoutes);
app.use("/api/outgoing-messages", outgoingMessageRoutes);
app.use("/api/billing-logs-messages", billingMessageRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
