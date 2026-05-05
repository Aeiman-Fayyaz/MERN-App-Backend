import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"

const app = express()

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => res.send("API is running..."))

// Database Connection & Server Logic
const startServer = async () => {
  try {
    await connectDB()
    console.log("Database Connected")
    
    // Sirf local development ke liye app.listen chalaein
    if (process.env.NODE_ENV !== 'production') {
      const PORT = process.env.PORT || 5000
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    }
  } catch (err) {
    console.error("DB Connection Error:", err)
  }
}

startServer()

// ERROR FIX: module.exports ki jagah export default use karein
export default app
