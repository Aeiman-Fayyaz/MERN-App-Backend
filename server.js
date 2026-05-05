import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

const app = express();

// 1. Universal CORS Configuration (Sabse Pakka Hal)
app.use(cors({
  origin: function (origin, callback) {
    // Ye har request ko allow karega (Testing ke liye best hai)
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use(express.json());
app.use(cookieParser());

// 2. Routes
// Ensure karein ke frontend se request '/api/auth' par hi aa rahi hai
app.use("/api/auth", authRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running perfectly!" });
});

// 3. Database & Serverless Logic
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB Atlas Connected");
    
    // Sirf Local testing ke liye
    if (process.env.NODE_ENV !== 'production') {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  } catch (err) {
    console.error("DB Connection Error:", err.message);
  }
};

startServer();

// 4. Vercel ke liye Export
export default app;
