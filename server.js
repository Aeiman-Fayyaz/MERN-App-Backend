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
  origin: [
    "https://mern-app-frontend.vercel.app"
  ],
  methods: ["POST" , "GET"],
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => res.send("API is running..."))
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
export default app