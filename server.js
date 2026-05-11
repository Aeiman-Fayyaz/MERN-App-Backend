import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"
const app = express()
connectDB()
app.use(
  cors({
    origin: function(origin, callback) {
      const allowed = [
        process.env.FRONTEND_URL,
        "https://mern-app-frontend.vercel.app"  // hardcode bhi kar do backup ke liye
      ].map(url => url?.replace(/\/$/, ""))  // trailing slash remove

      if (!origin || allowed.includes(origin.replace(/\/$/, ""))) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.get("/", (req, res) => res.send("API is running..."))
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
export default app