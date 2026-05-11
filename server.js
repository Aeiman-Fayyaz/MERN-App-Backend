import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"

const app = express()

connectDB()

const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-app-frontend.vercel.app"
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin || "*")
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.options(/.*/, cors())

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => res.send("API is running..."))

export default app