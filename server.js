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

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => res.send("API is running..."))
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
// export default app

module.exports = app;
