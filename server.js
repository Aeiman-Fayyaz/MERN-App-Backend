import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"

const app = express()

connectDB()

app.use(cors({
  origin: "https://mern-app-frontend.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.options("*", cors())   // preflight — cors() ke BAAD yeh line

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => res.send("API is running..."))

export default app   // yeh ZAROORI hai Vercel ke liye